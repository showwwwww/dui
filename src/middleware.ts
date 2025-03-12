import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import plugins from '@/mw-plugins';
import { PASSWORD } from '../const-global/index.mjs';

const exclude = (request: Request): boolean => {
  return (
    request.url.startsWith('/api') ||
    request.url.startsWith('/_next') ||
    request.url.includes('/auth')
  );
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (exclude(request)) {
    return response;
  }

  for (const plugin of plugins) {
    if (await plugin.matcher(request)) {
      await plugin.middleware(request, response);
    }
  }

  const token = await getToken({ req: request, secret: process.env[PASSWORD] });
  if (!token && !request.url.includes('/login')) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // match all routes except static assets
  ],
};

export { default } from 'next-auth/middleware';
