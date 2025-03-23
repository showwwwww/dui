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
    homePage: {
      sidebar: {
        dockerGroup: {
          title: string;
          stats: string;
          commands: string;
        };
      };
      statsPage: {
        run: string;
        stop: string;
        running: string;
        stopped: string;
        uptime: string;
        cpuPercent: string;
        memoryUsage: string;
        diskSize: string;
      };
      commandsPage: {
        caption: string;
        columns: {
          name: string;
          command: string;
          params: string;
          description: string;
          tags: {
            title: string;
            default: string;
            levels: [string, string, string, string];
          };
          actions: {
            title: string;
            edit: string;
            delete: string;
          };
        };
      };
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
