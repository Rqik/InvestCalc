import React from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChartTooltip } from '@/components/GrowthChart/components/ChartTooltip';
import { CrosshairCursor } from '@/components/GrowthChart/components/CrosshairCursor';
import { cn } from '@/lib/utils';
import type { YearRow } from '@/types/finance';
import { formatMoney } from '@/utils/format';
import type { GrowthChartProps } from './GrowthChart.types';
import styles from './GrowthChart.module.scss';

const capitalLines = [
  {
    dataKey: 'endBalance',
    realDataKey: 'realEndBalance',
    label: 'Итоговый капитал',
    color: 'hsl(146 46% 42%)',
    fill: 'url(#growth-total-fill)',
    yAxisId: 'capital',
  },
  {
    dataKey: 'totalInvested',
    realDataKey: 'realTotalInvested',
    label: 'Вложено',
    color: 'hsl(var(--foreground) / 0.76)',
    fill: 'url(#growth-invested-fill)',
    yAxisId: 'capital',
  },
];

const contributionLine = {
  dataKey: 'monthlyContribution',
  realDataKey: 'realMonthlyContribution',
  label: 'Ежемесячный взнос',
  color: 'hsl(221 70% 56%)',
  yAxisId: 'contribution',
};

function getRealValueAtMonths(value: number, inflationRate: number, months: number) {
  const monthlyInflationRate = inflationRate / 100 / 12;

  if (monthlyInflationRate <= 0 || months <= 0) {
    return value;
  }

  return value / Math.pow(1 + monthlyInflationRate, months);
}

function getYearlyMonthlyContribution(planRow: YearRow) {
  if (planRow.monthsInPeriod <= 0) {
    return 0;
  }

  return planRow.contributions / planRow.monthsInPeriod;
}

type VisibleSeries = 'capital' | 'invested' | 'contribution';

const seriesLabels: Record<VisibleSeries, string> = {
  capital: 'Капитал',
  invested: 'Вложено',
  contribution: 'Взнос',
};

const seriesToColorMap: Record<VisibleSeries, string> = {
  capital: capitalLines[0].color,
  invested: capitalLines[1].color,
  contribution: contributionLine.color,
};

function formatAxisMoney(value: number, isCompactChart: boolean) {
  return isCompactChart ? formatCompactMoney(Number(value)) : formatMoney(Number(value));
}

function getDefaultVisibleSeries(): Record<VisibleSeries, boolean> {
  return {
    capital: true,
    invested: true,
    contribution: true,
  };
}

function formatCompactMoney(value: number) {
  const absValue = Math.abs(value);

  if (absValue >= 1_000_000_000) {
    return `${Math.round(value / 1_000_000_000)} млрд`;
  }

  if (absValue >= 1_000_000) {
    return `${Math.round(value / 1_000_000)} млн`;
  }

  if (absValue >= 1_000) {
    return `${Math.round(value / 1_000)} тыс`;
  }

  return String(Math.round(value));
}

function useCompactChart() {
  const [isCompact, setIsCompact] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 430px)');
    const handleChange = () => setIsCompact(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isCompact;
}

