import { MoonStar, SunMedium } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { ThemeToggleProps } from './ThemeToggle.types';
import styles from './ThemeToggle.module.scss';

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isLight = theme === 'light';
  const ariaLabel = isLight ? 'Включить темную тему' : 'Включить светлую тему';
  const themeLabel = isLight ? 'Светлая' : 'Темная';

  return (
    <Button
      className={styles.themeToggle}
      variant="outline"
      type="button"
      aria-label={ariaLabel}
      onClick={onToggle}
    >
      <span className={styles.themeToggle__icon} aria-hidden="true">
        {isLight ? <SunMedium size={16} /> : <MoonStar size={16} />}
      </span>
      <span className={styles.themeToggle__label}>{themeLabel}</span>
    </Button>
  );
}
