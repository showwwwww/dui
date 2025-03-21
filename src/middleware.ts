import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import plugins from '@/mw-plugins';

const exclude = (request: Request): boolean => {
  return request.url.includes('/_next') || request.url.includes('/auth');
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
  if (!request.url.includes('/login') && !request.url.includes('/validate-token')) {
    const apiUrl = new URL('/api/validate-token', request.url);
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenVersion: token?.tokenVersion,
        lastInvalidation: token?.lastInvalidation,
      }),
    });
    const { isValid } = await response.json();
    if (!isValid) {
      return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // match all routes except static assets
  ],
};

export { default } from 'next-auth/middleware';
