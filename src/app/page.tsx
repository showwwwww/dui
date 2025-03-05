'use client';
import React from 'react';
export default function Home() {
  const [theme, setTheme] = React.useState(true);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme ? 'light' : 'dark');
    console.log(navigator);
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
      <h1>Hello World</h1>
    </div>
  );
}
