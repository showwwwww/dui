'use client';
import React from 'react';
import PersistClient from '@/lib/persist_client';
import { THEME_COOKIE_KEY } from '@/static/cookies';

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}>({
  theme: 'light',
  setTheme: () => {},
});

const ThemeStore = PersistClient.getThemeStore();

export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = React.useState<Theme>(initialTheme);
  React.useEffect(() => {
    ThemeStore.set(THEME_COOKIE_KEY, theme, {
      expires: 365,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => React.useContext(ThemeContext);
