// This file contains declarations for modules that don't have TypeScript definitions
import * as React from 'react';

declare module 'next-themes' {
  export const ThemeProvider: React.FC<{
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    children: React.ReactNode;
  }>;
  export const useTheme: () => {
    theme: string;
    setTheme: (theme: string) => void;
    resolvedTheme: string;
    systemTheme: string;
  };
}

// Add other declarations if needed in the future 