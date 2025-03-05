export type Locale = 'en' | 'zh-CN';

export type TranslationKeys = {
  loginPage: {
    loginButton: string;
  };
};

export type Translations = {
  [key in Locale]: TransitionKeys;
};
