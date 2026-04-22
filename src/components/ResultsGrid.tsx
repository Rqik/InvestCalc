import { formatMoney, formatPercent } from '../utils/format';

type ResultsGridProps = {
  projectedCapital: number;
  realProjectedCapital: number;
  goalGap: number;
  requiredContribution: number;
  requiredReturn: number | null;
  investmentProfit: number;
  isDurationInvalid: boolean;
};

export function ResultsGrid({
  projectedCapital,
  realProjectedCapital,
  goalGap,
  requiredContribution,
  requiredReturn,
  investmentProfit,
  isDurationInvalid,
}: ResultsGridProps) {
  return (
    <section className="panel results-panel">
      <div className="section-header">
        <h2 className="section-header__title">Итоги</h2>
        <p className="section-header__description">
          Главное по текущему сценарию: капитал, покупательная способность и разрыв с целью.
        </p>
      </div>

      <div className="results-panel__grid">
        <article className="metric-card metric-card--accent">
          <span className="metric-card__label">Капитал к концу срока</span>
          <strong className="metric-card__value">{formatMoney(projectedCapital)}</strong>
          <small className="metric-card__hint">
            {isDurationInvalid
              ? 'Укажите срок больше нуля, чтобы получить прогноз'
              : goalGap >= 0
                ? `Цель выше плана на ${formatMoney(goalGap)}`
                : `До цели не хватает ${formatMoney(Math.abs(goalGap))}`}
          </small>
        </article>

        <article className="metric-card">
          <span className="metric-card__label">В сегодняшних деньгах</span>
          <strong className="metric-card__value">{formatMoney(realProjectedCapital)}</strong>
          <small className="metric-card__hint">С учетом инфляции</small>
        </article>

        <article className="metric-card">
          <span className="metric-card__label">Нужно откладывать</span>
          <strong className="metric-card__value">{formatMoney(requiredContribution)}</strong>
          <small className="metric-card__hint">Стартовый ежемесячный взнос</small>
        </article>

        <article className="metric-card">
          <span className="metric-card__label">Нужная доходность</span>
          <strong className="metric-card__value">
            {requiredReturn === null ? 'Больше 100% годовых' : formatPercent(requiredReturn)}
          </strong>
          <small className="metric-card__hint">
            {requiredReturn === null
              ? 'Цель выглядит нереалистичной при текущем взносе и сроке'
              : 'При текущем ежемесячном взносе'}
          </small>
        </article>

        <article className="metric-card">
          <span className="metric-card__label">Прибыль от роста</span>
          <strong className="metric-card__value">{formatMoney(investmentProfit)}</strong>
          <small className="metric-card__hint">Итог минус все вложенные деньги</small>
        </article>
      </div>
    </section>
  );
}
