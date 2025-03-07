import { type NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { getValidLocale, locales, DEFAULT_LOCALE } from '@/lib/i18n';
import { I18N_COOKIE_KEY } from '@/static/cookies';

const detectBrowserLocale = (request: NextRequest): string | null => {
  const negotiator = new Negotiator({
    headers: { 'accept-language': request.headers.get('accept-language') || '' },
  });
  return match(negotiator.languages(), locales, DEFAULT_LOCALE);
};

const handleI18n = (request: NextRequest, response: NextResponse) => {
  // language detection
  const cookieLocale = request.cookies.get(I18N_COOKIE_KEY)?.value;
  const detectedLocale = cookieLocale || detectBrowserLocale(request);

  const validLocale = getValidLocale(detectedLocale);

  // set request headers and cookies
  response.headers.set('x-locale', validLocale);

  if (!cookieLocale) {
    response.cookies.set(I18N_COOKIE_KEY, validLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
};

const defaultPlugin: MWPlugin = {
  middleware: (request) => {
    const response = NextResponse.next();
    handleI18n(request, response);
    return response;
  },
  // handle all default api
  matcher: () => true,
};

export default defaultPlugin;
