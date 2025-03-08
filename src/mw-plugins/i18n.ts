import { NextResponse, type NextRequest } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { LOCALE_COOKIE_KEY, DEFAULT_LOCALE, locales } from '@/const';
import ssrPrefService from '@/services/ServerPreferencesService';

const getValidLocale = (input?: string | null): Locale => {
  return locales.includes(input as Locale) ? (input as Locale) : DEFAULT_LOCALE;
};

const detectBrowserLocale = (request: NextRequest): string | null => {
  const negotiator = new Negotiator({
    headers: { 'accept-language': request.headers.get('accept-language') || '' },
  });
  return match(negotiator.languages(), locales, DEFAULT_LOCALE);
};

const handleI18n = async (request: NextRequest, response: NextResponse) => {
  // language detection
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_KEY)?.value;
  const detectedLocale = cookieLocale || detectBrowserLocale(request);

  const validLocale = getValidLocale(detectedLocale);

  // save locale
  await ssrPrefService.saveLocalePreference(validLocale);

  const currentLocale = await ssrPrefService.getLocalePreference();
  response.headers.set('x-locale', currentLocale);
};

const defaultPlugin: MWPlugin = {
  middleware: async (request, response) => {
    await handleI18n(request, response);
  },
  // handle all default api
  matcher: () => true,
};

export default defaultPlugin;
