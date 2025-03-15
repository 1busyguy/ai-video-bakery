'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function UpgradePage() {
  const { status } = useSession();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Handle redirect with useEffect to ensure client-side execution
  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = `/api/auth/signin?callbackUrl=${encodeURIComponent('/pricing')}`;
      return;
    }
    
    if (status === 'authenticated') {
      setIsRedirecting(true);
      window.location.href = '/pricing';
    }
  }, [status]);

  // Show loading state while checking session or redirecting
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">
            {isRedirecting ? 'Redirecting to pricing page...' : 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
} 