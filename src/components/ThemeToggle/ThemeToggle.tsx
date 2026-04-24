import { MoonStar, SunMedium } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { ThemeToggleProps } from './ThemeToggle.types';

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isLight = theme === 'light';
  const ariaLabel = isLight
    ? '\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0442\u0435\u043c\u043d\u0443\u044e \u0442\u0435\u043c\u0443'
    : '\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0441\u0432\u0435\u0442\u043b\u0443\u044e \u0442\u0435\u043c\u0443';
  const themeLabel = isLight
    ? '\u0421\u0432\u0435\u0442\u043b\u0430\u044f'
    : '\u0422\u0435\u043c\u043d\u0430\u044f';

  return (
    <Button
      className="theme-toggle"
      variant="outline"
      type="button"
      aria-label={ariaLabel}
      onClick={onToggle}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isLight ? <SunMedium size={16} /> : <MoonStar size={16} />}
      </span>
      <span className="theme-toggle__label">{themeLabel}</span>
    </Button>
  );
}
