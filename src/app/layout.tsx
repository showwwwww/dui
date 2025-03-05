import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { I18nProvider } from '@/app/contexts/i18n-context';
import { getValidLocale } from '@/lib/i18n';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'dui',
  description: 'Manage your docker containers with ease',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getValidLocale();
  return (
    <html lang={locale}>
      <I18nProvider initialLocale={locale}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </I18nProvider>
    </html>
  );
}
