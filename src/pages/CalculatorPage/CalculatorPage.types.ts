import type { AppPage } from '@/types/navigation';

export type CalculatorPageProps = {
  activePage: AppPage;
  theme: 'dark' | 'light';
  onPageChange: (page: AppPage) => void;
  onThemeToggle: () => void;
};
