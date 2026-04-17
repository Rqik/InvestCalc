import type { YearRow } from '../types/finance';
import { formatMoney } from '../utils/format';

type GrowthChartProps = {
  plan: YearRow[];
};

const CHART_WIDTH = 900;
const CHART_HEIGHT = 320;
const PADDING_X = 28;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 44;

export function GrowthChart({ plan }: GrowthChartProps) {
  const maxValue = Math.max(...plan.map((row) => row.endBalance), 0);
  const minX = PADDING_X;
  const maxX = CHART_WIDTH - PADDING_X;
  const minY = PADDING_TOP;
  const maxY = CHART_HEIGHT - PADDING_BOTTOM;
  const stepX = plan.length > 1 ? (maxX - minX) / (plan.length - 1) : 0;

  const points = plan.map((row, index) => {
    const x = minX + stepX * index;
    const normalizedValue = maxValue === 0 ? 0 : row.endBalance / maxValue;
    const y = maxY - normalizedValue * (maxY - minY);

    return {
      ...row,
      x,
      y,
    };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(' ');

  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${maxY} L ${points[0].x.toFixed(2)} ${maxY} Z`
    : '';

  const horizontalGuides = Array.from({ length: 4 }, (_, index) => {
    const ratio = index / 3;
    const value = maxValue * (1 - ratio);
    const y = minY + (maxY - minY) * ratio;

    return {
      id: index,
      value,
      y,
    };
  });

  return (
    <section className="panel growth-chart">
      <div className="section-header">
        <h2 className="section-header__title">График роста по годам</h2>
        <p className="section-header__description">
          Теперь это полноценная кривая роста капитала: так проще увидеть ускорение
          накоплений ближе к концу срока.
        </p>
      </div>

      <div className="growth-chart__frame">
        <svg
          className="growth-chart__svg"
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          role="img"
          aria-label="График роста капитала по годам"
        >
          <defs>
            <linearGradient id="growth-chart-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.42)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.04)" />
            </linearGradient>
            <linearGradient id="growth-chart-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {horizontalGuides.map((guide) => (
            <g key={guide.id}>
              <line
                className="growth-chart__grid-line"
                x1={minX}
                x2={maxX}
                y1={guide.y}
                y2={guide.y}
              />
              <text className="growth-chart__grid-label" x={0} y={guide.y + 4}>
                {formatMoney(guide.value)}
              </text>
            </g>
          ))}

          {points.length > 0 && (
            <>
              <path className="growth-chart__area" d={areaPath} />
              <path className="growth-chart__line" d={linePath} />
            </>
          )}

          {points.map((point) => (
            <g key={point.year}>
              <circle className="growth-chart__point" cx={point.x} cy={point.y} r="5" />
              <title>{`Год ${point.year}: ${formatMoney(point.endBalance)}`}</title>
              <text className="growth-chart__x-label" x={point.x} y={CHART_HEIGHT - 12}>
                {point.year}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="growth-chart__legend">
        <div className="growth-chart__legend-item">
          <span className="growth-chart__legend-swatch growth-chart__legend-swatch--line" />
          <span>Капитал к концу каждого года</span>
        </div>
        <div className="growth-chart__legend-item">
          <span className="growth-chart__legend-swatch growth-chart__legend-swatch--area" />
          <span>Накопление во времени</span>
        </div>
      </div>
    </section>
  );
}
