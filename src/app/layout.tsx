import type { Metadata } from 'next';
import { I18nProvider } from '@/app/contexts/i18n-context';
import { ThemeProvider } from './contexts/theme-context';
import './globals.css';
import App from './App';

export const metadata: Metadata = {
  title: 'dui',
  description: 'Manage your docker containers with ease',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider initialTheme="light">
      <I18nProvider initialLocale="en">
        <App>{children}</App>
      </I18nProvider>
    </ThemeProvider>
  );
}
