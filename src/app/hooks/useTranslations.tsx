import React from 'react';
import { TranslationKeys } from '@/types/i18n';
import { useI18n } from '@/app/contexts/i18n-context';

const useTranslations = (initialTranslations: TranslationKeys) => {
  const { locale } = useI18n();
  const [translations, setTranslations] = React.useState<TranslationKeys>(initialTranslations);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@/lib/i18n').then(({ loadTranslations }) => {
        loadTranslations(locale).then(setTranslations);
      });
    }
  }, [locale]);

  return translations;
};

export default useTranslations;
