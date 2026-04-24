import { formatMoney } from '@/utils/format';
import type { ChartTooltipProps, TooltipPayload } from './ChartTooltip.types';

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
    <div className="growth-chart__tooltip">
      <strong className="growth-chart__tooltip-title">
        {label}
        <span className="growth-chart__tooltip-mode">{getTooltipTitle(isRealMoneyMode)}</span>
      </strong>
      {uniquePayload.map((item) => (
        <span key={item.dataKey} className="growth-chart__tooltip-row">
          <span
            className="growth-chart__tooltip-dot"
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
