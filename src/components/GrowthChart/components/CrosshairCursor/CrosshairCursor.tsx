import { cn } from '@/lib/utils';
import type { CrosshairCursorProps } from './CrosshairCursor.types';
import styles from './CrosshairCursor.module.scss';

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
    <g className={styles.crosshair} pointerEvents="none">
      <line
        x1={x}
        y1={viewBoxY}
        x2={x}
        y2={viewBoxY + viewBoxHeight}
        className={styles.crosshair__line}
      />
      {uniqueY.map((y) => (
        <line
          key={y}
          x1={viewBoxX}
          y1={y}
          x2={viewBoxX + viewBoxWidth}
          y2={y}
          className={cn(styles.crosshair__line, styles['crosshair__line--horizontal'])}
        />
      ))}
    </g>
  );
}

export { CrosshairCursor };
