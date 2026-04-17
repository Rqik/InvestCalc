import type { YearRow } from '../types/finance';
import { formatMoney } from '../utils/format';

type GrowthChartProps = {
  plan: YearRow[];
};

export function GrowthChart({ plan }: GrowthChartProps) {
  const maxValue = Math.max(...plan.map((row) => row.endBalance), 0);

  return (
    <section className="panel growth-chart">
      <div className="section-header">
        <h2 className="section-header__title">График роста по годам</h2>
        <p className="section-header__description">
          Наглядно показывает, как капитал ускоряется ближе к концу срока.
        </p>
      </div>

      <div className="growth-chart__plot">
        {plan.map((row) => {
          const height = maxValue === 0 ? 0 : (row.endBalance / maxValue) * 100;

          return (
            <div key={row.year} className="growth-chart__column">
              <div className="growth-chart__bar-wrap">
                <div
                  className="growth-chart__bar"
                  style={{ height: `${Math.max(height, 4)}%` }}
                  title={`Год ${row.year}: ${formatMoney(row.endBalance)}`}
                />
              </div>
              <span className="growth-chart__year">{row.year}</span>
              <strong className="growth-chart__amount">{formatMoney(row.endBalance)}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}
