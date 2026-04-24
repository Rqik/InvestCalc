import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import type { ExtraYearProjection } from '@/types/finance';
import { formatAdditionalYears, formatDuration, formatMoney } from '@/utils/format';
import type { ExtraYearsPanelProps } from './ExtraYearsPanel.types';

function getWaitCardTone(item: ExtraYearProjection) {
  if (item.additionalYears === 0) {
    return '';
  }

  if (item.additionalCapital >= 10_000_000 || item.additionalGrowth >= 8_000_000) {
    return 'extra-years-panel__card--excellent';
  }

  if (item.additionalCapital >= 2_000_000 || item.additionalGrowth >= 1_500_000) {
    return 'extra-years-panel__card--good';
  }

  return '';
}

export function ExtraYearsPanel({ extraYears }: ExtraYearsPanelProps) {
  return (
    <Card as="section" className="extra-years-panel">
      <CardHeader>
        <CardTitle>Если подождать еще</CardTitle>
        <CardDescription>
          Горизонты ниже строятся от вашего срока и дальше расширяются по
          фибоначчи-подобным шагам, чтобы было видно, как время усиливает сложный
          процент.
        </CardDescription>
      </CardHeader>

      <div className="extra-years-panel__grid">
        {extraYears.map((item) => (
          <Card
            as="article"
            key={`${item.years}-${item.months}-${item.additionalYears}`}
            className={`extra-years-panel__card ${getWaitCardTone(item)}`}
          >
            <span className="extra-years-panel__card-years">
              {formatDuration(item.years, item.months)}
              <span className="extra-years-panel__card-period-note">
                {formatAdditionalYears(item.additionalYears)}
              </span>
            </span>
            <strong className="extra-years-panel__card-value">{formatMoney(item.finalCapital)}</strong>
            <small className="extra-years-panel__card-hint">
              {item.additionalYears === 0
                ? 'Это ваш текущий сценарий без дополнительного ожидания.'
                : `${formatMoney(item.additionalCapital)} сверх текущего плана.`}
            </small>
            <small className="extra-years-panel__card-hint">
              Дополнительный рост от времени: {formatMoney(item.additionalGrowth)}
            </small>
          </Card>
        ))}
      </div>
    </Card>
  );
}
