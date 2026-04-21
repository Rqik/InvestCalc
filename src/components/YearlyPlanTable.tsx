import type { YearRow } from '../types/finance';
import { formatMoney } from '../utils/format';

type YearlyPlanTableProps = {
  plan: YearRow[];
  targetCapital: number;
  projectedCapital: number;
  realProjectedCapital: number;
  goalGap: number;
};

export function YearlyPlanTable({
  plan,
  targetCapital,
  projectedCapital,
  realProjectedCapital,
  goalGap,
}: YearlyPlanTableProps) {
  return (
    <section className="panel yearly-plan">
      <div className="section-header">
        <h2 className="section-header__title">План накоплений по годам</h2>
        <p className="section-header__description">
          Таблица показывает пополнения, накопленную сумму вложений, прибыль и итог с
          поправкой на инфляцию.
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
          <span className="summary-chip__label">В сегодняшних деньгах</span>
          <strong className="summary-chip__value">{formatMoney(realProjectedCapital)}</strong>
        </div>
        <div className="summary-chip">
          <span className="summary-chip__label">Разница с целью</span>
          <strong className="summary-chip__value">{formatMoney(goalGap)}</strong>
        </div>
      </div>

      <div className="yearly-plan__table-wrap">
        <table className="yearly-plan__table">
          <thead>
            <tr>
              <th>Период</th>
              <th>Старт</th>
              <th>Пополнения</th>
              <th>Итого вложено</th>
              <th>Рост за период</th>
              <th>Накопленная прибыль</th>
              <th>Итог</th>
              <th>Сегодняшние деньги</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((row) => (
              <tr key={row.year}>
                <td>{row.label}</td>
                <td>{formatMoney(row.startBalance)}</td>
                <td>{formatMoney(row.contributions)}</td>
                <td>{formatMoney(row.totalInvested)}</td>
                <td>{formatMoney(row.growth)}</td>
                <td>{formatMoney(row.profit)}</td>
                <td>{formatMoney(row.endBalance)}</td>
                <td>{formatMoney(row.realEndBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
