import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-black'>
      <Head>
        <title>Sign In - AI Video Bakery</title>
      </Head>
      <div className='w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center text-white'>Welcome to AI Video Bakery</h1>
        <form className='space-y-6'>
          <div>
            <label htmlFor='email' className='text-sm font-medium text-gray-300'>Email</label>
            <input type='email' id='email' name='email' required className='w-full p-2 mt-1 text-gray-900 bg-gray-100 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500'/>
          </div>
          <div>
            <label htmlFor='password' className='text-sm font-medium text-gray-300'>Password</label>
            <input type='password' id='password' name='password' required className='w-full p-2 mt-1 text-gray-900 bg-gray-100 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500'/>
          </div>
          <button type='submit' className='w-full p-3 text-sm font-medium text-white bg-blue-500 rounded-md'>Sign in with Email</button>
          <button type='button' className='w-full p-3 text-sm font-medium text-white bg-red-500 rounded-md'>Log in with Google</button>
          <div className='text-center text-sm text-gray-400'>Don't have an account? <Link href='/signup'><a className='text-blue-500 hover:underline'>Sign up now</a></Link></div>
          <div className='text-center text-sm text-gray-400'><Link href='/forgot-password'><a className='text-blue-500 hover:underline'>Forgot password?</a></Link></div>
        </form>
      </div>
    </div>
  );
} 