import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import Subscription from '@/models/Subscription';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { subscriptionId } = await req.json();
    
    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscriptionId parameter' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Find the subscription
    const subscription = await Subscription.findById(subscriptionId);
    
    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }
    
    // Ensure user owns subscription
    if (subscription.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to cancel this subscription' },
        { status: 403 }
      );
    }
    
    // Cancel at period end in Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });
    
    // Update subscription in database
    subscription.cancelAtPeriodEnd = true;
    await subscription.save();
    
    return NextResponse.json({
      success: true,
      message: 'Subscription will be canceled at the end of the billing period',
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 