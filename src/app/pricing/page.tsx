import React from 'react';
import Link from 'next/link';

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '0',
    features: [
      '5 videos per day',
      'Slower generations',
      '2 concurrent generations',
      'Video length up to 30 seconds',
      'No commercial use'
    ],
    cta: 'Sign up now',
    href: '/auth/signup',
    highlighted: false
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '10',
    features: [
      '20 minutes of video/month',
      '4 parallel generations',
      'Video length up to 1 minute',
      'Commercial use',
      'Premium image models',
      'No watermark',
      'Premium voices',
      'Voice cloning',
      'Text-to-speech preview',
      'Additional video: $0.50/minute'
    ],
    cta: 'Get started',
    href: '/checkout?plan=basic',
    highlighted: false
  },
  {
    id: 'creator',
    name: 'Creator',
    price: '25',
    features: [
      '1 hour of video/month',
      '6 parallel generations',
      'Video length up to 2 minutes',
      'Commercial use',
      'Premium image models',
      'No watermark',
      'Premium voices',
      'Voice cloning',
      'Text-to-speech preview',
      'Additional video: $0.50/minute'
    ],
    cta: 'Get started',
    href: '/checkout?plan=creator',
    highlighted: true,
    labelText: 'Most popular'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '50',
    features: [
      '2 hours of video/month',
      '8 parallel generations',
      'Video length up to 12 minutes',
      'Commercial use',
      'Premium image models',
      'No watermark',
      'Premium voices',
      'Voice cloning',
      'Text-to-speech preview',
      'Additional video: $0.50/minute'
    ],
    cta: 'Get started',
    href: '/checkout?plan=professional',
    highlighted: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Customize to your business with enterprise-level AI generations',
      'Integrations with best-in-class features',
      'Live support from dedicated experts'
    ],
    cta: 'Contact us',
    href: '/contact',
    highlighted: false,
    labelText: 'Enterprise'
  }
];

export default function PricingPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose the right plan for you
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`rounded-lg border p-6 flex flex-col h-full relative
              ${plan.highlighted ? 'border-primary shadow-lg' : 'border-border'}`}
            >
              {plan.labelText && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  {plan.labelText}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {plan.id !== 'enterprise' && plan.id !== 'free' && (
                    <span className="text-muted-foreground ml-1">/month</span>
                  )}
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
                href={plan.href}
                className={`w-full py-2 px-4 rounded-md font-medium text-center transition-colors 
                ${plan.highlighted 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 