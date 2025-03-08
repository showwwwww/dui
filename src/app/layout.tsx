import type { Metadata } from 'next';
import { I18nProvider } from '@/app/contexts/i18n-context';
import { ThemeProvider } from '@/app/contexts/theme-context';
import ssrPrefService from '@/services/ServerPreferencesService';
import App from './App';
import './globals.css';

export const metadata: Metadata = {
  title: 'dui',
  description: 'Manage your docker containers with ease',
};

const getInitial = async (): Promise<{
  initialTheme: Theme;
  initialLocale: Locale;
  initialTranslations: TranslationKeys;
}> => {
  const initialTheme = await ssrPrefService.getThemePreference();
  const initialLocale = await ssrPrefService.getLocalePreference();
  const initialTranslations = await ssrPrefService.getTranslations(initialLocale);
  return {
    initialTheme,
    initialLocale,
    initialTranslations,
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { initialTheme, initialLocale, initialTranslations } = await getInitial();
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <I18nProvider initialLocale={initialLocale} initialTranslations={initialTranslations}>
        <App>{children}</App>
      </I18nProvider>
    </ThemeProvider>
  );
}
