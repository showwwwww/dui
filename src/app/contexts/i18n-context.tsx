'use client';

import React from 'react';
import Cookies from 'js-cookie';
import type { Locale, TranslationKeys } from '@/types/i18n';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { I18N_COOKIE_KEY } from '@/static/cookies';
import { loadTranslations } from '@/lib/i18n';

const I18nContext = React.createContext<{
  locale: Locale;
  translations: TranslationKeys;
  setLocale: (locale: Locale) => void;
}>({
  locale: DEFAULT_LOCALE,
  translations: { loginPage: { loginButton: 'test' } },
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
  const [translations, setTranslations] = React.useState<TranslationKeys>({
    loginPage: { loginButton: 'test' },
  });
  React.useEffect(() => {
    Cookies.set(I18N_COOKIE_KEY, locale, {
      expires: 365,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    loadTranslations(locale).then(setTranslations);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => React.useContext(I18nContext);
