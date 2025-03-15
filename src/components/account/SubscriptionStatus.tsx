'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SubscriptionPlan = {
  name: string;
  price: string;
  features: string[];
};

type Subscription = {
  id: string;
  planId: string;
  status: string;
  currentPeriodEnd: string;
  planDetails: SubscriptionPlan;
};

type SubscriptionStatusProps = {
  userId?: string;
};

export default function SubscriptionStatus({ userId }: SubscriptionStatusProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/subscriptions/status');
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription status');
        }
        
        const data = await response.json();
        
        if (data.hasActiveSubscription) {
          setSubscription(data.subscription);
        } else {
          setSubscription(null);
        }
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError('Unable to load subscription information');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubscription();
  }, []);

  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription?.id,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }
      
      // Refresh subscription data
      router.refresh();
      setShowCancelModal(false);
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      setError('Failed to cancel subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border p-6 mb-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-border p-6 mb-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4">
          {error}
        </div>
        <Link
          href="/pricing"
          className="block text-center bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md font-medium transition-colors"
        >
          View Plans
        </Link>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="rounded-lg border border-border p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Subscription</h2>
        <p className="text-muted-foreground mb-6">
          You don't have an active subscription. Choose a plan to get started.
        </p>
        <Link
          href="/pricing"
          className="block text-center bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md font-medium transition-colors"
        >
          View Plans
        </Link>
      </div>
    );
  }

  const currentPeriodEnd = new Date(subscription.currentPeriodEnd).toLocaleDateString();

  return (
    <div className="rounded-lg border border-border p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Subscription Details</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-border pb-3">
          <span className="text-muted-foreground">Plan</span>
          <span className="font-medium">{subscription.planDetails.name}</span>
        </div>
        
        <div className="flex justify-between items-center border-b border-border pb-3">
          <span className="text-muted-foreground">Status</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {subscription.status === 'trialing' ? 'Trial' : 'Active'}
          </span>
        </div>
        
        <div className="flex justify-between items-center border-b border-border pb-3">
          <span className="text-muted-foreground">Price</span>
          <span className="font-medium">${subscription.planDetails.price}/month</span>
        </div>
        
        <div className="flex justify-between items-center border-b border-border pb-3">
          <span className="text-muted-foreground">Current period ends</span>
          <span className="font-medium">{currentPeriodEnd}</span>
        </div>
        
        <div className="pt-2">
          <h3 className="font-medium mb-2">What's included:</h3>
          <ul className="space-y-2">
            {subscription.planDetails.features.map((feature, index) => (
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
      </div>
      
      <div className="space-y-4 mt-6">
        <Link
          href="/pricing"
          className="block text-center bg-secondary text-secondary-foreground hover:bg-secondary/90 py-3 rounded-md font-medium transition-colors"
        >
          Change Plan
        </Link>
        
        <button
          onClick={() => setShowCancelModal(true)}
          className="w-full bg-destructive/10 text-destructive hover:bg-destructive/20 py-3 rounded-md font-medium transition-colors"
          disabled={isLoading}
        >
          Cancel Subscription
        </button>
      </div>
      
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Cancel Subscription</h3>
            <p className="mb-6 text-muted-foreground">
              Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 rounded-md font-medium transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 py-2 rounded-md font-medium transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Cancelling...' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 