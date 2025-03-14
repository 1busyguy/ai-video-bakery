'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    try {
      setIsLoading(true);
      // Here you would implement your actual password reset logic
      // For example:
      // await sendPasswordResetEmail(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4 pt-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 24 24" width="40" height="40" className="text-white">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
              />
            </svg>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl text-white font-light text-center mb-8">Reset Password</h1>
          
          {success ? (
            <div className="bg-green-900/30 border border-green-400 text-green-200 px-4 py-3 rounded mb-6">
              <p>Password reset email sent! Check your inbox for instructions to reset your password.</p>
              <div className="mt-6 text-center">
                <Link href="/auth/login" className="text-white hover:underline">
                  Return to login
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Description */}
              <p className="text-zinc-400 text-center mb-8">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-900/30 border border-red-400 text-red-200 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md transition-colors duration-200 font-medium"
                >
                  {isLoading ? 'Sending...' : 'SEND RESET LINK'}
                </button>
              </form>
            </>
          )}
          
          {/* Back to Login Link */}
          {!success && (
            <div className="text-center mt-8">
              <Link href="/auth/login" className="text-zinc-400 text-sm hover:text-white">
                ← Back to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 