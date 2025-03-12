import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Creates a handler that manages all auth-related requests
const handler = NextAuth(authOptions);

// Exports both GET and POST methods to handle different types of auth requests
export { handler as GET, handler as POST };
