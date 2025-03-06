export type Theme = 'light' | 'dark';

declare module 'tailwindcss/colors' {
  interface Colors {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
  }
}
