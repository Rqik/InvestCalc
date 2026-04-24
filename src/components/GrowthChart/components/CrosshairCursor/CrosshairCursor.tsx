import type { CrosshairCursorProps } from './CrosshairCursor.types';

function CrosshairCursor({ points, viewBox }: CrosshairCursorProps) {
  if (!viewBox || !points?.length) {
    return null;
  }

  const x = points[0]?.x;
  const { x: viewBoxX, y: viewBoxY, width: viewBoxWidth, height: viewBoxHeight } = viewBox;
  const uniqueY = Array.from(
    new Set(points.map((point) => point.y).filter((value): value is number => value != null)),
  );

  if (x == null || viewBoxX == null || viewBoxY == null || viewBoxWidth == null || viewBoxHeight == null) {
    return null;
  }

  return (
    <g className="growth-chart__crosshair" pointerEvents="none">
      <line
        x1={x}
        y1={viewBoxY}
        x2={x}
        y2={viewBoxY + viewBoxHeight}
        className="growth-chart__crosshair-line"
      />
      {uniqueY.map((y) => (
        <line
          key={y}
          x1={viewBoxX}
          y1={y}
          x2={viewBoxX + viewBoxWidth}
          y2={y}
          className="growth-chart__crosshair-line growth-chart__crosshair-line--horizontal"
        />
      ))}
    </g>
  );
}

export { CrosshairCursor };
