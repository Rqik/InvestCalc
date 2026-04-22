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
  const chartData = plan.map((row) => ({
    ...row,
    period: row.label,
  }));

  return (
    <section className="panel growth-chart">
      <div className="section-header">
        <h2 className="section-header__title">График роста по годам</h2>
        <p className="section-header__description">
          Две линии показывают разницу между вложенными деньгами и итоговым капиталом.
        </p>
      </div>

      <div className="growth-chart__frame">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={chartData} margin={{ top: 18, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 8" />
            <XAxis
              dataKey="period"
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => formatMoney(Number(value))}
              width={92}
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
    </section>
  );
}
