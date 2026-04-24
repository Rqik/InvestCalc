import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { formatMoney } from '@/utils/format';
import type { YearlyPlanTableProps } from './YearlyPlanTable.types';
import styles from './YearlyPlanTable.module.scss';

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
    <Card as="section" className={styles.yearlyPlan}>
      <CardHeader>
        <CardTitle>План накоплений по годам</CardTitle>
        <CardDescription>
          Таблица показывает пополнения, накопленную сумму вложений, прибыль и итог с поправкой на инфляцию.
        </CardDescription>
      </CardHeader>

      <div className={styles.yearlyPlan__summary}>
        <Card className={styles.yearlyPlan__summaryChip}>
          <span className={styles.yearlyPlan__summaryChipLabel}>Цель</span>
          <strong className={styles.yearlyPlan__summaryChipValue}>
            {formatMoney(targetCapital)}
          </strong>
        </Card>
        <Card className={styles.yearlyPlan__summaryChip}>
          <span className={styles.yearlyPlan__summaryChipLabel}>Итог по плану</span>
          <strong className={styles.yearlyPlan__summaryChipValue}>
            {formatMoney(projectedCapital)}
          </strong>
        </Card>
        <Card className={styles.yearlyPlan__summaryChip}>
          <span className={styles.yearlyPlan__summaryChipLabel}>В сегодняшних деньгах</span>
          <strong className={styles.yearlyPlan__summaryChipValue}>
            {formatMoney(realProjectedCapital)}
          </strong>
        </Card>
        <Card className={styles.yearlyPlan__summaryChip}>
          <span className={styles.yearlyPlan__summaryChipLabel}>Разница с целью</span>
          <strong className={styles.yearlyPlan__summaryChipValue}>{formatMoney(goalGap)}</strong>
        </Card>
      </div>

      {isMobileCards ? (
        <div className={styles.yearlyPlan__mobileList}>
          {plan.map((row) => (
            <Card as="article" key={row.year} className={styles.yearlyPlan__mobileCard}>
              <div className={styles.yearlyPlan__mobileTopline}>
                <strong className={styles.yearlyPlan__mobilePeriod}>{row.label}</strong>
                <span className={styles.yearlyPlan__mobileTotal}>
                  {formatMoney(row.endBalance)}
                </span>
              </div>

              <dl className={styles.yearlyPlan__mobileStats}>
                <div
                  className={cn(
                    styles.yearlyPlan__mobileStat,
                    styles['yearlyPlan__mobileStat--first'],
                  )}
                >
                  <dt className={styles.yearlyPlan__mobileStatTerm}>Старт</dt>
                  <dd className={styles.yearlyPlan__mobileStatValue}>
                    {formatMoney(row.startBalance)}
                  </dd>
                </div>
                <div className={styles.yearlyPlan__mobileStat}>
                  <dt className={styles.yearlyPlan__mobileStatTerm}>Пополнения</dt>
                  <dd className={styles.yearlyPlan__mobileStatValue}>
                    {formatMoney(row.contributions)}
                  </dd>
                </div>
                <div className={styles.yearlyPlan__mobileStat}>
                  <dt className={styles.yearlyPlan__mobileStatTerm}>Итого вложено</dt>
                  <dd className={styles.yearlyPlan__mobileStatValue}>
                    {formatMoney(row.totalInvested)}
                  </dd>
                </div>
                <div className={styles.yearlyPlan__mobileStat}>
                  <dt className={styles.yearlyPlan__mobileStatTerm}>Рост за период</dt>
                  <dd className={styles.yearlyPlan__mobileStatValue}>{formatMoney(row.growth)}</dd>
                </div>
                <div className={styles.yearlyPlan__mobileStat}>
                  <dt className={styles.yearlyPlan__mobileStatTerm}>Накопленная прибыль</dt>
                  <dd className={styles.yearlyPlan__mobileStatValue}>{formatMoney(row.profit)}</dd>
                </div>
                <div className={styles.yearlyPlan__mobileStat}>
                  <dt className={styles.yearlyPlan__mobileStatTerm}>Сегодняшние деньги</dt>
                  <dd className={styles.yearlyPlan__mobileStatValue}>
                    {formatMoney(row.realEndBalance)}
                  </dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      ) : (
        <div className={styles.yearlyPlan__tableWrap}>
          <table className={styles.yearlyPlan__table}>
            <thead className={styles.yearlyPlan__tableHead}>
              <tr className={styles.yearlyPlan__tableRow}>
                <th
                  className={cn(
                    styles.yearlyPlan__tableHeadCell,
                    styles['yearlyPlan__tableHeadCell--sticky'],
                  )}
                >
                  Период
                </th>
                <th className={styles.yearlyPlan__tableHeadCell}>Старт</th>
                <th className={styles.yearlyPlan__tableHeadCell}>Пополнения</th>
                <th className={styles.yearlyPlan__tableHeadCell}>Итого вложено</th>
                <th className={styles.yearlyPlan__tableHeadCell}>Рост за период</th>
                <th className={styles.yearlyPlan__tableHeadCell}>Накопленная прибыль</th>
                <th className={styles.yearlyPlan__tableHeadCell}>Итог</th>
                <th className={styles.yearlyPlan__tableHeadCell}>Сегодняшние деньги</th>
              </tr>
            </thead>
            <tbody className={styles.yearlyPlan__tableBody}>
              {plan.map((row) => (
                <tr
                  key={row.year}
                  className={cn(
                    styles.yearlyPlan__tableRow,
                    styles['yearlyPlan__tableRow--hoverable'],
                  )}
                >
                  <td
                    className={cn(
                      styles.yearlyPlan__tableCell,
                      styles['yearlyPlan__tableCell--sticky'],
                    )}
                  >
                    {row.label}
                  </td>
                  <td className={styles.yearlyPlan__tableCell}>{formatMoney(row.startBalance)}</td>
                  <td className={styles.yearlyPlan__tableCell}>{formatMoney(row.contributions)}</td>
                  <td className={styles.yearlyPlan__tableCell}>{formatMoney(row.totalInvested)}</td>
                  <td className={styles.yearlyPlan__tableCell}>{formatMoney(row.growth)}</td>
                  <td className={styles.yearlyPlan__tableCell}>{formatMoney(row.profit)}</td>
                  <td className={styles.yearlyPlan__tableCell}>{formatMoney(row.endBalance)}</td>
                  <td className={styles.yearlyPlan__tableCell}>
                    {formatMoney(row.realEndBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
