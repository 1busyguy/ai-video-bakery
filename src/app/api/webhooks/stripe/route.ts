import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Subscription from '@/models/Subscription';
import CreditTransaction from '@/models/CreditTransaction';
import mongoose from 'mongoose';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

// Stripe webhook secret for verifying the event
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature') as string;
    
    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }
    
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeCustomerId = subscription.customer as string;
        
        // Get the price ID from the subscription
        const priceId = subscription.items.data[0].price.id;
        
        // Extract the plan ID from metadata or use a mapping
        let planId;
        if (subscription.items.data[0].price.metadata?.planId) {
          planId = subscription.items.data[0].price.metadata.planId;
        } else {
          // Fallback mapping based on price IDs if you're not using metadata
          const priceMap: Record<string, string> = {
            'price_basic': 'basic',
            'price_creator': 'creator',
            'price_professional': 'professional'
          };
          planId = priceMap[priceId] || 'unknown';
        }
        
        // Find user by Stripe customer ID
        const user = await User.findOne({ stripeCustomerId });
        
        if (!user) {
          console.error(`No user found with Stripe customer ID: ${stripeCustomerId}`);
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }
        
        // Update or create subscription in database
        await Subscription.findOneAndUpdate(
          { 
            userId: user._id,
            stripeSubscriptionId: subscription.id 
          },
          {
            userId: user._id,
            stripeSubscriptionId: subscription.id,
            planId,
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end
          },
          { upsert: true }
        );
        
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update subscription status in database
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: subscription.id },
          { 
            status: 'canceled',
            canceledAt: new Date()
          }
        );
        
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Only process subscription invoices
        if (invoice.subscription) {
          // Find subscription and update status
          await Subscription.findOneAndUpdate(
            { stripeSubscriptionId: invoice.subscription as string },
            { status: 'active' }
          );
          
          // Only add credits on successful subscription renewal or initial payment
          if (invoice.billing_reason === 'subscription_create' || 
              invoice.billing_reason === 'subscription_cycle') {
            
            // Get user from customer ID
            const user = await User.findOne({ 
              stripeCustomerId: invoice.customer as string 
            });
            
            if (user) {
              // Find subscription to get plan details
              const subscription = await Subscription.findOne({
                stripeSubscriptionId: invoice.subscription as string
              });
              
              if (subscription) {
                // Determine credits based on plan
                let creditsToAdd = 0;
                
                switch(subscription.planId) {
                  case 'basic':
                    creditsToAdd = 1000;
                    break;
                  case 'creator':
                    creditsToAdd = 3600;
                    break;
                  case 'professional':
                    creditsToAdd = 11000;
                    break;
                  default:
                    creditsToAdd = 0;
                }
                
                if (creditsToAdd > 0) {
                  // Start session for transaction
                  const sess = await mongoose.startSession();
                  sess.startTransaction();
                  
                  try {
                    // Add credits to user
                    user.credits += creditsToAdd;
                    await user.save({ session: sess });
                    
                    // Record transaction
                    const transaction = new CreditTransaction({
                      userId: user._id,
                      amount: creditsToAdd,
                      type: 'subscription',
                      description: `Monthly subscription credits (${subscription.planId})`,
                      metadata: {
                        invoiceId: invoice.id,
                        subscriptionId: invoice.subscription
                      }
                    });
                    
                    await transaction.save({ session: sess });
                    await sess.commitTransaction();
                  } catch (error) {
                    await sess.abortTransaction();
                    throw error;
                  } finally {
                    sess.endSession();
                  }
                }
              }
            }
          }
        }
        
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Update subscription status to past_due
        if (invoice.subscription) {
          await Subscription.findOneAndUpdate(
            { stripeSubscriptionId: invoice.subscription as string },
            { status: 'past_due' }
          );
        }
        
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Only process credit purchases
        if (paymentIntent.metadata?.type === 'credit_purchase') {
          const userId = paymentIntent.metadata.userId;
          const credits = parseInt(paymentIntent.metadata.credits, 10);
          
          if (userId && credits) {
            // Start session for transaction
            const sess = await mongoose.startSession();
            sess.startTransaction();
            
            try {
              // Add credits to user
              const user = await User.findById(userId);
              
              if (!user) {
                throw new Error(`User not found: ${userId}`);
              }
              
              user.credits += credits;
              await user.save({ session: sess });
              
              // Record transaction
              const transaction = new CreditTransaction({
                userId,
                amount: credits,
                type: 'purchase',
                description: `Purchased ${credits} credits`,
                metadata: {
                  paymentIntentId: paymentIntent.id,
                  amount: paymentIntent.amount / 100
                }
              });
              
              await transaction.save({ session: sess });
              await sess.commitTransaction();
            } catch (error) {
              await sess.abortTransaction();
              throw error;
            } finally {
              sess.endSession();
            }
          }
        }
        
        break;
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 