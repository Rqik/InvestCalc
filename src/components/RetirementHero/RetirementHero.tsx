import type { RetirementHeroProps } from './RetirementHero.types';

export function RetirementHero(_props: RetirementHeroProps = {}) {
  return (
    <section className="hero retirement-hero">
      <div className="hero__topline">
        <p className="hero__eyebrow">Пенсионный план</p>
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

