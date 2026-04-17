import type { YearRow } from '../types/finance';
import { formatMoney } from '../utils/format';

type YearlyPlanTableProps = {
  plan: YearRow[];
  targetCapital: number;
  projectedCapital: number;
  goalGap: number;
};

export function YearlyPlanTable({
  plan,
  targetCapital,
  projectedCapital,
  goalGap,
}: YearlyPlanTableProps) {
  return (
    <section className="panel yearly-plan">
      <div className="section-header">
        <h2 className="section-header__title">План накоплений по годам</h2>
        <p className="section-header__description">
          Таблица показывает старт, пополнения, рост капитала и итог за каждый год.
        </p>
      </div>

      <div className="yearly-plan__summary">
        <div className="summary-chip">
          <span className="summary-chip__label">Цель</span>
          <strong className="summary-chip__value">{formatMoney(targetCapital)}</strong>
        </div>
        <div className="summary-chip">
          <span className="summary-chip__label">Итог по плану</span>
          <strong className="summary-chip__value">{formatMoney(projectedCapital)}</strong>
        </div>
        <div className="summary-chip">
          <span className="summary-chip__label">Разница</span>
          <strong className="summary-chip__value">{formatMoney(goalGap)}</strong>
        </div>
      </div>

      <div className="yearly-plan__table-wrap">
        <table className="yearly-plan__table">
          <thead>
            <tr>
              <th>Год</th>
              <th>Старт</th>
              <th>Пополнения</th>
              <th>Рост</th>
              <th>Итог</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{formatMoney(row.startBalance)}</td>
                <td>{formatMoney(row.contributions)}</td>
                <td>{formatMoney(row.growth)}</td>
                <td>{formatMoney(row.endBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
