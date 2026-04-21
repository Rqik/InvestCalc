import type { ExtraYearProjection } from '../types/finance';
import { formatAdditionalYears, formatDuration, formatMoney } from '../utils/format';

type ExtraYearsPanelProps = {
  extraYears: ExtraYearProjection[];
};

export function ExtraYearsPanel({ extraYears }: ExtraYearsPanelProps) {
  return (
    <section className="panel extra-years-panel">
      <div className="section-header">
        <h2 className="section-header__title">Если подождать еще</h2>
        <p className="section-header__description">
          Горизонты ниже строятся от вашего срока и дальше расширяются по
          фибоначчи-подобным шагам, чтобы было видно, как время усиливает сложный
          процент.
        </p>
      </div>

      <div className="extra-years-panel__grid">
        {extraYears.map((item) => (
          <article key={`${item.years}-${item.months}-${item.additionalYears}`} className="wait-card">
            <span className="wait-card__years">
              {formatDuration(item.years, item.months)}
              <span className="wait-card__period-note">
                {formatAdditionalYears(item.additionalYears)}
              </span>
            </span>
            <strong className="wait-card__value">{formatMoney(item.finalCapital)}</strong>
            <small className="wait-card__hint">
              {item.additionalYears === 0
                ? 'Это ваш текущий сценарий без дополнительного ожидания'
                : `${formatMoney(item.additionalCapital)} сверх текущего плана`}
            </small>
            <small className="wait-card__hint">
              Дополнительный рост от времени: {formatMoney(item.additionalGrowth)}
            </small>
          </article>
        ))}
      </div>
    </section>
  );
}
