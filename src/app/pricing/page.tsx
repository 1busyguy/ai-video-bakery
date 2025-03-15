'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const HARDCODED_PLANS = [
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
    popular: false
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
    popular: false
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
    popular: true
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
    popular: false
  }
];

export default function PricingPage() {
  const { status } = useSession();
  const [plans, setPlans] = useState(HARDCODED_PLANS);
  const [activeInterval, setActiveInterval] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch plans from the API - fallback to hardcoded if API fails
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/subscription-plans');
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await response.json();
        if (data.length > 0) {
          setPlans(data);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        // Fallback to hardcoded plans
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlans();
  }, []);
  
  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container py-16 px-4 md:px-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose the right plan for you
          </h1>
          
          <div className="flex justify-center mt-6 mb-10">
            <div className="inline-flex bg-secondary rounded-full p-1">
              <button
                onClick={() => setActiveInterval('monthly')}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  activeInterval === 'monthly' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-secondary-foreground/10'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActiveInterval('yearly')}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  activeInterval === 'yearly' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-secondary-foreground/10'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.planId}
              className={`rounded-lg border p-6 flex flex-col h-full relative
              ${plan.popular ? 'border-primary shadow-lg' : 'border-border'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {plan.includedCredits.toLocaleString()} credits per month
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
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

              <Link 
                href={status === 'authenticated' 
                  ? `/checkout?plan=${plan.planId}` 
                  : `/api/auth/signin?callbackUrl=${encodeURIComponent(`/checkout?plan=${plan.planId}`)}`}
                className={`w-full py-2 px-4 rounded-md font-medium text-center transition-colors 
                ${plan.popular 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'}`}
              >
                {plan.planId === 'free' ? 'Sign up now' : 'Choose Plan'}
              </Link>
            </div>
          ))}
        </div>
        
        {/* Credit Usage Pricing */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Credit Usage Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold mb-4">Video</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">Action</th>
                      <th className="text-center py-2">Credits</th>
                      <th className="text-right py-2">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2">Character-3 (540p)</td>
                      <td className="text-center py-2">3.5</td>
                      <td className="text-right py-2">per second</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2">Character-3 (720p)</td>
                      <td className="text-center py-2">7</td>
                      <td className="text-right py-2">per second</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2">Kling 1.6</td>
                      <td className="text-center py-2">16</td>
                      <td className="text-right py-2">per second</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Image */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold mb-4">Image</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">Action</th>
                      <th className="text-center py-2">Credits</th>
                      <th className="text-right py-2">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2">Generate</td>
                      <td className="text-center py-2">80</td>
                      <td className="text-right py-2">per image</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2">Upscale</td>
                      <td className="text-center py-2">40</td>
                      <td className="text-right py-2">per image</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Audio */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold mb-4">Audio</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">Action</th>
                      <th className="text-center py-2">Credits</th>
                      <th className="text-right py-2">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2">Text-to-Speech</td>
                      <td className="text-center py-2">3</td>
                      <td className="text-right py-2">per minute</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2">Clone Voice</td>
                      <td className="text-center py-2">150</td>
                      <td className="text-right py-2">per voice</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 