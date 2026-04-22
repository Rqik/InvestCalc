import type { ViewMode } from '../types/finance';
import type { AppPage } from '../types/navigation';
import { PageSwitcher } from './PageSwitcher';
import { ViewSwitcher } from './ViewSwitcher';

type AppHeroProps = {
  activePage: AppPage;
  viewMode: ViewMode;
  onPageChange: (page: AppPage) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export function AppHero({
  activePage,
  viewMode,
  onPageChange,
  onViewModeChange,
}: AppHeroProps) {
  return (
    <section className="hero panel">
      <div className="hero__topline">
        <p className="hero__eyebrow">Финансовый калькулятор</p>
        <div className="hero__actions">
          <PageSwitcher activePage={activePage} onChange={onPageChange} />
          <ViewSwitcher viewMode={viewMode} onChange={onViewModeChange} />
        </div>
      </div>

      <h1 className="hero__title">Калькулятор доходности и накоплений</h1>
      <p className="hero__description">
        Считайте цель по капиталу, нужный взнос, инфляцию, рост пополнений и
        сравнивайте сценарии без потери общей картины.
      </p>
    </section>
  );
}
