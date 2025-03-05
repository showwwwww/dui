import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { getValidLocale, locales, defaultLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  // exclude API routes and Next.js internal routes
  if (request.nextUrl.pathname.startsWith('/api')) return NextResponse.next();
  if (request.nextUrl.pathname.startsWith('/_next')) return NextResponse.next();

  // language detection
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const detectedLocale = cookieLocale || detectBrowserLocale(request);
  const validLocale = getValidLocale(detectedLocale);

  // set request headers and cookies
  const response = NextResponse.next();
  response.headers.set('x-locale', validLocale);

  if (!cookieLocale) {
    response.cookies.set('NEXT_LOCALE', validLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
  return response;
}

function detectBrowserLocale(request: NextRequest): string | null {
  const negotiator = new Negotiator({
    headers: { 'accept-language': request.headers.get('accept-language') || '' },
  });
  return match(negotiator.languages(), locales, defaultLocale);
}
