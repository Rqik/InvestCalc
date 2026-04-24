import type { RetirementHeroProps } from './RetirementHero.types';
import styles from './RetirementHero.module.scss';

export function RetirementHero(_props: RetirementHeroProps = {}) {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__topline}>
        <p className={styles.hero__eyebrow}>Пенсионный план</p>
      </div>

      <h1 className={styles.hero__title}>План спокойного будущего</h1>
      <p className={styles.hero__description}>
        Подберите комфортный возраст выхода на пенсию, желаемый допдоход и понятный
        ежемесячный шаг. Без страшилок: цель страницы - помочь увидеть маршрут и
        вдохновить двигаться постепенно.
      </p>
    </section>
  );
}
