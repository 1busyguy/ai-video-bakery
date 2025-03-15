import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

// Stripe webhook secret for verifying the event
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
      if (!webhookSecret) {
        throw new Error('Webhook secret is not set');
      }
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Handle the event based on its type
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        
        // Get the Stripe Customer ID
        const customerId = subscription.customer as string;
        
        // Look up the user by their Stripe Customer ID
        const user = await db.collection('users').findOne({
          stripeCustomerId: customerId
        });
        
        if (!user) {
          console.error(`No user found with Stripe customer ID: ${customerId}`);
          return NextResponse.json({ success: false }, { status: 404 });
        }
        
        // Extract the price ID from the subscription
        const priceId = subscription.items.data[0].price.id;
        
        // Update or create the subscription in the database
        await db.collection('subscriptions').updateOne(
          { stripeSubscriptionId: subscription.id },
          {
            $set: {
              userId: user._id,
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
              status: subscription.status,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );
        break;

      case 'customer.subscription.deleted':
        const canceledSubscription = event.data.object as Stripe.Subscription;
        
        // Update the subscription in the database
        await db.collection('subscriptions').updateOne(
          { stripeSubscriptionId: canceledSubscription.id },
          {
            $set: {
              status: canceledSubscription.status,
              canceledAt: new Date(),
              updatedAt: new Date()
            }
          }
        );
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        
        // Check if this is for a subscription
        if (invoice.subscription) {
          // Update the subscription in the database with new period end
          await db.collection('subscriptions').updateOne(
            { stripeSubscriptionId: invoice.subscription as string },
            {
              $set: {
                status: 'active',
                updatedAt: new Date()
              }
            }
          );
        }
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        
        // Update the subscription status to past_due
        if (failedInvoice.subscription) {
          await db.collection('subscriptions').updateOne(
            { stripeSubscriptionId: failedInvoice.subscription as string },
            {
              $set: {
                status: 'past_due',
                updatedAt: new Date()
              }
            }
          );
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 