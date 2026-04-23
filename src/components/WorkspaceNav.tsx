import React from 'react';
import { Button } from './ui/button';

type WorkspaceNavProps = {
  isRetirement?: boolean;
};

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

export function WorkspaceNav({ isRetirement = false }: WorkspaceNavProps) {
  const [activeItem, setActiveItem] = React.useState(
    isRetirement ? 'retirement-results' : 'results',
  );

  const getItemClassName = (itemId: string) =>
    `workspace-nav__item ${activeItem === itemId ? 'workspace-nav__item--active' : ''}`;

  return (
    <nav className="workspace-nav" aria-label="Навигация по рабочей области">
      <div className="workspace-nav__group">
        <span className="workspace-nav__heading">План</span>
        {!isRetirement ? (
          <>
            <Button
              className={getItemClassName('results')}
              variant="ghost"
              type="button"
              onClick={() => {
                setActiveItem('results');
                scrollToSection('results');
              }}
            >
              Итоги
            </Button>
            <Button
              className={getItemClassName('scenarios')}
              variant="ghost"
              type="button"
              onClick={() => {
                setActiveItem('scenarios');
                scrollToSection('scenarios');
              }}
            >
              Сценарии
            </Button>
            <Button
              className={getItemClassName('growth-chart')}
              variant="ghost"
              type="button"
              onClick={() => {
                setActiveItem('growth-chart');
                scrollToSection('growth-chart');
              }}
            >
              График
            </Button>
            <Button
              className={getItemClassName('yearly-plan')}
              variant="ghost"
              type="button"
              onClick={() => {
                setActiveItem('yearly-plan');
                scrollToSection('yearly-plan');
              }}
            >
              План по годам
            </Button>
          </>
        ) : (
          <>
            <Button
              className={getItemClassName('retirement-results')}
              variant="ghost"
              type="button"
              onClick={() => {
                setActiveItem('retirement-results');
                scrollToSection('retirement-results');
              }}
            >
              Расчет
            </Button>
            <Button
              className={getItemClassName('retirement-timeline')}
              variant="ghost"
              type="button"
              onClick={() => {
                setActiveItem('retirement-timeline');
                scrollToSection('retirement-timeline');
              }}
            >
              Маршрут
            </Button>
            <Button
              className={getItemClassName('retirement-advice')}
              variant="ghost"
              type="button"
              onClick={() => {
                setActiveItem('retirement-advice');
                scrollToSection('retirement-advice');
              }}
            >
              Рекомендации
            </Button>
          </>
        )}
      </div>

      {!isRetirement && (
        <div className="workspace-nav__group">
          <span className="workspace-nav__heading">Справка</span>
          <Button
            className={getItemClassName('methodology')}
            variant="ghost"
            type="button"
            onClick={() => {
              setActiveItem('methodology');
              scrollToSection('methodology');
            }}
          >
            Как читать
          </Button>
          <Button
            className={getItemClassName('examples')}
            variant="ghost"
            type="button"
            onClick={() => {
              setActiveItem('examples');
              scrollToSection('examples');
            }}
          >
            Сравнение
          </Button>
          <Button
            className={getItemClassName('faq')}
            variant="ghost"
            type="button"
            onClick={() => {
              setActiveItem('faq');
              scrollToSection('faq');
            }}
          >
            FAQ
          </Button>
        </div>
      )}
    </nav>
  );
}
