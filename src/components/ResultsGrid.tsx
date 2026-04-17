import { formatMoney, formatPercent } from '../utils/format';

type ResultsGridProps = {
  projectedCapital: number;
  goalGap: number;
  requiredContribution: number;
  requiredReturn: number | null;
  investmentProfit: number;
};

export function ResultsGrid({
  projectedCapital,
  goalGap,
  requiredContribution,
  requiredReturn,
  investmentProfit,
}: ResultsGridProps) {
  return (
    <section className="panel results-panel">
      <div className="section-header">
        <h2 className="section-header__title">Что получится</h2>
        <p className="section-header__description">
          Ключевые цифры по текущему сценарию в одном месте.
        </p>
      </div>

      <div className="results-panel__grid">
        <article className="metric-card metric-card--accent">
          <span className="metric-card__label">Капитал к концу срока</span>
          <strong className="metric-card__value">{formatMoney(projectedCapital)}</strong>
          <small className="metric-card__hint">
            {goalGap >= 0
              ? `Цель перевыполнена на ${formatMoney(goalGap)}`
              : `До цели не хватает ${formatMoney(Math.abs(goalGap))}`}
          </small>
        </article>

        <article className="metric-card">
          <span className="metric-card__label">Нужно откладывать в месяц</span>
          <strong className="metric-card__value">{formatMoney(requiredContribution)}</strong>
          <small className="metric-card__hint">Чтобы прийти к цели при текущей доходности</small>
        </article>

        <article className="metric-card">
          <span className="metric-card__label">Нужная доходность</span>
          <strong className="metric-card__value">
            {requiredReturn === null ? 'Больше 100% годовых' : formatPercent(requiredReturn)}
          </strong>
          <small className="metric-card__hint">
            Чтобы прийти к цели при текущем ежемесячном взносе
          </small>
        </article>

        <article className="metric-card">
          <span className="metric-card__label">Прибыль от роста капитала</span>
          <strong className="metric-card__value">{formatMoney(investmentProfit)}</strong>
          <small className="metric-card__hint">Разница между итогом и вложенными деньгами</small>
        </article>
      </div>
    </section>
  );
}
