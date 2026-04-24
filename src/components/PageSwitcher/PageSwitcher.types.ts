import type { AppPage } from '@/types/navigation';

export type PageSwitcherProps = {
  activePage: AppPage;
  onChange: (page: AppPage) => void;
};
