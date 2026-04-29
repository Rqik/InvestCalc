import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { WorkspaceSectionId } from '@/types/navigation';
import type { WorkspaceNavProps } from './WorkspaceNav.types';
import styles from './WorkspaceNav.module.scss';

function scrollToSection(sectionRef?: React.RefObject<HTMLElement>) {
  sectionRef?.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

export function WorkspaceNav({ isRetirement = false, sectionRefs }: WorkspaceNavProps) {
  const [activeItem, setActiveItem] = React.useState<WorkspaceSectionId>(
    isRetirement ? 'retirement-results' : 'results',
  );

  const handleSectionClick = (itemId: WorkspaceSectionId) => {
    setActiveItem(itemId);
    scrollToSection(sectionRefs[itemId]);
  };

  const getItemClassName = (itemId: WorkspaceSectionId) =>
    cn(styles.workspaceNav__item, activeItem === itemId && styles['workspaceNav__item--active']);

  return (
    <nav className={styles.workspaceNav} aria-label="Навигация по рабочей области">
      <div className={styles.workspaceNav__group}>
        <span className={styles.workspaceNav__heading}>План</span>
        {!isRetirement ? (
          <>
            <Button className={getItemClassName('results')} variant="ghost" type="button" onClick={() => handleSectionClick('results')}>
              Итоги
            </Button>
            <Button className={getItemClassName('scenarios')} variant="ghost" type="button" onClick={() => handleSectionClick('scenarios')}>
              Сценарии
            </Button>
            <Button className={getItemClassName('growth-chart')} variant="ghost" type="button" onClick={() => handleSectionClick('growth-chart')}>
              График
            </Button>
            <Button className={getItemClassName('yearly-plan')} variant="ghost" type="button" onClick={() => handleSectionClick('yearly-plan')}>
              План по годам
            </Button>
          </>
        ) : (
          <>
            <Button className={getItemClassName('retirement-results')} variant="ghost" type="button" onClick={() => handleSectionClick('retirement-results')}>
              Расчет
            </Button>
            <Button className={getItemClassName('retirement-timeline')} variant="ghost" type="button" onClick={() => handleSectionClick('retirement-timeline')}>
              Маршрут
            </Button>
            <Button className={getItemClassName('retirement-advice')} variant="ghost" type="button" onClick={() => handleSectionClick('retirement-advice')}>
              Рекомендации
            </Button>
          </>
        )}
      </div>

      {!isRetirement && (
        <div className={styles.workspaceNav__group}>
          <span className={styles.workspaceNav__heading}>Справка</span>
          <Button className={getItemClassName('methodology')} variant="ghost" type="button" onClick={() => handleSectionClick('methodology')}>
            Как читать
          </Button>
          <Button className={getItemClassName('examples')} variant="ghost" type="button" onClick={() => handleSectionClick('examples')}>
            Сравнение
          </Button>
          <Button className={getItemClassName('faq')} variant="ghost" type="button" onClick={() => handleSectionClick('faq')}>
            FAQ
          </Button>
        </div>
      )}
    </nav>
  );
}
