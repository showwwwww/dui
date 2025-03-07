'use client';

import React from 'react';
import PersistClient from '@/lib/persist_client';
import { I18N_COOKIE_KEY } from '@/static/cookies';
import { loadTranslations } from '@/lib/i18n';
import defaultTranslations from '@/locales/en';

const I18nContext = React.createContext<{
  locale: Locale;
  translations: TranslationKeys;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
}>({
  locale: 'en',
  translations: defaultTranslations,
  setLocale: () => {},
});

const LocaleStore = PersistClient.getLocaleStore();

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = React.useState<Locale>(initialLocale);
  const [translations, setTranslations] = React.useState<TranslationKeys>(defaultTranslations);
  React.useEffect(() => {
    LocaleStore.set(I18N_COOKIE_KEY, locale, {
      expires: 365,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    loadTranslations(locale).then(setTranslations);
    setLocale(locale);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => React.useContext(I18nContext);
