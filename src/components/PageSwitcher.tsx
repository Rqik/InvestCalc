import { APP_ROUTES } from '../constants/routes';
import type { AppPage } from '../types/navigation';
import { Button } from './ui/button';

type PageSwitcherProps = {
  activePage: AppPage;
  onChange: (page: AppPage) => void;
};

export function PageSwitcher({ activePage, onChange }: PageSwitcherProps) {
  return (
    <nav className="page-switcher" aria-label="Разделы приложения">
      {APP_ROUTES.map((page) => (
        <Button
          key={page.id}
          className={`page-switcher__button ${
            activePage === page.id ? 'page-switcher__button--active' : ''
          }`}
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => onChange(page.id)}
        >
          {page.label}
        </Button>
      ))}
    </nav>
  );
}
