import type { Locale, Translations } from '@/types/i18n';
import LocalStorage from '@/lib/persist/localStorage';

export const locales = ['en', 'zh-CN'] as const satisfies readonly Locale[];

export const DEFAULT_LOCALE: Locale = 'en';

export const loadTranslations = async (locale: Locale): Promise<Translations[Locale]> => {
  if (LocalStorage.has(locale)) {
    return LocalStorage.get(locale) as Translations[Locale];
  }

  try {
    const translations = (await import(`@/locales/${locale}/index`)).default;
    LocalStorage.set(locale, translations);
    return translations;
  } catch {
    if (LocalStorage.has(DEFAULT_LOCALE)) {
      return LocalStorage.get(DEFAULT_LOCALE) as Translations[Locale];
    }
    const defaultTranslations = (await import(`@/locales/${DEFAULT_LOCALE}/index`)).default;
    LocalStorage.set(DEFAULT_LOCALE, defaultTranslations);
    return defaultTranslations;
  }
};

export const getValidLocale = (input?: string | null): Locale => {
  return locales.includes(input as Locale) ? (input as Locale) : DEFAULT_LOCALE;
};
