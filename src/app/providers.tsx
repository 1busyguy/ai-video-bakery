'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import AuthProvider from '@/context/AuthContext';
import NextAuthProvider from '@/components/providers/NextAuthProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <NextAuthProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </NextAuthProvider>
    </ThemeProvider>
  );
}

export default Providers; 