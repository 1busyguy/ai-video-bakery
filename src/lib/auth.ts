import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectToDatabase } from './mongodb';
import clientPromise from './mongodb-client';

// Extend NextAuth types to include custom properties
declare module 'next-auth' {
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

        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to JWT token
      if (user) {
        token.id = user.id;
        // Add other user data as needed
      }
      
      // Add subscription info to JWT token
      if (token.id) {
        const { db } = await connectToDatabase();
        const subscription = await db.collection('subscriptions').findOne({
          userId: token.id,
          status: { $in: ['active', 'trialing'] }
        });

        if (subscription) {
          token.subscription = {
            id: subscription._id.toString(),
            plan: subscription.planId,
            status: subscription.status,
            currentPeriodEnd: subscription.currentPeriodEnd,
          };
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      // Add user info to session
      if (token && session.user) {
        session.user.id = token.id;
        session.user.subscription = token.subscription;
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