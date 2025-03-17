import type { NextRequest, NextResponse } from 'next/server';

declare global {
  type JSBaseType = string | number | boolean | object | null | undefined;

  interface MWPlugin {
    middleware: (request: NextRequest, response: NextResponse) => Promise<void> | void;
    matcher: (request: NextRequest) => Promise<boolean> | boolean;
  }

  type Theme = 'light' | 'dark';

  type Locale = 'en' | 'zh-CN';

  type TranslationKeys = {
    header: {
      title: string;
    };
    loginPage: {
      title: string;
      loginButton: string;
      usernameLabel: string;
      usernamePlaceholder: string;
      usernameError: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      passwordError: string;
    };
  };
  declare module '*.svg' {
    import * as React from 'react';

    const ReactComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { title?: string }
    >;

    export default ReactComponent;
  }

  type Translations = {
    [key in Locale]: TranslationKeys;
  };
}

export {};
