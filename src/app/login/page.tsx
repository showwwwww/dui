'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useI18n } from '@/app/contexts/i18n-context';

export default function Login() {
  const { translations: t } = useI18n();
  const router = useRouter();
  return (
    <div>
      <button
        onClick={async () => {
          const csrf = await fetch('/api/auth/csrf').then((res) => res.json());
          await signIn('credentials', {
            csrfToken: csrf.csrfToken,
            redirect: false,
            username: 'test',
            password: '123456789',
          });
          router.push('/home');
        }}
      >
        {t?.loginPage.loginButton}
      </button>
    </div>
  );
}