export function GrowthChart({ plan, inflationRate }: GrowthChartProps) {
  const isCompactChart = useCompactChart();
  const [visibleSeries, setVisibleSeries] = React.useState<Record<VisibleSeries, boolean>>(
    getDefaultVisibleSeries,
  );
  const [isRealMoneyMode, setIsRealMoneyMode] = React.useState(false);

  const chartData = React.useMemo(() => {
    let elapsedMonths = 0;

    return plan.map((row) => {
      elapsedMonths += row.monthsInPeriod;
      const monthlyContribution = getYearlyMonthlyContribution(row);

      return {
        ...row,
        period: row.label,
        monthlyContribution,
        realTotalInvested: row.realTotalInvested,
        realMonthlyContribution: getRealValueAtMonths(monthlyContribution, inflationRate, elapsedMonths),
      };
    });
  }, [inflationRate, plan]);

  const contributionAxisVisible = visibleSeries.contribution;

  const toggleSeries = (series: VisibleSeries) => {
    setVisibleSeries((currentState) => {
      const nextState = {
        ...currentState,
        [series]: !currentState[series],
      };

      if (Object.values(nextState).some(Boolean)) {
        return nextState;
      }

      return currentState;
    });
  };

  return (
    <Card as="section" className={styles.growthChart}>
      <CardHeader>
        <div className={styles.growthChart__header}>
          <div className={styles.growthChart__heading}>
            <CardTitle>График роста по годам</CardTitle>
            <CardDescription>
              Можно скрывать отдельные линии, смотреть ежемесячный взнос и переключать
              график в режим сегодняшних денег.
            </CardDescription>
          </div>

          <div className={styles.growthChart__controls}>
            <div className={styles.growthChart__seriesToggles} aria-label="Показать линии графика">
              {(Object.keys(seriesLabels) as VisibleSeries[]).map((series) => (
                <Button
                  key={series}
                  className={cn(
                    styles.growthChart__toggle,
                    visibleSeries[series] && styles['growthChart__toggle--active']
                  )}
                  variant={visibleSeries[series] ? 'secondary' : 'outline'}
                  size="sm"
                  type="button"
                  onClick={() => toggleSeries(series)}
                >
                  <span
                    className={styles.growthChart__toggleDot}
                    style={{ backgroundColor: seriesToColorMap[series] }}
                  />
                  {seriesLabels[series]}
                </Button>
              ))}
            </div>

            <div className={styles.growthChart__modeControl}>
              <span className={styles.growthChart__modeLabel}>Режим графика</span>
              <Button
                className={cn(
                  styles.growthChart__toggle,
                  isRealMoneyMode && styles['growthChart__toggle--active']
                )}
                variant={isRealMoneyMode ? 'secondary' : 'outline'}
                size="sm"
                type="button"
                onClick={() => setIsRealMoneyMode((currentState) => !currentState)}
              >
                {isRealMoneyMode ? 'Сегодняшние деньги' : 'Номинальные значения'}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <div className={styles.growthChart__frame}>
        <ResponsiveContainer width="100%" height={isCompactChart ? 300 : 360}>
          <ComposedChart
            data={chartData}
            margin={
              isCompactChart
                ? { top: 12, right: contributionAxisVisible ? 16 : 8, bottom: 4, left: 0 }
                : { top: 18, right: contributionAxisVisible ? 32 : 24, bottom: 8, left: 8 }
            }
          >
            <defs>
              <linearGradient
                className={styles.growthChart__gradient}
                id="growth-total-fill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="hsl(146 46% 42% / 0.22)" />
                <stop offset="100%" stopColor="hsl(146 46% 42% / 0.02)" />
              </linearGradient>
              <linearGradient
                className={styles.growthChart__gradient}
                id="growth-invested-fill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="hsl(var(--foreground) / 0.14)" />
                <stop offset="100%" stopColor="hsl(var(--foreground) / 0.01)" />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 8" />
            <XAxis
              dataKey="period"
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              minTickGap={isCompactChart ? 22 : 8}
            />
            <YAxis
              yAxisId="capital"
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => formatAxisMoney(Number(value), isCompactChart)}
              width={isCompactChart ? 54 : 92}
            />
            {contributionAxisVisible && (
              <YAxis
                yAxisId="contribution"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => formatAxisMoney(Number(value), isCompactChart)}
                width={isCompactChart ? 48 : 80}
              />
            )}
            <Tooltip
              content={<ChartTooltip isRealMoneyMode={isRealMoneyMode} />}
              cursor={<CrosshairCursor />}
            />

            {capitalLines.map((line, index) =>
              visibleSeries[index === 0 ? 'capital' : 'invested'] ? (
                <React.Fragment key={line.dataKey}>
                  <Area
                    type="monotone"
                    yAxisId={line.yAxisId}
                    dataKey={isRealMoneyMode ? line.realDataKey : line.dataKey}
                    stroke="none"
                    fill={line.fill}
                    fillOpacity={1}
                  />
                  <Line
                    type="monotone"
                    yAxisId={line.yAxisId}
                    dataKey={isRealMoneyMode ? line.realDataKey : line.dataKey}
                    name={line.label}
                    stroke={line.color}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </React.Fragment>
              ) : null,
            )}

            {visibleSeries.contribution && (
              <Line
                type="monotone"
                yAxisId={contributionLine.yAxisId}
                dataKey={isRealMoneyMode ? contributionLine.realDataKey : contributionLine.dataKey}
                name={contributionLine.label}
                stroke={contributionLine.color}
                strokeWidth={2.5}
                strokeDasharray="7 6"
                dot={{ r: 3, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                activeDot={{ r: 5, strokeWidth: 2 }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.growthChart__legend}>
        {capitalLines
          .filter((_, index) => visibleSeries[index === 0 ? 'capital' : 'invested'])
          .map((line) => (
            <div key={line.dataKey} className={styles.growthChart__legendItem}>
              <span
                className={styles.growthChart__legendSwatch}
                style={{ backgroundColor: line.color }}
              />
              <span className={styles.growthChart__legendLabel}>{line.label}</span>
            </div>
          ))}
        {visibleSeries.contribution && (
          <div className={styles.growthChart__legendItem}>
            <span
              className={cn(
                styles.growthChart__legendSwatch,
                styles['growthChart__legendSwatch--dashed']
              )}
              style={{ backgroundColor: contributionLine.color }}
            />
            <span className={styles.growthChart__legendLabel}>Ежемесячный взнос</span>
            <Badge variant="outline">
              {isRealMoneyMode ? 'в сегодняшних деньгах' : 'номинально'}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}
