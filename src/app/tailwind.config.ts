import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',

        // Primary colors
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },

        // Secondary colors
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        },

        // Border & input
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',

        // Status colors
        destructive: 'rgb(var(--destructive) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)', // New success color
        warning: 'rgb(var(--warning) / <alpha-value>)', // New warning color

        // Text & UI states
        muted: 'rgb(var(--muted) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
      },

      // Extended opacity/alpha handling
      backgroundColor: ({ theme }) => ({
        ...theme('colors'),
      }),
      textColor: ({ theme }) => ({
        ...theme('colors'),
      }),
    },
  },
};

export default config;
