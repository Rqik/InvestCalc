import type { ThemeMode } from '@/types/theme';

export function getInitialTheme(): ThemeMode {
  const savedTheme = window.localStorage.getItem('investcalc-theme');

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
