import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { WorkspaceNavProps } from './WorkspaceNav.types';
import styles from './WorkspaceNav.module.scss';

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
    cn(styles.workspaceNav__item, activeItem === itemId && styles['workspaceNav__item--active']);

  return (
    <nav className={styles.workspaceNav} aria-label="Навигация по рабочей области">
      <div className={styles.workspaceNav__group}>
        <span className={styles.workspaceNav__heading}>План</span>
        {!isRetirement ? (
          <>
            <Button className={getItemClassName('results')} variant="ghost" type="button" onClick={() => { setActiveItem('results'); scrollToSection('results'); }}>
              Итоги
            </Button>
            <Button className={getItemClassName('scenarios')} variant="ghost" type="button" onClick={() => { setActiveItem('scenarios'); scrollToSection('scenarios'); }}>
              Сценарии
            </Button>
            <Button className={getItemClassName('growth-chart')} variant="ghost" type="button" onClick={() => { setActiveItem('growth-chart'); scrollToSection('growth-chart'); }}>
              График
            </Button>
            <Button className={getItemClassName('yearly-plan')} variant="ghost" type="button" onClick={() => { setActiveItem('yearly-plan'); scrollToSection('yearly-plan'); }}>
              План по годам
            </Button>
          </>
        ) : (
          <>
            <Button className={getItemClassName('retirement-results')} variant="ghost" type="button" onClick={() => { setActiveItem('retirement-results'); scrollToSection('retirement-results'); }}>
              Расчет
            </Button>
            <Button className={getItemClassName('retirement-timeline')} variant="ghost" type="button" onClick={() => { setActiveItem('retirement-timeline'); scrollToSection('retirement-timeline'); }}>
              Маршрут
            </Button>
            <Button className={getItemClassName('retirement-advice')} variant="ghost" type="button" onClick={() => { setActiveItem('retirement-advice'); scrollToSection('retirement-advice'); }}>
              Рекомендации
            </Button>
          </>
        )}
      </div>

      {!isRetirement && (
        <div className={styles.workspaceNav__group}>
          <span className={styles.workspaceNav__heading}>Справка</span>
          <Button className={getItemClassName('methodology')} variant="ghost" type="button" onClick={() => { setActiveItem('methodology'); scrollToSection('methodology'); }}>
            Как читать
          </Button>
          <Button className={getItemClassName('examples')} variant="ghost" type="button" onClick={() => { setActiveItem('examples'); scrollToSection('examples'); }}>
            Сравнение
          </Button>
          <Button className={getItemClassName('faq')} variant="ghost" type="button" onClick={() => { setActiveItem('faq'); scrollToSection('faq'); }}>
            FAQ
          </Button>
        </div>
      )}
    </nav>
  );
}
