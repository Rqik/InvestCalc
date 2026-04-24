import { PageSwitcher } from '@/components/PageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { AppLayoutProps } from './AppLayout.types';

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
          <img className="app-header__logo" src={brandMarkSrc} alt="" aria-hidden="true" />
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
          <div className="app__inline-nav">
            {navigation}
          </div>
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
