import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import SubscriptionPlan from '@/models/SubscriptionPlan';

// Fallback plans if database is empty
const FALLBACK_PLANS = [
  {
    planId: 'free',
    name: 'Free',
    price: '0',
    interval: 'monthly',
    includedCredits: 400,
    features: [
      'Includes 400 credits per month',
      'Slower generations',
      'Cannot purchase credit packs',
      'No commercial use'
    ],
    popular: false,
    isActive: true,
    stripePriceId: null
  },
  {
    planId: 'basic',
    name: 'Basic',
    price: '10',
    interval: 'monthly',
    includedCredits: 1000,
    features: [
      'Includes 1,000 credits per month',
      'Credits do not rollover',
      'Premium voices',
      'Voice cloning',
      'Commercial use',
      'No watermark',
      'Purchase additional credit packs that rollover'
    ],
    popular: false,
    isActive: true,
    stripePriceId: 'price_basic'
  },
  {
    planId: 'creator',
    name: 'Creator',
    price: '30',
    interval: 'monthly',
    includedCredits: 3600,
    features: [
      'Includes 3,600 credits per month',
      'Credits do not rollover',
      'Premium voices',
      'Voice cloning',
      'Commercial use',
      'No watermark',
      'Purchase additional credit packs that rollover'
    ],
    popular: true,
    isActive: true,
    stripePriceId: 'price_creator'
  },
  {
    planId: 'professional',
    name: 'Professional',
    price: '75',
    interval: 'monthly',
    includedCredits: 11000,
    features: [
      'Includes 11,000 credits per month',
      'Credits do not rollover',
      'Premium voices',
      'Voice cloning',
      'Commercial use',
      'No watermark',
      'Purchase additional credit packs that rollover'
    ],
    popular: false,
    isActive: true,
    stripePriceId: 'price_professional'
  }
];

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get all active plans from database
    let plans = await SubscriptionPlan.find({ isActive: true })
      .select('-__v -createdAt -updatedAt')
      .lean();
    
    // If no plans found, return fallback plans
    if (plans.length === 0) {
      plans = FALLBACK_PLANS;
    }
    
    // Format plans for frontend
    const formattedPlans = plans.map(plan => ({
      ...plan,
      _id: plan._id ? plan._id.toString() : undefined,
    }));
    
    return NextResponse.json(formattedPlans);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    
    // Return fallback plans in case of error
    return NextResponse.json(FALLBACK_PLANS);
  }
}
