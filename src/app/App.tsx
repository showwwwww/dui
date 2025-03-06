'use client';

import { useI18n } from './contexts/i18n-context';

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale } = useI18n();
  return (
    <html lang={locale}>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
