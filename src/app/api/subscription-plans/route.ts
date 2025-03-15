import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import SubscriptionPlan from '@/models/SubscriptionPlan';
import { Types } from 'mongoose';

// Define the plan type
type PlanType = {
  _id?: string | Types.ObjectId;
  planId: string;
  name: string;
  price: string;
  interval: string;
  includedCredits: number;
  features: string[];
  popular: boolean;
  isActive: boolean;
  stripePriceId: string | null;
};

// Fallback plans if database is empty
const FALLBACK_PLANS: PlanType[] = [
  {
    _id: new Types.ObjectId().toString(), // Add _id for TypeScript
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
    _id: new Types.ObjectId().toString(), // Add _id for TypeScript
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
    _id: new Types.ObjectId().toString(), // Add _id for TypeScript
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
    _id: new Types.ObjectId().toString(), // Add _id for TypeScript
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
    const dbPlans = await SubscriptionPlan.find({ isActive: true })
      .select('-__v -createdAt -updatedAt')
      .lean();
    
    // If no plans found, use fallback plans
    let plans: PlanType[] = dbPlans.length > 0 
      ? dbPlans as unknown as PlanType[] 
      : FALLBACK_PLANS;
    
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
