import type { Metadata } from 'next';
import { I18nProvider } from '@/app/contexts/i18n-context';
import { ThemeProvider } from '@/app/contexts/theme-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'dui',
  description: 'Manage your docker containers with ease',
};

const getInitial = async (): Promise<{
  initialTheme: Theme;
  initialLocale: Locale;
}> => {
  return {
    initialTheme: 'light',
    initialLocale: 'en',
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { initialTheme, initialLocale } = await getInitial();
  return (
    <html lang={initialLocale}>
      <body className={`antialiased`}>
        <ThemeProvider initialTheme={initialTheme}>
          <I18nProvider initialLocale={initialLocale}>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
