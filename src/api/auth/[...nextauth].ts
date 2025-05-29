import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { MongoClient } from 'mongodb';

// Extend the default NextAuth types to include our custom fields
declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string;
    }
  }
  
  interface JWT {
    id?: string;
    sub?: string;
  }
}

// Initialize MongoDB connection
const uri = process.env.MONGODB_URI || '';
const options = {};
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env');
}

// Add global type declaration for MongoDB client
declare global {
  // Using var is required for global declarations in Node.js
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID to the session
      if (session.user) {
        // Use token.id which we set in the JWT callback, or fallback to token.sub
        // Add type assertion to handle id property
        const tokenId = token.id as string | undefined;
        const tokenSub = token.sub as string | undefined;
        session.user = {
          ...session.user,
          id: tokenId || tokenSub || ''
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user ID from MongoDB to the token
      if (user) {
        // Make sure we have a valid ID from the user object
        // For Google OAuth, we can use the sub field which is guaranteed to exist
        // Use type assertion to handle potential undefined id
        const userId = (user as { id?: string }).id;
        const tokenSub = token.sub as string | undefined;
        token.id = userId || tokenSub || '';
      }
      return token;
    },
  },
});
