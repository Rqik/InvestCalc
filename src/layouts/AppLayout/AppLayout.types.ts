import type { ReactNode } from 'react';
import type { AppPage } from '@/types/navigation';
import type { ThemeMode } from '@/types/theme';

export type AppLayoutProps = {
  hero: ReactNode;
  navigation: ReactNode;
  controls?: ReactNode;
  content: ReactNode;
  activePage: AppPage;
  theme: ThemeMode;
  onPageChange: (page: AppPage) => void;
  onThemeToggle: () => void;
};
