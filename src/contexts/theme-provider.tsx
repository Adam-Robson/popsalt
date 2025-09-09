'use client';

import {
  createContext, 
  useContext, 
  useState, 
  useEffect,
  useCallback, 
  ReactNode, 
  useMemo
} from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  setT: (t: ThemeType | ((t: ThemeType) => ThemeType)) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as ThemeType | null);
    const sys: ThemeType = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
    const initial = stored ?? sys;
    setT(initial);
  }, []);

  function setT(next: ThemeType | ((t: ThemeType) => ThemeType)) {
    setTheme(prev => {
      const val = typeof next === 'function' ? (next)(prev) : next;
      document.documentElement.dataset.theme = val;
      localStorage.setItem('theme', val);
      return val;
    });
  }

  const toggleTheme = useCallback(
    () => setT(t => (t === 'dark' ? 'light' : 'dark')), []
  );

  const val = useMemo(() => ({ theme, setT, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
