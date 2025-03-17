'use client';
import React from 'react';
import Image from 'next/image';
import { SessionProvider } from 'next-auth/react';
import { Languages, SunMoon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from './contexts/i18n-context';
import { useTheme } from './contexts/theme-context';
import Logo from 'public/logo.png';

function Header() {
  const { setLocale, translations: t } = useI18n();
  const { setTheme } = useTheme();
  return (
    <header className="fixed top-0 w-full z-10 bg-foreground/5 shadow-md h-12 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Image src={Logo} alt="website logo" className="w-8" />
        <h1>{t.header.title}</h1>
      </div>
      <div className="flex items-center">
        <Button
          className="bg-transparent hover:bg-foreground/15"
          onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        >
          <SunMoon />
        </Button>
        <Button
          className="bg-transparent hover:bg-foreground/20"
          onClick={() => setLocale((prev) => (prev === 'en' ? 'zh-CN' : 'en'))}
        >
          <Languages />
        </Button>
      </div>
    </header>
  );
}

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale } = useI18n();
  const { theme } = useTheme();

  return (
    <html lang={locale} data-theme={theme}>
      <body
        className={'antialiased pt-12 h-screen bg-gradient-to-br from-background to-foreground/35'}
      >
        <SessionProvider refetchInterval={60 * 24} refetchOnWindowFocus={true}>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
