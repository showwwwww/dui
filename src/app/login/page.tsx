'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/app/contexts/i18n-context';

export default function Login() {
  const router = useRouter();
  const { locale, setLocale, translations: t } = useI18n();
  return (
    <div>
      <button
        onClick={() => {
          router.push('/home');
        }}
      >
        {t?.loginPage.loginButton}
      </button>
      <button
        onClick={() => {
          setLocale((locale === 'zh-CN' ? 'en' : 'zh-CN') as Locale);
        }}
      >
        toggle i18n
      </button>
      <h1>{locale}</h1>
    </div>
  );
}
