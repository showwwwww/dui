import type { Locale, Translations } from '@/types/i18n';

export const locales = ['en', 'zh-CN'] as const satisfies readonly Locale[];

export const defaultLocale: Locale = 'en';

export const loadTranslations = async (locale: Locale): Promise<Translations[Locale]> => {
  try {
    return (await import(`@/app/locales/${locale}/index`)).default;
  } catch {
    return (await import('@/app/locales/en/index')).default;
  }
};

export const getValidLocale = (input?: string | null): Locale => {
  return locales.includes(input as Locale) ? (input as Locale) : defaultLocale;
};
