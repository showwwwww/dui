import { loadTranslations } from '@/lib/i18n';
import { getLocaleFromCookies } from '@/lib/i18n_utils';
import LoginClient from './LoginClient';

export default async function Login() {
  const locale = await getLocaleFromCookies();
  const translations = await loadTranslations(locale);

  return <LoginClient initialTranslations={translations} />;
}
