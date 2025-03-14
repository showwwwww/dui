import NextAuth, { type NextAuthOptions } from 'next-auth';
import getConfig from 'next/config';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '@/lib/auth-utils';
import { USERNAME, PASSWORD } from '../../const-global/index.mjs';

const getAdminCredentials = (): { username: string; passwordHash: string } => {
  const { serverRuntimeConfig } = getConfig();
  const username = serverRuntimeConfig[USERNAME];
  const passwordHash = serverRuntimeConfig[PASSWORD];
  console.log('username', username, passwordHash, 'passwordHash');
  if (!username || !passwordHash) {
    return { username: '', passwordHash: '' };
  }
  return { username, passwordHash };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, passwordHash } = getAdminCredentials();
        if (!credentials?.username || !credentials.password) {
          return null;
        }

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
          role: 'admin',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60 * 24, // 30 days
  },
  secret: process.env[PASSWORD],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
