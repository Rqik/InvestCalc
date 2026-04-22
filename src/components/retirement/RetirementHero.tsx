import type { AppPage } from '../../types/navigation';
import { PageSwitcher } from '../PageSwitcher';

type RetirementHeroProps = {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
};

export function RetirementHero({ activePage, onPageChange }: RetirementHeroProps) {
  return (
    <section className="hero panel retirement-hero">
      <div className="hero__topline">
        <p className="hero__eyebrow">Пенсионный план</p>
        <div className="hero__actions">
          <PageSwitcher activePage={activePage} onChange={onPageChange} />
        </div>
      </div>

      <h1 className="hero__title">План спокойного будущего</h1>
      <p className="hero__description">
        Подберите комфортный возраст выхода на пенсию, желаемый допдоход и понятный
        ежемесячный шаг. Без страшилок: цель страницы — помочь увидеть маршрут и
        вдохновить двигаться постепенно.
      </p>
    </section>
  );
}
