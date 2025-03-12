'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { useI18n } from './contexts/i18n-context';
import { useTheme } from './contexts/theme-context';

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale } = useI18n();
  const { theme } = useTheme();

  return (
    <html lang={locale} data-theme={theme}>
      <body className={`antialiased`}>
        <SessionProvider refetchInterval={60 * 24} refetchOnWindowFocus={true}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
