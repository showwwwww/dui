'use client';
import React from 'react';
export default function Home() {
  const [theme, setTheme] = React.useState(true);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme ? 'light' : 'dark');
  }, [theme]);
  return (
    <div>
      <button
        onClick={() => {
          setTheme(!theme);
        }}
      >
        toggle Theme
      </button>
      <h1></h1>
    </div>
  );
}
