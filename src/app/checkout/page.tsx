'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/checkout/CheckoutForm';

// Plans data (should match pricing page plans)
const plans = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: '10',
    priceId: 'price_basic123', // Replace with actual Stripe price ID
    features: [
      '20 minutes of video/month',
      '4 parallel generations',
      'Video length up to 1 minute',
      'Commercial use',
      'Premium voices'
    ]
  },
  creator: {
    id: 'creator',
    name: 'Creator',
    price: '25',
    priceId: 'price_creator123', // Replace with actual Stripe price ID
    features: [
      '1 hour of video/month',
      '6 parallel generations',
      'Video length up to 2 minutes',
      'Commercial use',
      'Premium voices'
    ]
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: '50',
    priceId: 'price_professional123', // Replace with actual Stripe price ID
    features: [
      '2 hours of video/month',
      '8 parallel generations',
      'Video length up to 12 minutes',
      'Commercial use',
      'Premium voices'
    ]
  }
};

// Initialize Stripe (replace with your public key)
// In production, this should come from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const planId = searchParams?.get('plan') || 'basic';
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedPlan = plans[planId as keyof typeof plans] || plans.basic;

  useEffect(() => {
    // Create a PaymentIntent or SetupIntent when the component mounts
    const fetchPaymentIntent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/subscriptions/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            priceId: selectedPlan.priceId,
            planId: selectedPlan.id
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError('Something went wrong. Please try again later.');
        console.error('Error creating payment intent:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [selectedPlan.id, selectedPlan.priceId]);

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Complete your subscription</h1>
          <p className="text-muted-foreground">
            You're subscribing to the {selectedPlan.name} plan at ${selectedPlan.price}/month
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Plan summary */}
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold mb-4">{selectedPlan.name} Plan</h2>
              <div className="mb-4">
                <span className="text-3xl font-bold">${selectedPlan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <div className="border-t border-border pt-4 mb-4">
                <h3 className="font-medium mb-2">What's included:</h3>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <p>You can cancel your subscription at any time from your account settings.</p>
              </div>
            </div>
          </div>

          {/* Payment form */}
          <div className="md:col-span-3 order-1 md:order-2">
            <div className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold mb-6">Payment Details</h2>
              
              {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
                  {error}
                </div>
              )}
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                  <p className="text-muted-foreground">Loading payment form...</p>
                </div>
              ) : clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm clientSecret={clientSecret} planName={selectedPlan.name} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 