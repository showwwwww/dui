'use client';

import React from 'react';
import Cookies from 'js-cookie';
import type { Locale } from '@/types/i18n';
import { defaultLocale } from '@/lib/i18n';

const I18nContext = React.createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({
  locale: defaultLocale,
  setLocale: () => {},
});

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = React.useState<Locale>(initialLocale);

  React.useEffect(() => {
    Cookies.set('NEXT_LOCALE', locale, {
      expires: 365,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }, [locale]);

  return <I18nContext.Provider value={{ locale, setLocale }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => React.useContext(I18nContext);
