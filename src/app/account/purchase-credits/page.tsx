'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CreditPurchaseForm from '@/components/credit/CreditPurchaseForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const CREDIT_PACKS = [
  { id: 'small', credits: 1000, price: 10, popular: false },
  { id: 'medium', credits: 5000, price: 45, popular: true, bestValue: true },
  { id: 'large', credits: 10000, price: 80, popular: false },
];

export default function PurchaseCreditsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Handle authentication with useEffect
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin?callbackUrl=/account/purchase-credits');
    }
  }, [status, router]);
  
  const [selectedPack, setSelectedPack] = useState(CREDIT_PACKS[1]);
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const handleSelectPack = async (pack: typeof CREDIT_PACKS[0]) => {
    try {
      setIsLoading(true);
      setSelectedPack(pack);
      
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId: pack.id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError('Failed to initiate purchase. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Show loading state while checking session
  if (status === 'loading' || status === 'unauthenticated') {
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
  
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Purchase Additional Credits</h1>
          <p className="text-muted-foreground">
            Boost your creative power with additional credits
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CREDIT_PACKS.map((pack) => (
            <div 
              key={pack.id}
              className={`rounded-lg border p-6 flex flex-col relative cursor-pointer transition-all hover:border-primary
                ${selectedPack.id === pack.id ? 'border-primary shadow-md' : 'border-border'}`}
              onClick={() => handleSelectPack(pack)}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-bold">{pack.credits.toLocaleString()} Credits</h3>
                <div className="text-3xl font-bold mt-2">${pack.price}</div>
                {pack.bestValue && (
                  <div className="text-xs text-green-500 mt-1">Best value</div>
                )}
              </div>
              
              <button 
                className={`mt-auto w-full py-2 rounded-md font-medium transition-colors 
                  ${selectedPack.id === pack.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'}`}
                onClick={() => handleSelectPack(pack)}
                disabled={isLoading}
              >
                {selectedPack.id === pack.id ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-8">
            {error}
          </div>
        )}
        
        {clientSecret && (
          <div className="rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold mb-6">Complete Your Purchase</h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CreditPurchaseForm 
                clientSecret={clientSecret} 
                credits={selectedPack.credits}
                price={selectedPack.price}
              />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}
