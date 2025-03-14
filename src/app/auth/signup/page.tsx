'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Password validation checks
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasMinLength = password.length >= 8;

  // Check if all password requirements are met and passwords match
  useEffect(() => {
    setIsFormValid(
      email.trim() !== '' && 
      hasLowercase && 
      hasUppercase && 
      hasNumber && 
      hasSpecialChar && 
      hasMinLength && 
      password === confirmPassword
    );
  }, [email, password, confirmPassword, hasLowercase, hasUppercase, hasNumber, hasSpecialChar, hasMinLength]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isFormValid) {
      setError('Please ensure all password requirements are met and passwords match');
      return;
    }
    
    try {
      setIsLoading(true);
      await signUp(email, password, email.split('@')[0]); // Using part of email as name for simplicity
      // Redirect is handled in the signUp function from AuthContext
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setIsLoading(true);
    try {
      // This would be Google Sign-up logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/');
    } catch (err) {
      setError('Google signup failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="relative h-full min-h-screen bg-black flex flex-col items-center justify-center px-6 py-10">
        <form 
          onSubmit={handleSignup}
          className="max-w-[416px] w-full mx-auto flex flex-col items-center"
        >
          {error && (
            <div className="w-full mb-4 p-3 bg-red-900/20 border border-red-900 text-red-400 rounded-md">
              {error}
            </div>
          )}
          
          {/* Snowflake icon */}
          <div className="mb-6">
            <svg viewBox="0 0 24 24" width="32" height="32" className="text-white">
              <path
                fill="currentColor"
                d="M11,6.5v-6.5h2v6.5c0,0.28 -0.22,0.5 -0.5,0.5h-1c-0.28,0 -0.5,-0.22 -0.5,-0.5zM16.5,13h6.5v-2h-6.5c-0.28,0 -0.5,0.22 -0.5,0.5v1c0,0.28 0.22,0.5 0.5,0.5zM7.5,13h-6.5v-2h6.5c0.28,0 0.5,0.22 0.5,0.5v1c0,0.28 -0.22,0.5 -0.5,0.5zM11,17.5v6.5h2v-6.5c0,-0.28 -0.22,-0.5 -0.5,-0.5h-1c-0.28,0 -0.5,0.22 -0.5,0.5zM13.88,3.42l4.6,-4.6l1.41,1.41l-4.6,4.6c-0.2,0.2 -0.51,0.2 -0.71,0l-1,-1c-0.19,-0.2 -0.19,-0.51 0.01,-0.7zM19.58,13.88l4.6,4.6l-1.41,1.41l-4.6,-4.6c-0.2,-0.2 -0.2,-0.51 0,-0.71l1,-1c0.2,-0.19 0.51,-0.19 0.7,0.01zM10.12,3.42l-4.6,-4.6l-1.41,1.41l4.6,4.6c0.2,0.2 0.51,0.2 0.71,0l1,-1c0.19,-0.2 0.19,-0.51 -0.01,-0.7zM4.42,13.88l-4.6,4.6l1.41,1.41l4.6,-4.6c0.2,-0.2 0.2,-0.51 0,-0.71l-1,-1c-0.2,-0.19 -0.51,-0.19 -0.7,0.01zM14.5,12c0,1.38 -1.12,2.5 -2.5,2.5s-2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5s2.5,1.12 2.5,2.5z"
              />
            </svg>
          </div>
          
          <div className="w-full flex flex-col gap-4 mb-8 items-center">
            <h1 className="text-[36px] text-center leading-[44px] text-white">Create an account</h1>
          </div>
          
          <div className="w-full flex flex-col gap-4">
            <input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full font-sans rounded-md py-3 px-4 bg-zinc-900 border border-zinc-800 focus:border-zinc-700 focus:outline-none text-white"
              required
              autoComplete="off"
            />
            
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full font-sans rounded-md py-3 px-4 bg-zinc-900 border border-zinc-800 focus:border-zinc-700 focus:outline-none text-white"
              required
              autoComplete="off"
            />
            
            <input 
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full font-sans rounded-md py-3 px-4 bg-zinc-900 border border-zinc-800 focus:border-zinc-700 focus:outline-none text-white"
              required
              autoComplete="off"
            />
            
            <button 
              type="submit"
              disabled={!isFormValid || isLoading || authLoading}
              className="w-full mt-4 flex justify-center items-center rounded-full uppercase font-sans py-3 h-12 text-sm tracking-[0.65px] bg-zinc-500 text-white hover:bg-zinc-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading || authLoading ? 'SIGNING UP...' : 'SIGN UP WITH EMAIL'}
            </button>

            {/* Password requirements section */}
            <div className="flex flex-col gap-2 p-2">
              <span className={`flex gap-2 items-center ${hasLowercase ? 'text-green-500' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M10 6.333L7 10 5.667 8.667M14.333 8A6.333 6.333 0 111.667 8a6.333 6.333 0 0112.666 0z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="font-sans text-sm leading-5">Contains at least 1 lowercase letter</p>
              </span>

              <span className={`flex gap-2 items-center ${hasUppercase ? 'text-green-500' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M10 6.333L7 10 5.667 8.667M14.333 8A6.333 6.333 0 111.667 8a6.333 6.333 0 0112.666 0z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="font-sans text-sm leading-5">Contains at least 1 uppercase letter</p>
              </span>

              <span className={`flex gap-2 items-center ${hasNumber ? 'text-green-500' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M10 6.333L7 10 5.667 8.667M14.333 8A6.333 6.333 0 111.667 8a6.333 6.333 0 0112.666 0z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="font-sans text-sm leading-5">Contains at least 1 number</p>
              </span>

              <span className={`flex gap-2 items-center ${hasSpecialChar ? 'text-green-500' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M10 6.333L7 10 5.667 8.667M14.333 8A6.333 6.333 0 111.667 8a6.333 6.333 0 0112.666 0z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="font-sans text-sm leading-5">Contains at least 1 special character</p>
              </span>

              <span className={`flex gap-2 items-center ${hasMinLength ? 'text-green-500' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M10 6.333L7 10 5.667 8.667M14.333 8A6.333 6.333 0 111.667 8a6.333 6.333 0 0112.666 0z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="font-sans text-sm leading-5">Is at least 8 characters long</p>
              </span>
            </div>
          </div>
          
          <div className="w-full flex gap-4 my-8 text-gray-400">
            <div className="flex-1 flex flex-col">
              <div className="flex-1"></div>
              <div className="flex-1 border-t border-t-zinc-700"></div>
            </div>
            <span className="font-sans text-xs leading-5 tracking-wide font-semibold uppercase">OR</span>
            <div className="flex-1 flex flex-col">
              <div className="flex-1"></div>
              <div className="flex-1 border-t border-t-zinc-700"></div>
            </div>
          </div>
          
          <div className="w-full flex flex-col items-center gap-8">
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isLoading || authLoading}
              className="group relative flex justify-center items-center rounded-full uppercase font-sans gap-1.5 focus:outline-none disabled:cursor-not-allowed px-[22px] py-0 h-12 text-sm tracking-[0.65px] leading-[22px] bg-zinc-900 text-gray-300 border border-zinc-700 hover:border-blue-500 hover:bg-zinc-800 transition-colors duration-300 disabled:opacity-50 w-full font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="w-3.5 h-3.5 mr-2">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                <path d="M1 1h22v22H1z" fill="none"></path>
              </svg>
              <span className="leading-none">LOG IN WITH GOOGLE</span>
            </button>
            
            <div className="flex flex-col items-center gap-3 font-sans text-[14px] leading-[22px]">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-pink-500 hover:underline">
                  Sign in
                </Link>
              </p>
              <Link href="/auth/forgot-password" className="text-gray-400 hover:text-gray-300">
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
        
        {/* Background glow effects (simplified) */}
        <div className="pointer-events-none transform-gpu absolute bg-purple-500/10 bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] blur-[100px] rounded-[50%]"></div>
      </div>

      {/* Footer */}
      <footer className="z-elevated relative bg-black border-t border-t-zinc-800 py-10 lg:py-20 px-4 sm:px-6 lg:px-8 min-h-[300px]">
        <div className="max-w-7xl mx-auto overflow-hidden z-10">
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="flex flex-grow flex-col gap-6 md:gap-12">
              <div className="space-y-6">
                <Link href="/" className="flex items-center">
                  <span className="flex items-center text-bright">
                    <svg viewBox="0 0 24 24" width="22" height="22" className="text-primary">
                      <path
                        fill="currentColor"
                        d="M11,6.5v-6.5h2v6.5c0,0.28 -0.22,0.5 -0.5,0.5h-1c-0.28,0 -0.5,-0.22 -0.5,-0.5zM16.5,13h6.5v-2h-6.5c-0.28,0 -0.5,0.22 -0.5,0.5v1c0,0.28 0.22,0.5 0.5,0.5zM7.5,13h-6.5v-2h6.5c0.28,0 0.5,0.22 0.5,0.5v1c0,0.28 -0.22,0.5 -0.5,0.5zM11,17.5v6.5h2v-6.5c0,-0.28 -0.22,-0.5 -0.5,-0.5h-1c-0.28,0 -0.5,0.22 -0.5,0.5z"
                      />
                    </svg>
                    <span className="ml-2 font-bold text-lg text-white">AI Video Bakery</span>
                  </span>
                </Link>
                <p className="text-sm text-gray-500">AI Video Bakery, Inc, © {new Date().getFullYear()}</p>
              </div>

              <div className="flex space-x-3">
                <a className="text-gray-500 w-7.5 h-7.5 grid place-content-center hover:text-gray-300 transition-colors duration-300" href="https://x.com/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="18" height="18">
                    <path d="M8.48 6.03L13.17.67h-2.15L7.49 4.72 4.43.67H0l5.29 6.92-5.02 5.73h2.15L6.3 8.9l3.38 4.42H14L8.48 6.03zm1.79 6.01L2.51 1.89h1.28l7.68 10.15h-1.2z" fill="currentColor"></path>
                  </svg>
                </a>
                <a className="text-gray-500 w-7.5 h-7.5 grid place-content-center hover:text-gray-300 transition-colors duration-300" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path d="M17.073 0h-4.045v16.348c0 1.948-1.556 3.548-3.492 3.548s-3.491-1.6-3.491-3.548c0-1.913 1.52-3.478 3.388-3.548V8.696C5.319 8.766 2 12.139 2 16.348 2 20.59 5.388 24 9.57 24c4.184 0 7.572-3.444 7.572-7.652V7.965A9.366 9.366 0 0022.5 9.774V5.67c-3.042-.105-5.427-2.61-5.427-5.67z" fill="currentColor"></path>
                  </svg>
                </a>
                <a className="text-gray-500 w-7.5 h-7.5 grid place-content-center hover:text-gray-300 transition-colors duration-300" href="https://discord.gg/" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path d="M16.93 1.641A16.491 16.491 0 0012.86.38a.062.062 0 00-.066.03c-.175.313-.37.721-.506 1.042a15.226 15.226 0 00-4.573 0A10.538 10.538 0 007.2.41a.064.064 0 00-.065-.031 16.447 16.447 0 00-4.07 1.262.058.058 0 00-.028.024C.444 5.538-.266 9.316.083 13.047a.069.069 0 00.026.047 16.586 16.586 0 004.994 2.524.064.064 0 00.07-.023c.385-.525.728-1.079 1.022-1.661a.063.063 0 00-.035-.088 10.917 10.917 0 01-1.56-.744.064.064 0 01-.007-.107c.105-.078.21-.16.31-.242a.062.062 0 01.065-.009c3.273 1.494 6.817 1.494 10.051 0a.061.061 0 01.066.008c.1.082.204.165.31.243a.064.064 0 01-.005.107c-.499.291-1.017.537-1.561.743a.064.064 0 00-.034.089c.3.581.643 1.135 1.02 1.66a.063.063 0 00.07.024 16.532 16.532 0 005.003-2.524.065.065 0 00.026-.046c.417-4.314-.699-8.062-2.957-11.384a.05.05 0 00-.026-.024zM6.684 10.776c-.985 0-1.797-.905-1.797-2.016 0-1.11.796-2.016 1.797-2.016 1.01 0 1.814.913 1.798 2.016 0 1.111-.796 2.016-1.798 2.016zm6.646 0c-.986 0-1.797-.905-1.797-2.016 0-1.11.796-2.016 1.797-2.016 1.009 0 1.813.913 1.797 2.016 0 1.111-.788 2.016-1.797 2.016z" fill="currentColor"></path>
                  </svg>
                </a>
                <a className="text-gray-500 w-7.5 h-7.5 grid place-content-center hover:text-gray-300 transition-colors duration-300" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="18" height="18">
                    <path d="M12.96 0H1.03C.47-.01.01.44 0 1.01v11.98c.01.56.47 1.02 1.03 1.01h11.93c.57 0 1.04-.45 1.04-1.01V1.01C14 .45 13.53 0 12.96 0zM4.15 11.93H2.07V5.25h2.08v6.68zM3.11 4.34a1.2 1.2 0 01-1.2-1.21c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2c.01.67-.53 1.21-1.2 1.21zm8.82 7.59H9.85V8.68c0-.78-.02-1.77-1.08-1.77-1.08 0-1.25.84-1.25 1.72v3.3H5.46V5.25h1.99v.91h.03c.28-.52.95-1.08 1.97-1.08 2.1 0 2.49 1.38 2.49 3.18v3.67z" fill="currentColor"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-12 md:gap-0">
              <div className="space-y-4 min-w-[136px] lg:min-w-[192px]">
                <h3 className="text-sm font-sans leading-[22px] text-white tracking-[0.0375rem]">PRODUCT</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/app/video" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      CREATE
                    </Link>
                  </li>
                  <li>
                    <Link href="/app/image" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      STYLIZE
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      COMMUNITY
                    </Link>
                  </li>
                  <li>
                    <Link href="/feedback" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      FEEDBACK
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 min-w-[136px] lg:min-w-[192px]">
                <h3 className="text-sm font-sans leading-[22px] text-white tracking-[0.0375rem]">COMPANY</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/about" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      ABOUT
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      CAREERS
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      SUPPORT
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 min-w-[136px] lg:min-w-[192px]">
                <h3 className="text-sm font-sans leading-[22px] text-white tracking-[0.0375rem]">LEGAL</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/privacy" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      PRIVACY POLICY
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      TERMS OF USE
                    </Link>
                  </li>
                  <li>
                    <Link href="/acceptable-use" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      ACCEPTABLE USE POLICY
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookie-policy" className="text-gray-500 text-sm font-sans leading-[22px] tracking-[0.0375rem] hover:text-white transition-color duration-300">
                      COOKIE POLICY
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 