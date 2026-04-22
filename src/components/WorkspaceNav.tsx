import React from 'react';
import type { ViewMode } from '../types/finance';

type WorkspaceNavProps = {
  viewMode?: ViewMode;
  onViewModeChange?: (viewMode: ViewMode) => void;
};

export function WorkspaceNav({ viewMode, onViewModeChange }: WorkspaceNavProps) {
  const isCalculator = Boolean(onViewModeChange);
  const [activeItem, setActiveItem] = React.useState(
    isCalculator ? (viewMode ?? 'calculator') : 'retirement-results',
  );

  React.useEffect(() => {
    if (viewMode) {
      setActiveItem(viewMode);
    }
  }, [viewMode]);

  const getItemClassName = (itemId: string) =>
    `workspace-nav__item ${activeItem === itemId ? 'workspace-nav__item--active' : ''}`;

  return (
    <nav className="workspace-nav panel" aria-label="Навигация по рабочей области">
      <div className="workspace-nav__group">
        <span className="workspace-nav__heading">План</span>
        {isCalculator ? (
          <>
            <button
              className={getItemClassName('calculator')}
              type="button"
              onClick={() => {
                setActiveItem('calculator');
                onViewModeChange?.('calculator');
              }}
            >
              Расчет
            </button>
            <a
              className={getItemClassName('scenarios')}
              href="#scenarios"
              onClick={() => setActiveItem('scenarios')}
            >
              Сценарии
            </a>
            <button
              className={getItemClassName('plan')}
              type="button"
              onClick={() => {
                setActiveItem('plan');
                onViewModeChange?.('plan');
              }}
            >
              План по годам
            </button>
          </>
        ) : (
          <>
            <a
              className={getItemClassName('retirement-results')}
              href="#retirement-results"
              onClick={() => setActiveItem('retirement-results')}
            >
              Расчет
            </a>
            <a
              className={getItemClassName('retirement-timeline')}
              href="#retirement-timeline"
              onClick={() => setActiveItem('retirement-timeline')}
            >
              Маршрут
            </a>
            <a
              className={getItemClassName('retirement-advice')}
              href="#retirement-advice"
              onClick={() => setActiveItem('retirement-advice')}
            >
              Рекомендации
            </a>
          </>
        )}
      </div>

      <div className="workspace-nav__group">
        <span className="workspace-nav__heading">Справка</span>
        <a
          className={getItemClassName('methodology')}
          href="#methodology"
          onClick={() => setActiveItem('methodology')}
        >
          Методика
        </a>
        <a
          className={getItemClassName('examples')}
          href="#examples"
          onClick={() => setActiveItem('examples')}
        >
          Примеры
        </a>
        <a
          className={getItemClassName('faq')}
          href="#faq"
          onClick={() => setActiveItem('faq')}
        >
          FAQ
        </a>
      </div>
    </nav>
  );
}
