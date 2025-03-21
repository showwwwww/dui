import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { verifyPassword } from '@/lib/auth-utils';
import clientPromise from '@/lib/db';

let currentTokenVersion = 1;
let lastInvalidationTime = Date.now();

const getAdminCredentials = async (
  username: string
): Promise<{ username: string; passwordHash: string; roles: string[] }> => {
  const client = await clientPromise;
  const db = client.db('dui');
  const account = await db.collection('accounts').findOne({
    username,
  });
  return {
    username: account?.username,
    passwordHash: account?.password,
    roles: account?.roles,
  };
};

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'dui',
    collections: {
      Accounts: 'accounts',
    },
  }),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        currentTokenVersion += 1;
        lastInvalidationTime = Date.now();

        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const { username, passwordHash, roles } = await getAdminCredentials(credentials.username);
        if (credentials.username !== username) {
          return null;
        }

        const isValid = await verifyPassword(credentials.password, passwordHash);
        if (!isValid) {
          return null;
        }
        return {
          id: 'admin-001',
          name: username,
          roles,
          tokenVersion: currentTokenVersion,
          lastInvalidation: lastInvalidationTime,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60 * 24, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles;
        token.tokenVersion = user.tokenVersion;
        token.lastInvalidation = user.lastInvalidation;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role && session.user) {
        session.user.roles = token.roles;
        session.tokenVersion = token.tokenVersion;
        session.lastInvalidation = token.lastInvalidation;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);

export async function validateTokenVersion(tokenVersion?: number, lastInvalidation?: number) {
  return tokenVersion === currentTokenVersion && (lastInvalidation ?? -1) >= lastInvalidationTime;
}
