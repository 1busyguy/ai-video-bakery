'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function CreditBalance() {
  const { data: session } = useSession();
  const credits = session?.user?.credits || 0;
  
  return (
    <div className="rounded-lg border border-border p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Credits</h2>
      
      <div className="flex items-center mb-6">
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">Available Credits</div>
          <div className="text-3xl font-bold">{credits.toLocaleString()}</div>
        </div>
      </div>
      
      <Link 
        href="/account/purchase-credits" 
        className="block w-full text-center bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-md font-medium transition-colors"
      >
        Purchase Credits
      </Link>
    </div>
  );
}
