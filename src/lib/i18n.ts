import PersistClient from '@/lib/persist_client/';

export const locales = ['en', 'zh-CN'] as const satisfies readonly Locale[];

export const DEFAULT_LOCALE: Locale = 'en';

export const loadTranslations = async (locale: Locale): Promise<Translations[Locale]> => {
  const TranslationsStore = PersistClient.getTranslationsStore();
  if (TranslationsStore.has(locale)) {
    return TranslationsStore.get(locale) as Translations[Locale];
  }

  try {
    const translations = (await import(`@/locales/${locale}/index`)).default;
    TranslationsStore.set(locale, translations);
    return translations;
  } catch {
    if (TranslationsStore.has(DEFAULT_LOCALE)) {
      return TranslationsStore.get(DEFAULT_LOCALE) as Translations[Locale];
    }
    const defaultTranslations = (await import(`@/locales/${DEFAULT_LOCALE}/index`)).default;
    TranslationsStore.set(DEFAULT_LOCALE, defaultTranslations);
    return defaultTranslations;
  }
};

export const getValidLocale = (input?: string | null): Locale => {
  return locales.includes(input as Locale) ? (input as Locale) : DEFAULT_LOCALE;
};
