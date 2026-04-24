import type { AppPage } from '@/types/navigation';

export type RetirementPageProps = {
  activePage: AppPage;
  theme: 'dark' | 'light';
  onPageChange: (page: AppPage) => void;
  onThemeToggle: () => void;
};
