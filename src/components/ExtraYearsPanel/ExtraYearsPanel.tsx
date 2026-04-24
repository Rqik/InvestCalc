import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { ExtraYearProjection } from '@/types/finance';
import { formatAdditionalYears, formatDuration, formatMoney } from '@/utils/format';
import type { ExtraYearsPanelProps } from './ExtraYearsPanel.types';
import styles from './ExtraYearsPanel.module.scss';

function getWaitCardTone(item: ExtraYearProjection) {
  if (item.additionalYears === 0) {
    return undefined;
  }

  if (item.additionalCapital >= 10_000_000 || item.additionalGrowth >= 8_000_000) {
    return styles['extraYearsPanel__card--excellent'];
  }

  if (item.additionalCapital >= 2_000_000 || item.additionalGrowth >= 1_500_000) {
    return styles['extraYearsPanel__card--good'];
  }

  return undefined;
}

function getPeriodNoteTone(item: ExtraYearProjection) {
  if (item.additionalYears === 0) {
    return undefined;
  }

  if (item.additionalCapital >= 10_000_000 || item.additionalGrowth >= 8_000_000) {
    return styles['extraYearsPanel__cardPeriodNote--excellent'];
  }

  if (item.additionalCapital >= 2_000_000 || item.additionalGrowth >= 1_500_000) {
    return styles['extraYearsPanel__cardPeriodNote--good'];
  }

  return undefined;
}

export function ExtraYearsPanel({ extraYears }: ExtraYearsPanelProps) {
  return (
    <Card as="section" className={styles.extraYearsPanel}>
      <CardHeader>
        <CardTitle>Если подождать еще</CardTitle>
        <CardDescription>
          Горизонты ниже строятся от вашего срока и дальше расширяются по
          фибоначчи-подобным шагам, чтобы было видно, как время усиливает сложный
          процент.
        </CardDescription>
      </CardHeader>

      <div className={styles.extraYearsPanel__grid}>
        {extraYears.map((item) => (
          <Card
            as="article"
            key={`${item.years}-${item.months}-${item.additionalYears}`}
            className={cn(styles.extraYearsPanel__card, getWaitCardTone(item))}
          >
            <span className={styles.extraYearsPanel__cardYears}>
              {formatDuration(item.years, item.months)}
              <span
                className={cn(
                  styles.extraYearsPanel__cardPeriodNote,
                  getPeriodNoteTone(item)
                )}
              >
                {formatAdditionalYears(item.additionalYears)}
              </span>
            </span>
            <strong className={styles.extraYearsPanel__cardValue}>
              {formatMoney(item.finalCapital)}
            </strong>
            <small className={styles.extraYearsPanel__cardHint}>
              {item.additionalYears === 0
                ? 'Это ваш текущий сценарий без дополнительного ожидания.'
                : `${formatMoney(item.additionalCapital)} сверх текущего плана.`}
            </small>
            <small className={styles.extraYearsPanel__cardHint}>
              Дополнительный рост от времени: {formatMoney(item.additionalGrowth)}
            </small>
          </Card>
        ))}
      </div>
    </Card>
  );
}
