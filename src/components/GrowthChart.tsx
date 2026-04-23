import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { YearRow } from '../types/finance';
import { formatMoney } from '../utils/format';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type GrowthChartProps = {
  plan: YearRow[];
};

type TooltipPayload = {
  color?: string;
  dataKey?: string;
  name?: string;
  value?: number;
};

type TooltipProps = {
  active?: boolean;
  label?: string;
  payload?: TooltipPayload[];
};

const chartLines = [
  {
    dataKey: 'endBalance',
    label: 'Итоговый капитал',
    color: 'hsl(var(--chart-1))',
  },
  {
    dataKey: 'totalInvested',
    label: 'Вложено',
    color: 'hsl(var(--chart-3))',
  },
];

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

function ChartTooltip({ active, label, payload }: TooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="growth-chart__tooltip">
      <strong className="growth-chart__tooltip-title">{label}</strong>
      {payload.map((item) => (
        <span key={item.dataKey} className="growth-chart__tooltip-row">
          <span
            className="growth-chart__tooltip-dot"
            style={{ backgroundColor: item.color }}
          />
          {item.name}: {formatMoney(item.value ?? 0)}
        </span>
      ))}
    </div>
  );
}

export function GrowthChart({ plan }: GrowthChartProps) {
  const isCompactChart = useCompactChart();
  const chartData = plan.map((row) => ({
    ...row,
    period: row.label,
  }));

  return (
    <Card as="section" className="growth-chart">
      <CardHeader>
        <CardTitle>График роста по годам</CardTitle>
        <CardDescription>
          Две линии показывают разницу между вложенными деньгами и итоговым капиталом.
        </CardDescription>
      </CardHeader>

      <div className="growth-chart__frame">
        <ResponsiveContainer width="100%" height={isCompactChart ? 300 : 360}>
          <LineChart
            data={chartData}
            margin={isCompactChart
              ? { top: 12, right: 8, bottom: 4, left: 0 }
              : { top: 18, right: 24, bottom: 8, left: 8 }}
          >
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
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) =>
                isCompactChart ? formatCompactMoney(Number(value)) : formatMoney(Number(value))
              }
              width={isCompactChart ? 54 : 92}
            />
            <Tooltip content={<ChartTooltip />} />
            {chartLines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.label}
                stroke={line.color}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="growth-chart__legend">
        {chartLines.map((line) => (
          <div key={line.dataKey} className="growth-chart__legend-item">
            <span
              className="growth-chart__legend-swatch"
              style={{ backgroundColor: line.color }}
            />
            <span>{line.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
