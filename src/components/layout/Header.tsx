'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Image, History, Settings, LogOut, CreditCard, User, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  isDark?: boolean;
}

export function Header({ isDark = true }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isLoggedIn = !!user;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      closeMenu();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="sticky top-0 z-50 p-0 bg-background/40 backdrop-blur w-full">
      <div className="flex justify-between items-center mx-auto px-6 py-3">
        {/* Logo */}
        <Link href="/" title="brand-logo" className="relative flex items-center space-x-2 flex-none">
          <span className="flex items-center text-bright">
            <svg viewBox="0 0 24 24" width="22" height="22" className="text-primary">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
              />
            </svg>
            <span className="ml-2 font-bold text-lg">AI Video Bakery</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex justify-center items-stretch absolute left-1/2 -translate-x-1/2">
          <Link
            href="/app/video"
            className="w-24 flex flex-row items-center justify-center text-xs mt-xxxxs mx-sm uppercase indent-1 tracking-wider hover:text-strong transition-colors cursor-pointer gap-1 relative text-medium"
          >
            <div className="pb-[2px] flex justify-center opacity-0">
              <Play className="w-[15px] h-[15px]" />
            </div>
            <span className="flex justify-center items-center text-center font-light font-medium">VIDEO</span>
          </Link>
          <Link
            href="/app/image"
            className="w-24 flex flex-row items-center justify-center text-xs mt-xxxxs mx-sm uppercase indent-1 tracking-wider hover:text-strong transition-colors cursor-pointer gap-1 relative text-medium"
          >
            <div className="pb-[2px] flex justify-center opacity-0">
              <Image className="w-[15px] h-[15px]" />
            </div>
            <span className="flex justify-center items-center text-center font-light font-medium">IMAGE</span>
          </Link>
          <Link
            href="/app/library"
            className="w-24 flex flex-row items-center justify-center text-xs mt-xxxxs mx-sm uppercase indent-1 tracking-wider hover:text-strong transition-colors cursor-pointer gap-1 relative text-medium"
          >
            <div className="pb-[2px] flex justify-center opacity-0">
              <History className="w-[15px] h-[15px]" />
            </div>
            <span className="flex justify-center items-center text-center font-light font-medium">LIBRARY</span>
          </Link>
        </div>

        {/* Authentication Buttons or User Menu */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {isLoggedIn ? (
            <div className="relative">
              {/* Credit counter */}
              <div className="flex items-center mr-2">
                <div className="bg-red-500/20 rounded-md flex items-center px-2 py-1">
                  <svg viewBox="0 0 24 24" width="16" height="16" className="text-red-500 mr-1">
                    <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                  </svg>
                  <span className="text-white text-xs font-medium">{user?.credits || 0}</span>
                </div>
              </div>
              
              {/* User Menu Button */}
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 rounded-full hover:bg-zinc-800 py-1 px-2 focus:outline-none"
              >
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  {user?.avatarInitials || user?.name?.charAt(0) || 'U'}
                </div>
                <span className="sr-only md:not-sr-only md:text-sm font-medium text-white">
                  {user?.name || 'User'}
                </span>
              </button>
              
              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-zinc-900 border border-zinc-800 z-50 overflow-hidden">
                  <div className="p-4 border-b border-zinc-800">
                    <div className="font-medium text-white mb-1">{user?.name || 'User'}</div>
                    <div className="text-zinc-400 text-sm">{user?.email || 'user@example.com'}</div>
                  </div>
                  
                  <div className="p-4 border-b border-zinc-800">
                    <div className="text-zinc-400 text-xs mb-2">Creator</div>
                    <div className="flex items-center mb-3">
                      <div className="text-pink-500 mr-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <div className="text-white">{user?.credits || 0} Credits remaining</div>
                    </div>
                    
                    <Link 
                      href="/account/upgrade"
                      className="block text-center py-2 px-4 rounded-md bg-pink-500/20 text-pink-500 font-medium mb-2"
                      onClick={closeMenu}
                    >
                      Upgrade plan
                    </Link>
                    <Link 
                      href="/account/purchase-credits"
                      className="block text-center py-2 px-4 rounded-md bg-white text-zinc-900 font-medium"
                      onClick={closeMenu}
                    >
                      Purchase credits
                    </Link>
                  </div>
                  
                  <div className="p-1">
                    <Link 
                      href="/account/billing"
                      className="flex items-center justify-between px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 w-full text-left"
                      onClick={closeMenu}
                    >
                      <span>Billing</span>
                      <ExternalLink size={14} className="text-zinc-500" />
                    </Link>
                    <Link 
                      href="/account/profile"
                      className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 w-full text-left"
                      onClick={closeMenu}
                    >
                      <span>Profile</span>
                    </Link>
                  </div>
                  
                  <div className="border-t border-zinc-800 p-1">
                    <button 
                      className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 w-full text-left"
                      onClick={handleSignOut}
                    >
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                href="/auth/login"
                className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-8 h-8 text-zinc-50 rounded-full group w-full max-w-24 hidden md:flex"
              >
                Sign in
              </Link>
              <Link 
                href="/auth/signup"
                className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-8 h-8 rounded-full group w-full max-w-24 hidden md:flex"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header; 