import type { ExtraYearProjection } from '../types/finance';
import { formatMoney } from '../utils/format';

type ExtraYearsPanelProps = {
  extraYears: ExtraYearProjection[];
};

export function ExtraYearsPanel({ extraYears }: ExtraYearsPanelProps) {
  return (
    <section className="panel extra-years-panel">
      <div className="section-header">
        <h2 className="section-header__title">Если подождать еще</h2>
        <p className="section-header__description">
          Дополнительные годы часто дают сильный прирост за счет сложного процента.
        </p>
      </div>

      <div className="extra-years-panel__grid">
        {extraYears.map((item) => (
          <article key={item.years} className="wait-card">
            <span className="wait-card__years">{item.years} лет</span>
            <strong className="wait-card__value">{formatMoney(item.finalCapital)}</strong>
            <small className="wait-card__hint">
              Еще {formatMoney(item.additionalCapital)} к текущему плану
            </small>
            <small className="wait-card__hint">
              Из них дополнительный рост: {formatMoney(item.additionalGrowth)}
            </small>
          </article>
        ))}
      </div>
    </section>
  );
}
