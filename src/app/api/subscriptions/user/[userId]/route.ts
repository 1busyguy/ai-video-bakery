import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import Subscription from '@/models/Subscription';
import User from '@/models/User';
import SubscriptionPlan from '@/models/SubscriptionPlan';

// GET /api/subscriptions/user/[userId]
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    // Find user's active subscription
    const subscription = await Subscription.findOne({
      userId: session.user.id,
      status: { $in: ['active', 'trialing'] }
    });
    
    if (!subscription) {
      return NextResponse.json({
        hasActiveSubscription: false
      });
    }
    
    // Find plan details
    const plan = await SubscriptionPlan.findOne({ planId: subscription.planId });
    
    // If plan is not found in database, use fallback values
    const subscriptionDetails = {
      id: subscription._id.toString(),
      planId: subscription.planId,
      status: subscription.status,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      includedCredits: plan?.includedCredits || 
        (subscription.planId === 'free' ? 400 :
         subscription.planId === 'basic' ? 1000 :
         subscription.planId === 'creator' ? 3600 : 11000)
    };
    
    return NextResponse.json({
      hasActiveSubscription: true,
      subscription: subscriptionDetails
    });
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 