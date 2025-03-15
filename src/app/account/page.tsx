'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import SubscriptionStatus from '@/components/account/SubscriptionStatus';
import CreditBalance from '@/components/account/CreditBalance';
import Link from 'next/link';

export default function AccountPage() {
  const { data: session, status: nextAuthStatus } = useSession();
  const { user: authUser, isLoading: authIsLoading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Combined auth state from both auth systems
  const isAuthenticated = !!session?.user || !!authUser;
  const isAuthLoading = nextAuthStatus === 'loading' || authIsLoading;
  
  useEffect(() => {
    // Wait for both auth systems to initialize
    if (!isAuthLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login?callbackUrl=/account');
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthLoading, isAuthenticated, router]);

  // Show loading state while checking session
  if (isLoading || isAuthLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container py-16 px-4 md:px-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  // Get user info from either auth system
  const user = session?.user || authUser;
  const userName = user?.name || 'Not set';
  const userEmail = user?.email || 'Not set';

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-16 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 bg-secondary/50 rounded-md font-medium">
                Account
              </button>
              <Link 
                href="/pricing"
                className="w-full text-left px-3 py-2 block hover:bg-secondary/50 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                Billing
              </Link>
              <button className="w-full text-left px-3 py-2 hover:bg-secondary/50 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                API
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-secondary/50 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                Security
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            {/* User Info Section */}
            <div className="rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Profile</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Name
                    </label>
                    <div className="p-2 border border-border rounded-md bg-secondary/20">
                      {userName}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </label>
                    <div className="p-2 border border-border rounded-md bg-secondary/20">
                      {userEmail}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Credit Balance Section */}
            <CreditBalance />
            
            {/* Subscription Section */}
            <SubscriptionStatus />
          </div>
        </div>
      </div>
    </div>
  );
} 