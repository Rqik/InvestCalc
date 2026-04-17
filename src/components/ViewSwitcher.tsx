import type { ViewMode } from '../types/finance';

type ViewSwitcherProps = {
  viewMode: ViewMode;
  onChange: (viewMode: ViewMode) => void;
};

export function ViewSwitcher({ viewMode, onChange }: ViewSwitcherProps) {
  return (
    <div className="view-switcher">
      <button
        type="button"
        className={`view-switcher__button ${viewMode === 'calculator' ? 'view-switcher__button--active' : ''}`}
        onClick={() => onChange('calculator')}
      >
        Калькулятор
      </button>
      <button
        type="button"
        className={`view-switcher__button ${viewMode === 'plan' ? 'view-switcher__button--active' : ''}`}
        onClick={() => onChange('plan')}
      >
        План по годам
      </button>
    </div>
  );
}
