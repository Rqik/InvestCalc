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

function getCapitalTone(goalGap: number, isDurationInvalid: boolean) {
  if (isDurationInvalid) {
    return 'metric-card--warning';
  }

  if (goalGap > 0) {
    return goalGap >= 1_000_000 ? 'metric-card--excellent' : 'metric-card--good';
  }

  return Math.abs(goalGap) >= 1_000_000 ? 'metric-card--danger' : 'metric-card--warning';
}

function getReturnTone(requiredReturn: number | null) {
  if (requiredReturn === null || requiredReturn > 25) {
    return 'metric-card--danger';
  }

  if (requiredReturn > 14) {
    return 'metric-card--warning';
  }

  if (requiredReturn <= 6) {
    return 'metric-card--excellent';
  }

  return 'metric-card--good';
}

export function ResultsGrid({
  projectedCapital,
  realProjectedCapital,
  goalGap,
  requiredContribution,
  requiredReturn,
  investmentProfit,
  isDurationInvalid,
}: ResultsGridProps) {
  const capitalTone = getCapitalTone(goalGap, isDurationInvalid);
  const returnTone = getReturnTone(requiredReturn);

  return (
    <Card as="section" className="results-panel">
      <CardHeader>
        <CardTitle>Итоги</CardTitle>
        <CardDescription>
          Главное по текущему сценарию: капитал, покупательная способность и разрыв с целью.
        </CardDescription>
      </CardHeader>

      <div className="results-panel__grid">
        <Card as="article" className={`metric-card ${capitalTone}`}>
          <span className="metric-card__label">Капитал к концу срока</span>
          <strong className="metric-card__value">{formatMoney(projectedCapital)}</strong>
          <small className="metric-card__hint">
            {isDurationInvalid
              ? 'Укажите срок больше нуля, чтобы получить прогноз.'
              : goalGap >= 0
                ? `Запас сверх цели ${formatMoney(goalGap)}`
                : `До цели не хватает ${formatMoney(Math.abs(goalGap))}`}
          </small>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">В сегодняшних деньгах</span>
          <strong className="metric-card__value">{formatMoney(realProjectedCapital)}</strong>
          <small className="metric-card__hint">С учетом инфляции.</small>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">Нужно откладывать</span>
          <strong className="metric-card__value">{formatMoney(requiredContribution)}</strong>
          <small className="metric-card__hint">Стартовый ежемесячный взнос.</small>
        </Card>

        <Card as="article" className={`metric-card ${returnTone}`}>
          <span className="metric-card__label">Нужная доходность</span>
          <strong className="metric-card__value">
            {requiredReturn === null ? 'Больше 100% годовых' : formatPercent(requiredReturn)}
          </strong>
          <small className="metric-card__hint">
            {requiredReturn === null
              ? 'Цель выглядит нереалистичной при текущем взносе и сроке.'
              : 'При текущем ежемесячном взносе.'}
          </small>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">Прибыль от роста</span>
          <strong className="metric-card__value">{formatMoney(investmentProfit)}</strong>
          <small className="metric-card__hint">Часть результата сверх стартового капитала и пополнений.</small>
        </Card>
      </div>
    </Card>
  );
}
