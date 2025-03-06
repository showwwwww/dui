import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import { I18nProvider } from '@/app/contexts/i18n-context';
import { getLocaleFromCookies } from '@/lib/i18n_utils';
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
  const locale = await getLocaleFromCookies();
  return (
    <I18nProvider initialLocale={locale}>
      <App>{children}</App>
    </I18nProvider>
  );
}
