import { formatMoney, formatPercent } from '@/utils/format';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import type { ResultsGridProps } from './ResultsGrid.types';

function getCapitalTone(goalGap: number, isDurationInvalid: boolean) {
  if (isDurationInvalid) {
    return 'results-panel__metric--warning';
  }

  if (goalGap > 0) {
    return goalGap >= 1_000_000
      ? 'results-panel__metric--excellent'
      : 'results-panel__metric--good';
  }

  return Math.abs(goalGap) >= 1_000_000
    ? 'results-panel__metric--danger'
    : 'results-panel__metric--warning';
}

function getReturnTone(requiredReturn: number | null) {
  if (requiredReturn === null || requiredReturn > 25) {
    return 'results-panel__metric--danger';
  }

  if (requiredReturn > 14) {
    return 'results-panel__metric--warning';
  }

  if (requiredReturn <= 6) {
    return 'results-panel__metric--excellent';
  }

  return 'results-panel__metric--good';
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
        <Card as="article" className={`results-panel__metric ${capitalTone}`}>
          <span className="results-panel__metric-label">Капитал к концу срока</span>
          <strong className="results-panel__metric-value">{formatMoney(projectedCapital)}</strong>
          <small className="results-panel__metric-hint">
            {isDurationInvalid
              ? 'Укажите срок больше нуля, чтобы получить прогноз.'
              : goalGap >= 0
                ? `Запас сверх цели ${formatMoney(goalGap)}`
                : `До цели не хватает ${formatMoney(Math.abs(goalGap))}`}
          </small>
        </Card>

        <Card as="article" className="results-panel__metric">
          <span className="results-panel__metric-label">В сегодняшних деньгах</span>
          <strong className="results-panel__metric-value">{formatMoney(realProjectedCapital)}</strong>
          <small className="results-panel__metric-hint">С учетом инфляции.</small>
        </Card>

        <Card as="article" className="results-panel__metric">
          <span className="results-panel__metric-label">Нужно откладывать</span>
          <strong className="results-panel__metric-value">{formatMoney(requiredContribution)}</strong>
          <small className="results-panel__metric-hint">Стартовый ежемесячный взнос.</small>
        </Card>

        <Card as="article" className={`results-panel__metric ${returnTone}`}>
          <span className="results-panel__metric-label">Нужная доходность</span>
          <strong className="results-panel__metric-value">
            {requiredReturn === null ? 'Больше 100% годовых' : formatPercent(requiredReturn)}
          </strong>
          <small className="results-panel__metric-hint">
            {requiredReturn === null
              ? 'Цель выглядит нереалистичной при текущем взносе и сроке.'
              : 'При текущем ежемесячном взносе.'}
          </small>
        </Card>

        <Card as="article" className="results-panel__metric">
          <span className="results-panel__metric-label">Прибыль от роста</span>
          <strong className="results-panel__metric-value">{formatMoney(investmentProfit)}</strong>
          <small className="results-panel__metric-hint">Часть результата сверх стартового капитала и пополнений.</small>
        </Card>
      </div>
    </Card>
  );
}



