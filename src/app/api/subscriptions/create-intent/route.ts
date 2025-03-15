import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Initialize Stripe with secret key (in production, use environment variables)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { priceId, planId } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Missing priceId parameter' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Get the user from the database
    const user = await db.collection('users').findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if the user already has an active subscription
    const existingSubscription = await db.collection('subscriptions').findOne({
      userId: user._id,
      status: { $in: ['active', 'trialing'] }
    });

    // Get or create a Stripe customer
    let customerId = user.stripeCustomerId;
    
    if (!customerId) {
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user._id.toString() }
      });
      
      customerId = customer.id;
      
      // Update the user with the Stripe customer ID
      await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { stripeCustomerId: customerId } }
      );
    }

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Get the client secret from the subscription's invoice
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
    
    // Store the subscription in the database
    await db.collection('subscriptions').insertOne({
      userId: user._id,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      planId: planId,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 