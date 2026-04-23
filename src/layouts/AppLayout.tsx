import type { ReactNode } from 'react';
import { PageSwitcher } from '../components/PageSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';
import type { AppPage } from '../types/navigation';

type ThemeMode = 'dark' | 'light';

type AppLayoutProps = {
  hero: ReactNode;
  navigation: ReactNode;
  controls?: ReactNode;
  content: ReactNode;
  activePage: AppPage;
  theme: ThemeMode;
  onPageChange: (page: AppPage) => void;
  onThemeToggle: () => void;
};

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
  return (
    <main className="app">
      <header className="app-header">
        <a
          className="app-header__brand"
          href="#calculator"
          aria-label="InvestCalc"
          onClick={(event) => {
            event.preventDefault();
            onPageChange('calculator');
          }}
        >
          <img className="app-header__logo" src="/brand-mark.svg" alt="" aria-hidden="true" />
          <span>InvestCalc</span>
        </a>
        <div className="app-header__actions">
          <PageSwitcher activePage={activePage} onChange={onPageChange} />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </header>

      <section className="app__layout">
        <div className="app__content">
          <div className="app__hero">{hero}</div>
          <div className="app__workspace">
            {controls && (
              <aside className="app__controls" aria-label="Входные параметры">
                {controls}
              </aside>
            )}
            <div className="app__main">{content}</div>
          </div>
        </div>
        <aside className="app__sidebar">{navigation}</aside>
      </section>
    </main>
  );
}
