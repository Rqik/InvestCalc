import { formatMoney } from '@/utils/format';
import type { ChartTooltipProps, TooltipPayload } from './ChartTooltip.types';
import styles from './ChartTooltip.module.scss';

function formatTooltipValue(item: TooltipPayload) {
  return formatMoney(item.value ?? 0);
}

function getTooltipItemStyle(item: TooltipPayload) {
  return {
    backgroundColor: item.color,
  };
}

function getTooltipTitle(isRealMoneyMode: boolean) {
  return isRealMoneyMode ? 'Сегодняшние деньги' : 'Номинальный план';
}

function getTooltipSuffix(item: TooltipPayload) {
  return item.yAxisId === 'contribution' ? ' / мес' : '';
}

function ChartTooltip({
  active,
  label,
  payload,
  isRealMoneyMode,
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const uniquePayload = payload.reduce<TooltipPayload[]>((items, item) => {
    if (!item.dataKey) {
      return items;
    }

    const existingItemIndex = items.findIndex(
      (existingItem) => existingItem.dataKey === item.dataKey,
    );

    if (existingItemIndex === -1) {
      items.push(item);
      return items;
    }

    if (item.name && item.name !== item.dataKey) {
      items[existingItemIndex] = item;
    }

    return items;
  }, []);

  return (
    <div className={styles.tooltip}>
      <strong className={styles.tooltip__title}>
        {label}
        <span className={styles.tooltip__mode}>{getTooltipTitle(isRealMoneyMode)}</span>
      </strong>
      {uniquePayload.map((item) => (
        <span key={item.dataKey} className={styles.tooltip__row}>
          <span
            className={styles.tooltip__dot}
            style={getTooltipItemStyle(item)}
          />
          {item.name}: {formatTooltipValue(item)}
          {getTooltipSuffix(item)}
        </span>
      ))}
    </div>
  );
}

export { ChartTooltip };
