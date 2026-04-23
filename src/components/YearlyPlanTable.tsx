import React from 'react';
import type { YearRow } from '../types/finance';
import { formatMoney } from '../utils/format';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

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
  const [isMobileCards, setIsMobileCards] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 719px)');
    const handleChange = () => setIsMobileCards(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Card as="section" className="yearly-plan">
      <CardHeader>
        <CardTitle>План накоплений по годам</CardTitle>
        <CardDescription>
          Таблица показывает пополнения, накопленную сумму вложений, прибыль и итог с
          поправкой на инфляцию.
        </CardDescription>
      </CardHeader>

      <div className="yearly-plan__summary">
        <Card className="summary-chip">
          <span className="summary-chip__label">Цель</span>
          <strong className="summary-chip__value">{formatMoney(targetCapital)}</strong>
        </Card>
        <Card className="summary-chip">
          <span className="summary-chip__label">Итог по плану</span>
          <strong className="summary-chip__value">{formatMoney(projectedCapital)}</strong>
        </Card>
        <Card className="summary-chip">
          <span className="summary-chip__label">В сегодняшних деньгах</span>
          <strong className="summary-chip__value">{formatMoney(realProjectedCapital)}</strong>
        </Card>
        <Card className="summary-chip">
          <span className="summary-chip__label">Разница с целью</span>
          <strong className="summary-chip__value">{formatMoney(goalGap)}</strong>
        </Card>
      </div>

      {isMobileCards ? (
        <div className="yearly-plan__mobile-list">
          {plan.map((row) => (
            <Card as="article" key={row.year} className="yearly-plan__mobile-card">
              <div className="yearly-plan__mobile-topline">
                <strong className="yearly-plan__mobile-period">{row.label}</strong>
                <span className="yearly-plan__mobile-total">{formatMoney(row.endBalance)}</span>
              </div>

              <dl className="yearly-plan__mobile-stats">
                <div>
                  <dt>Старт</dt>
                  <dd>{formatMoney(row.startBalance)}</dd>
                </div>
                <div>
                  <dt>Пополнения</dt>
                  <dd>{formatMoney(row.contributions)}</dd>
                </div>
                <div>
                  <dt>Итого вложено</dt>
                  <dd>{formatMoney(row.totalInvested)}</dd>
                </div>
                <div>
                  <dt>Рост за период</dt>
                  <dd>{formatMoney(row.growth)}</dd>
                </div>
                <div>
                  <dt>Накопленная прибыль</dt>
                  <dd>{formatMoney(row.profit)}</dd>
                </div>
                <div>
                  <dt>Сегодняшние деньги</dt>
                  <dd>{formatMoney(row.realEndBalance)}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      ) : (
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
      )}
    </Card>
  );
}
