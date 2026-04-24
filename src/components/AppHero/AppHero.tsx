import type { AppHeroProps } from './AppHero.types';

export function AppHero(_props: AppHeroProps = {}) {
  return (
    <section className="hero">
      <div className="hero__topline">
        <p className="hero__eyebrow">Финансовый план</p>
      </div>

      <h1 className="hero__title">Накопление на цель</h1>
      <p className="hero__description">
        Считайте цель по капиталу, нужный взнос, инфляцию, рост пополнений и
        сравнивайте сценарии без потери общей картины.
      </p>
    </section>
  );
}

