// app/login/LoginClient.tsx (客户端组件)
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Locale, TranslationKeys } from '@/types/i18n';
import useTranslations from '@/app/hooks/useTranslations';
import { useI18n } from '@/app/contexts/i18n-context';

interface Props {
  initialTranslations: TranslationKeys;
}

export default function LoginClient({ initialTranslations }: Props) {
  const router = useRouter();
  const { locale, setLocale } = useI18n();
  const t = useTranslations(initialTranslations);
  return (
    <div>
      <button
        onClick={() => {
          router.push('/home');
        }}
      >
        {t.loginPage.loginButton}
      </button>
      <button
        onClick={() => {
          setLocale((locale === 'zh-CN' ? 'en' : 'zh-CN') as Locale);
        }}
      >
        toggle i18n
      </button>
    </div>
  );
}
