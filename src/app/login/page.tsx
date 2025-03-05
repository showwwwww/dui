'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/app/contexts/i18n-context';
import { loadTranslations } from '@/lib/i18n';
import type { TranslationKeys } from '@/types/i18n';

export default function Login() {
  const router = useRouter();
  const { locale } = useI18n();
  const [state, setState] = React.useState<TranslationKeys>();
  useEffect(() => {
    loadTranslations(locale).then((t) => {
      console.log(t);
      setState(t);
    });
  }, [locale]);
  return (
    <div>
      <button
        onClick={() => {
          router.push('/home');
        }}
      >
        {state?.loginPage.loginButton}
      </button>
    </div>
  );
}
