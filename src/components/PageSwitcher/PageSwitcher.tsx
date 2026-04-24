import { Button } from '@/components/ui/Button';
import { APP_ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import type { PageSwitcherProps } from './PageSwitcher.types';
import styles from './PageSwitcher.module.scss';

export function PageSwitcher({ activePage, onChange }: PageSwitcherProps) {
  return (
    <nav className={styles.pageSwitcher} aria-label="Разделы приложения">
      {APP_ROUTES.map((page) => (
        <Button
          key={page.id}
          className={cn(
            styles.pageSwitcher__button,
            activePage === page.id && styles['pageSwitcher__button--active']
          )}
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
