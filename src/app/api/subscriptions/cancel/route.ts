import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

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
    const { subscriptionId } = body;
    
    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscriptionId parameter' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    
    // Get the subscription from the database
    const subscription = await db.collection('subscriptions').findOne({
      _id: subscriptionId
    });
    
    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }
    
    // Make sure the user owns this subscription
    const user = await db.collection('users').findOne({ email: session.user.email });
    
    if (!user || user._id.toString() !== subscription.userId.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized to cancel this subscription' },
        { status: 403 }
      );
    }
    
    // Cancel the subscription in Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true
    });
    
    // Update the subscription in the database
    await db.collection('subscriptions').updateOne(
      { _id: subscriptionId },
      {
        $set: {
          cancelAtPeriodEnd: true,
          updatedAt: new Date()
        }
      }
    );
    
    return NextResponse.json({ 
      success: true,
      message: 'Subscription will be canceled at the end of the current billing period'
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 