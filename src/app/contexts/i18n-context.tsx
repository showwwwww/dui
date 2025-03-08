'use client';

import React from 'react';
import defaultTranslations from '@/locales/en';
import userPrefService from '@/services/UserPreferencesService';

const I18nContext = React.createContext<{
  locale: Locale;
  translations: TranslationKeys;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
}>({
  locale: 'en',
  translations: defaultTranslations,
  setLocale: () => {},
});

export function I18nProvider({
  initialLocale,
  initialTranslations,
  children,
}: {
  initialLocale: Locale;
  initialTranslations: TranslationKeys;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = React.useState<Locale>(initialLocale);
  const [translations, setTranslations] = React.useState<TranslationKeys>(initialTranslations);
  React.useEffect(() => {
    userPrefService.saveLocalePreference(locale);
    userPrefService.getTranslations(locale).then(setTranslations);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => React.useContext(I18nContext);
