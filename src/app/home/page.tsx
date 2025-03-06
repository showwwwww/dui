'use client';
import React from 'react';
import { useTheme } from '@/app/contexts/theme-context';

export default function Home() {
  const { setTheme } = useTheme();
  return (
    <div>
      <button
        onClick={() => {
          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        }}
      >
        toggle Theme
      </button>
      <div className="bg-foreground">
        <h1 className="text-background text-5xl">Hello World!</h1>
      </div>
      <div className="text-sm">Samll</div>
      <div className="text-4xl">Bigg</div>
    </div>
  );
}
