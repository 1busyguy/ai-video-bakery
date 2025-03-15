'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface CreditPurchaseFormProps {
  clientSecret: string;
  credits: number;
  price: number;
}

export default function CreditPurchaseForm({ clientSecret, credits, price }: CreditPurchaseFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/account?credits_purchased=true&amount=${credits}`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || 'Payment failed');
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        router.push(`/account?credits_purchased=true&amount=${credits}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">Credits:</span>
          <span className="font-medium">{credits.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-medium">${price.toFixed(2)}</span>
        </div>
      </div>
      
      <PaymentElement />
      
      {errorMessage && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {errorMessage}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full mr-2"></div>
            Processing...
          </div>
        ) : (
          `Purchase ${credits.toLocaleString()} Credits`
        )}
      </button>
    </form>
  );
}
