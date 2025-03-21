import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles: string[];
    tokenVersion: number;
    lastInvalidation: number;
  }

  interface Session {
    user: User;
    tokenVersion?: number;
    lastInvalidation?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    roles: string[];
    tokenVersion?: number;
    lastInvalidation?: number;
  }
}
