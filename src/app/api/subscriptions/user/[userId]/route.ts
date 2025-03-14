import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { SubscriptionModel } from '@/models/Subscription';
import { auth } from '@clerk/nextjs';

// GET /api/subscriptions/user/[userId]
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Connect to database
    await dbConnect();

    // Verify authentication
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = params;

    // Make sure user can only access their own subscriptions
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Find subscriptions by user ID
    const subscriptions = await Subscription.find({ userId });

    // Format response
    const responseData = subscriptions.map(subscription => ({
      id: subscription._id.toString(),
      userId: subscription.userId.toString(),
      subscriptionId: subscription.subscriptionId,
      status: subscription.status,
      planId: subscription.planId,
      isYearlyBilling: subscription.isYearlyBilling,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
    }));

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 