'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import SubscriptionStatus from '@/components/account/SubscriptionStatus';
import CreditBalance from '@/components/account/CreditBalance';
import Link from 'next/link';

export default function AccountPage() {
  const { data: session, status } = useSession();
  
  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  // Show loading state while checking session
  if (status === 'loading') {
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
              <button className="w-full text-left px-3 py-2 hover:bg-secondary/50 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                Billing
              </button>
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
                      {session?.user?.name || 'Not set'}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </label>
                    <div className="p-2 border border-border rounded-md bg-secondary/20">
                      {session?.user?.email}
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