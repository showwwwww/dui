'use server';
import { cookies } from 'next/headers';
import { I18N_COOKIE_KEY } from '@/static/cookies';
import { Locale } from '@/types/i18n';
import { getValidLocale } from '@/lib/i18n';

export async function getLocaleFromCookies(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    return getValidLocale(cookieStore.get(I18N_COOKIE_KEY)?.value);
  } catch (error) {
    console.error('Failed to get locale from cookies', error);
    return getValidLocale();
  }
}
