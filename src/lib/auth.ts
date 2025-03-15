import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectToDatabase } from './mongodb';
import clientPromise from './mongodb-client';
import User from '@/models/User';
import dbConnect from './mongoose';

// Extend NextAuth types to include custom properties
declare module 'next-auth' {
  interface User {
    credits?: number;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      subscription?: {
        id: string;
        plan: string;
        status: string;
        currentPeriodEnd: Date;
      } | null;
      credits: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    subscription?: {
      id: string;
      plan: string;
      status: string;
      currentPeriodEnd: Date;
    } | null;
    credits: number;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('User not found');
        }

        const isValid = await user.comparePassword(credentials.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          credits: user.credits
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.credits = user.credits;
      }
      
      // Keep token info up to date
      if (token.id) {
        await dbConnect();
        const freshUser = await User.findById(token.id).select('credits');
        if (freshUser) {
          token.credits = freshUser.credits;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.credits = token.credits as number;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 