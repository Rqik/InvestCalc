import { formatMoney, formatPercent } from '../utils/format';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

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
    <Card as="section" className="results-panel">
      <CardHeader>
        <CardTitle>Итоги</CardTitle>
        <CardDescription>
          Главное по текущему сценарию: капитал, покупательная способность и разрыв с целью.
        </CardDescription>
      </CardHeader>

      <div className="results-panel__grid">
        <Card as="article" className="metric-card metric-card--accent">
          <span className="metric-card__label">Капитал к концу срока</span>
          <strong className="metric-card__value">{formatMoney(projectedCapital)}</strong>
          <small className="metric-card__hint">
            {isDurationInvalid
              ? 'Укажите срок больше нуля, чтобы получить прогноз'
              : goalGap >= 0
                ? `Запас сверх цели ${formatMoney(goalGap)}`
                : `До цели не хватает ${formatMoney(Math.abs(goalGap))}`}
          </small>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">В сегодняшних деньгах</span>
          <strong className="metric-card__value">{formatMoney(realProjectedCapital)}</strong>
          <small className="metric-card__hint">С учетом инфляции</small>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">Нужно откладывать</span>
          <strong className="metric-card__value">{formatMoney(requiredContribution)}</strong>
          <small className="metric-card__hint">Стартовый ежемесячный взнос</small>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">Нужная доходность</span>
          <strong className="metric-card__value">
            {requiredReturn === null ? 'Больше 100% годовых' : formatPercent(requiredReturn)}
          </strong>
          <small className="metric-card__hint">
            {requiredReturn === null
              ? 'Цель выглядит нереалистичной при текущем взносе и сроке'
              : 'При текущем ежемесячном взносе'}
          </small>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">Прибыль от роста</span>
          <strong className="metric-card__value">{formatMoney(investmentProfit)}</strong>
          <small className="metric-card__hint">Итог минус все вложенные деньги</small>
        </Card>
      </div>
    </Card>
  );
}
