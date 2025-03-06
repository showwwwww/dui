'use client';
import React from 'react';
import Cookies from 'js-cookie';
import type { Theme } from '@/types/theme';
import { THEME_COOKIE_KEY } from '@/static/cookies';

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}>({
  theme: 'light',
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = React.useState<Theme>(initialTheme);
  React.useEffect(() => {
    Cookies.set(THEME_COOKIE_KEY, theme, {
      expires: 365,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => React.useContext(ThemeContext);
