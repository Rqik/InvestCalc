import type { AppPage } from '../types/navigation';

type PageSwitcherProps = {
  activePage: AppPage;
  onChange: (page: AppPage) => void;
};

const PAGES: Array<{ id: AppPage; label: string }> = [
  { id: 'calculator', label: 'Калькулятор' },
  { id: 'retirement', label: 'Пенсия' },
];

export function PageSwitcher({ activePage, onChange }: PageSwitcherProps) {
  return (
    <nav className="page-switcher" aria-label="Разделы приложения">
      {PAGES.map((page) => (
        <button
          key={page.id}
          className={`page-switcher__button ${
            activePage === page.id ? 'page-switcher__button--active' : ''
          }`}
          type="button"
          onClick={() => onChange(page.id)}
        >
          {page.label}
        </button>
      ))}
    </nav>
  );
}
