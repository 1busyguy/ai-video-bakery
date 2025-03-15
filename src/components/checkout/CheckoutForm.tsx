'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  clientSecret: string;
  planName: string;
}

export default function CheckoutForm({ clientSecret, planName }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Create the subscription
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/account/subscription?success=true&plan=${planName}`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || 'Something went wrong with your payment');
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded, redirect to success page
        router.push(`/account/subscription?success=true&plan=${planName}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMessage('An unexpected error occurred during payment processing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {errorMessage}
        </div>
      )}
      
      <div className="border-t border-border pt-4">
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full mr-2"></div>
              Processing...
            </div>
          ) : (
            `Subscribe to ${planName}`
          )}
        </button>
      </div>
      
      <div className="text-xs text-muted-foreground text-center mt-4">
        <p>Your payment is secured with Stripe.</p>
        <p>You'll be charged ${planName === 'Basic' ? '10' : planName === 'Creator' ? '25' : '50'} per month until you cancel.</p>
      </div>
    </form>
  );
} 