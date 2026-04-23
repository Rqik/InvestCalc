import { Button } from './ui/button';

type ThemeToggleProps = {
  theme: 'dark' | 'light';
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isLight = theme === 'light';

  return (
    <Button
      className="theme-toggle"
      variant="outline"
      type="button"
      aria-label={isLight ? 'Включить темную тему' : 'Включить светлую тему'}
      onClick={onToggle}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isLight ? '☀' : '☾'}
      </span>
      <span className="theme-toggle__label">{isLight ? 'Светлая' : 'Темная'}</span>
    </Button>
  );
}
