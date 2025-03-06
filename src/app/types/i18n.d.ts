export type Locale = 'en' | 'zh-CN';

export type TranslationKeys = {
  common: {
    greeting: string;
  };
};

export type Translations = {
  [key in Locale]: TranslationKeys;
};
