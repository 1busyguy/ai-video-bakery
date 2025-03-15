'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Loading component to use in Suspense
function SubscriptionLoading() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  );
}

// Client component that uses useSearchParams
function SubscriptionContent() {
  const searchParams = useSearchParams();
  const success = searchParams?.get('success') === 'true';
  const plan = searchParams?.get('plan') || 'Basic';
  
  // This state would typically be fetched from your backend
  const [subscription, setSubscription] = useState({
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    plan: plan,
    price: plan === 'Basic' ? '10' : plan === 'Creator' ? '25' : '50'
  });

  // In a real application, you would fetch the subscription details from your backend
  useEffect(() => {
    if (success) {
      // Fetch subscription details
      // const fetchSubscription = async () => {
      //   const response = await fetch('/api/subscriptions/details');
      //   const data = await response.json();
      //   setSubscription(data);
      // };
      // fetchSubscription();
    }
  }, [success]);

  if (!success) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container py-16 px-4 md:px-6 max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Subscription Status</h1>
            <p className="text-muted-foreground mb-8">
              You don't have an active subscription yet.
            </p>
            <Link 
              href="/pricing"
              className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md font-medium transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6 max-w-3xl mx-auto">
        {success ? (
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-primary/10 rounded-full p-4 mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-primary" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Subscription Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your {subscription.plan} plan is now active. Thank you for subscribing!
            </p>
          </div>
        ) : (
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Subscription Status</h1>
          </div>
        )}

        <div className="rounded-lg border border-border p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Subscription Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium">{subscription.plan}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-muted-foreground">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Active
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">${subscription.price}/month</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-muted-foreground">Current period ends</span>
              <span className="font-medium">
                {subscription.currentPeriodEnd.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-3 rounded-md font-medium transition-colors"
          >
            Manage Billing
          </button>
          
          <button
            className="w-full bg-destructive/10 text-destructive hover:bg-destructive/20 py-3 rounded-md font-medium transition-colors"
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function SubscriptionPage() {
  return (
    <Suspense fallback={<SubscriptionLoading />}>
      <SubscriptionContent />
    </Suspense>
  );
} 