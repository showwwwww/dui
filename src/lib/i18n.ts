import type { Locale, Translations } from '@/types/i18n';

export const locales = ['en', 'zh-CN'] as const satisfies readonly Locale[];

export const defaultLocale: Locale = 'en';

const translationsCache = new Map<Locale, Translations[Locale]>();

export const loadTranslations = async (locale: Locale): Promise<Translations[Locale]> => {
  if (translationsCache.has(locale)) {
    return translationsCache.get(locale) as Translations[Locale];
  }

  try {
    return (await import(`@/app/locales/${locale}/index`)).default;
  } catch {
    return (await import('@/app/locales/en/index')).default;
  }
};

export const getValidLocale = (input?: string | null): Locale => {
  return locales.includes(input as Locale) ? (input as Locale) : defaultLocale;
};
