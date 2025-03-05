import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { getValidLocale, locales, defaultLocale } from '@/lib/i18n';
import { I18N_COOKIE_KEY } from '@/static/cookies';

export function middleware(request: NextRequest) {
  // exclude API routes and Next.js internal routes
  if (request.nextUrl.pathname.startsWith('/api')) return NextResponse.next();

  // language detection
  const cookieLocale = request.cookies.get(I18N_COOKIE_KEY)?.value;
  const detectedLocale = cookieLocale || detectBrowserLocale(request);

  const validLocale = getValidLocale(detectedLocale);

  // set request headers and cookies
  const response = NextResponse.next();
  response.headers.set('x-locale', validLocale);

  if (!cookieLocale) {
    response.cookies.set(I18N_COOKIE_KEY, validLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
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

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // match all routes except static assets
  ],
};
