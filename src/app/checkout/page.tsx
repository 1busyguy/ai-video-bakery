'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Loading component to use in Suspense
function CheckoutLoading() {
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
function CheckoutContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get plan from URL query params
  const planId = searchParams?.get('plan') || 'basic';
  
  // Handle authentication with useEffect
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/checkout?plan=${planId}`)}`);
    } else if (status === 'authenticated') {
      // In a real implementation, you would set up Stripe checkout here
      setIsLoading(false);
    }
  }, [status, router, planId]);
  
  // Show loading state while checking session
  if (status === 'loading' || status === 'unauthenticated' || isLoading) {
    return <CheckoutLoading />;
  }
  
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground">
            You've selected the <span className="font-medium">{planId.charAt(0).toUpperCase() + planId.slice(1)}</span> plan
          </p>
        </div>
        
        <div className="rounded-lg border border-border p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">This is a placeholder checkout page</h2>
          <p className="mb-4">
            In a real implementation, this would display a Stripe checkout form to process your subscription payment.
          </p>
          <p className="mb-6">
            Selected plan: <span className="font-medium">{planId.charAt(0).toUpperCase() + planId.slice(1)}</span>
          </p>
          
          <button
            onClick={() => window.location.href = '/account'}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-md font-medium transition-colors"
          >
            Simulate Successful Payment
          </button>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
} 