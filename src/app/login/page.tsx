'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useI18n } from '@/app/contexts/i18n-context';

export default function Login() {
  const { locale, setLocale, translations: t } = useI18n();
  return (
    <div>
      <button
        onClick={async () => {
          const csrf = await fetch('/api/auth/csrf').then((res) => res.json());
          await signIn('credentials', {
            csrfToken: csrf.csrfToken,
            redirect: true,
            username: 'test',
            password: '123456789',
            callbackUrl: '/home',
          });
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
