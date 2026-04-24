import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { formatMoney, formatPercent } from '@/utils/format';
import type { ResultsGridProps } from './ResultsGrid.types';
import styles from './ResultsGrid.module.scss';

function getCapitalTone(goalGap: number, isDurationInvalid: boolean) {
  if (isDurationInvalid) {
    return styles['metric--warning'];
  }

  if (goalGap > 0) {
    return goalGap >= 1_000_000
      ? styles['metric--excellent']
      : styles['metric--good'];
  }

  return Math.abs(goalGap) >= 1_000_000
    ? styles['metric--danger']
    : styles['metric--warning'];
}

function getReturnTone(requiredReturn: number | null) {
  if (requiredReturn === null || requiredReturn > 25) {
    return styles['metric--danger'];
  }

  if (requiredReturn > 14) {
    return styles['metric--warning'];
  }

  if (requiredReturn <= 6) {
    return styles['metric--excellent'];
  }

  return styles['metric--good'];
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
    <Card as="section" className={styles.resultsPanel}>
      <CardHeader>
        <CardTitle>Итоги</CardTitle>
        <CardDescription>
          Главное по текущему сценарию: капитал, покупательная способность и разрыв с целью.
        </CardDescription>
      </CardHeader>

      <div className={styles.resultsPanel__grid}>
        <Card as="article" className={cn(styles.metric, capitalTone)}>
          <span className={styles.metric__label}>Капитал к концу срока</span>
          <strong className={styles.metric__value}>{formatMoney(projectedCapital)}</strong>
          <small className={styles.metric__hint}>
            {isDurationInvalid
              ? 'Укажите срок больше нуля, чтобы получить прогноз.'
              : goalGap >= 0
                ? `Запас сверх цели ${formatMoney(goalGap)}`
                : `До цели не хватает ${formatMoney(Math.abs(goalGap))}`}
          </small>
        </Card>

        <Card as="article" className={styles.metric}>
          <span className={styles.metric__label}>В сегодняшних деньгах</span>
          <strong className={styles.metric__value}>{formatMoney(realProjectedCapital)}</strong>
          <small className={styles.metric__hint}>С учетом инфляции.</small>
        </Card>

        <Card as="article" className={styles.metric}>
          <span className={styles.metric__label}>Нужно откладывать</span>
          <strong className={styles.metric__value}>{formatMoney(requiredContribution)}</strong>
          <small className={styles.metric__hint}>Стартовый ежемесячный взнос.</small>
        </Card>

        <Card as="article" className={cn(styles.metric, returnTone)}>
          <span className={styles.metric__label}>Нужная доходность</span>
          <strong className={styles.metric__value}>
            {requiredReturn === null ? 'Больше 100% годовых' : formatPercent(requiredReturn)}
          </strong>
          <small className={styles.metric__hint}>
            {requiredReturn === null
              ? 'Цель выглядит нереалистичной при текущем взносе и сроке.'
              : 'При текущем ежемесячном взносе.'}
          </small>
        </Card>

        <Card as="article" className={styles.metric}>
          <span className={styles.metric__label}>Прибыль от роста</span>
          <strong className={styles.metric__value}>{formatMoney(investmentProfit)}</strong>
          <small className={styles.metric__hint}>
            Часть результата сверх стартового капитала и пополнений.
          </small>
        </Card>
      </div>
    </Card>
  );
}
