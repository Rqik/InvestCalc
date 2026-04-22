import type { ReactNode } from 'react';
import type { AppPage } from '../types/navigation';
import { PageSwitcher } from '../components/PageSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';

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
          <span className="app-header__mark">IC</span>
          <span>InvestCalc</span>
        </a>
        <div className="app-header__actions">
          <PageSwitcher activePage={activePage} onChange={onPageChange} />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </header>

      <section className="app__layout">
        <aside className="app__sidebar">
          {navigation}
        </aside>
        <div className="app__content">
          {hero}
          {controls && (
            <details className="settings-drawer">
              <summary className="settings-drawer__summary">
                <span>
                  <strong>Входные параметры</strong>
                  <small>Цель, срок, взносы и допущения</small>
                </span>
                <span className="settings-drawer__chevron" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <div className="settings-drawer__content">{controls}</div>
            </details>
          )}
          {content}
        </div>
      </section>
    </main>
  );
}
