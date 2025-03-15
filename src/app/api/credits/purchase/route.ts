import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import CreditPackage from '@/models/CreditPackage';
import Subscription from '@/models/Subscription';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { packId } = body;
    
    if (!packId) {
      return NextResponse.json({ error: 'Missing packId parameter' }, { status: 400 });
    }
    
    await dbConnect();
    
    // Get the credit package
    const creditPack = await CreditPackage.findOne({ 
      id: packId === 'small' ? 'small' : packId === 'medium' ? 'medium' : 'large',
      isActive: true 
    });
    
    if (!creditPack) {
      // Use hardcoded values as fallback
      const fallbackPacks = {
        small: { credits: 1000, price: 10 },
        medium: { credits: 5000, price: 45 },
        large: { credits: 10000, price: 80 }
      };
      
      const pack = fallbackPacks[packId as keyof typeof fallbackPacks];
      
      if (!pack) {
        return NextResponse.json({ error: 'Invalid credit pack' }, { status: 400 });
      }
      
      // Get the user
      const user = await User.findById(session.user.id);
      
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      // Verify user has an active subscription (except for Free tier)
      const hasSubscription = await Subscription.findOne({
        userId: user._id,
        status: { $in: ['active', 'trialing'] }
      });
      
      if (!hasSubscription && packId !== 'free') {
        return NextResponse.json({ 
          error: 'You need an active subscription to purchase credits' 
        }, { status: 403 });
      }
      
      // Create a Stripe payment intent for the credit purchase
      const paymentIntent = await stripe.paymentIntents.create({
        amount: pack.price * 100, // in cents
        currency: 'usd',
        metadata: {
          type: 'credit_purchase',
          userId: user._id.toString(),
          credits: pack.credits.toString(),
          packId
        }
      });
      
      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        packDetails: {
          credits: pack.credits,
          price: pack.price
        }
      });
    }
    
    // Get the user
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Verify user has an active subscription (except for Free tier)
    const hasSubscription = await Subscription.findOne({
      userId: user._id,
      status: { $in: ['active', 'trialing'] }
    });
    
    if (!hasSubscription) {
      return NextResponse.json({ 
        error: 'You need an active subscription to purchase credits' 
      }, { status: 403 });
    }
    
    // Create a Stripe payment intent for the credit purchase
    const paymentIntent = await stripe.paymentIntents.create({
      amount: creditPack.price * 100, // in cents
      currency: 'usd',
      customer: user.stripeCustomerId,
      metadata: {
        type: 'credit_purchase',
        userId: user._id.toString(),
        credits: creditPack.credits.toString(),
        packId
      }
    });
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      packDetails: {
        credits: creditPack.credits,
        price: creditPack.price
      }
    });
  } catch (error) {
    console.error('Error creating credit purchase:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 