import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET /api/subscriptions/user/[userId]
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Connect to database
    const { db } = await connectToDatabase();

    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = params;

    // Make sure user can only access their own subscriptions
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Find subscriptions by user ID
    const subscriptions = await db.collection('subscriptions').find({ userId }).toArray();

    // Format response
    const responseData = subscriptions.map((subscription: any) => ({
      id: subscription._id.toString(),
      userId: subscription.userId.toString(),
      stripeSubscriptionId: subscription.stripeSubscriptionId,
      status: subscription.status,
      planId: subscription.planId,
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