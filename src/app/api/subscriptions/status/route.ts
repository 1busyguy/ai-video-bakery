import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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

    // Get the active subscription
    const subscription = await db.collection('subscriptions').findOne({
      userId: user._id,
      status: { $in: ['active', 'trialing'] }
    });
    
    if (!subscription) {
      return NextResponse.json({ 
        hasActiveSubscription: false 
      });
    }
    
    // Get plan details
    let planDetails;
    switch (subscription.planId) {
      case 'basic':
        planDetails = {
          name: 'Basic',
          price: '10',
          features: [
            '20 minutes of video/month',
            '4 parallel generations',
            'Video length up to 1 minute'
          ]
        };
        break;
      case 'creator':
        planDetails = {
          name: 'Creator',
          price: '25',
          features: [
            '1 hour of video/month',
            '6 parallel generations',
            'Video length up to 2 minutes'
          ]
        };
        break;
      case 'professional':
        planDetails = {
          name: 'Professional',
          price: '50',
          features: [
            '2 hours of video/month',
            '8 parallel generations',
            'Video length up to 12 minutes'
          ]
        };
        break;
      default:
        planDetails = {
          name: 'Unknown',
          price: '0',
          features: []
        };
    }
    
    return NextResponse.json({
      hasActiveSubscription: true,
      subscription: {
        id: subscription._id,
        planId: subscription.planId,
        status: subscription.status,
        currentPeriodEnd: subscription.currentPeriodEnd,
        planDetails
      }
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 