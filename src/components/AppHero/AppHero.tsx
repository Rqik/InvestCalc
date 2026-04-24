import type { AppHeroProps } from './AppHero.types';
import styles from './AppHero.module.scss';

export function AppHero(_props: AppHeroProps = {}) {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__topline}>
        <p className={styles.hero__eyebrow}>Финансовый план</p>
      </div>

      <h1 className={styles.hero__title}>Накопление на цель</h1>
      <p className={styles.hero__description}>
        Считайте цель по капиталу, нужный взнос, инфляцию, рост пополнений и
        сравнивайте сценарии без потери общей картины.
      </p>
    </section>
  );
}
