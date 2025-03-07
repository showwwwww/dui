import { NextRequest, NextResponse } from 'next/server';
import plugins from '@/mw-plugins';

const exclude = (request: Request): boolean => {
  return request.url.startsWith('/api') || request.url.startsWith('/_next');
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (exclude(request)) {
    return response;
  }

  for (const plugin of plugins) {
    if (plugin.matcher(request)) {
      plugin.middleware(request, response);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // match all routes except static assets
  ],
};
