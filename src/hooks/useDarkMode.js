import { useState, useEffect } from 'react';
import { THEME_KEY } from '../utils/constants';

/**
 * Custom hook for dark mode with localStorage persistence
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      const theme = next ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
      return next;
    });
  };

  return { isDark, toggleDarkMode };
}
