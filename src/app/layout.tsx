import type { Metadata } from 'next';
import { I18nProvider } from '@/app/contexts/i18n-context';
import { ThemeProvider } from '@/app/contexts/theme-context';
import ssrPrefService from '@/service/ServerPreferencesService';
import App from './App';
import './globals.css';

export const metadata: Metadata = {
  title: 'dui',
  description: 'Manage your docker containers with ease',
};

const getInitial = async (): Promise<{
  initialTheme: Theme;
  initialLocale: Locale;
}> => {
  const initialTheme = await ssrPrefService.getThemePreference();
  const initialLocale = await ssrPrefService.getLocalePreference();
  return {
    initialTheme,
    initialLocale,
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { initialTheme, initialLocale } = await getInitial();
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <I18nProvider initialLocale={initialLocale}>
        <App>{children}</App>
      </I18nProvider>
    </ThemeProvider>
  );
}
