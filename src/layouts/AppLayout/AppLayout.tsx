import { PageSwitcher } from '@/components/PageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { AppLayoutProps } from './AppLayout.types';
import styles from './AppLayout.module.scss';

export function AppLayout({
  hero,
  navigation,
  controls,
  content,
  activePage,
  theme,
  onPageChange,
  onThemeToggle,
}: AppLayoutProps) {
  const brandMarkSrc = `${import.meta.env.BASE_URL}brand-mark.svg`;

  return (
    <main className={styles.app}>
      <header className={styles.appHeader}>
        <a
          className={styles.appHeader__brand}
          href="#calculator"
          aria-label="InvestCalc"
          onClick={(event) => {
            event.preventDefault();
            onPageChange('calculator');
          }}
        >
          <img className={styles.appHeader__logo} src={brandMarkSrc} alt="" aria-hidden="true" />
          <span className={styles.appHeader__brandText}>InvestCalc</span>
        </a>
        <div className={styles.appHeader__actions}>
          <PageSwitcher activePage={activePage} onChange={onPageChange} />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </header>

      <section className={styles.app__layout}>
        <div className={styles.app__content}>
          <div className={styles.app__hero}>{hero}</div>
          <div className={styles.app__inlineNav}>{navigation}</div>
          <div className={styles.app__workspace}>
            {controls && (
              <aside className={styles.app__controls} aria-label="Входные параметры">
                {controls}
              </aside>
            )}
            <div className={styles.app__main}>{content}</div>
          </div>
        </div>
        <aside className={styles.app__sidebar}>{navigation}</aside>
      </section>
    </main>
  );
}
