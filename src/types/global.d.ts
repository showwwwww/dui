import type { NextRequest, NextResponse } from 'next/server';

declare global {
  interface MWPlugin {
    middleware: (request: NextRequest, response: NextResponse) => void;
    matcher: (request: NextRequest) => boolean;
  }

  type Theme = 'light' | 'dark';

  type Locale = 'en' | 'zh-CN';

  type TranslationKeys = {
    loginPage: {
      loginButton: string;
    };
  };

  type Translations = {
    [key in Locale]: TranslationKeys;
  };
}

export {};
