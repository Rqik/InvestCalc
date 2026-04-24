export type TooltipPayload = {
  color?: string;
  dataKey?: string;
  name?: string;
  value?: number;
  yAxisId?: string;
};

export type ChartTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: TooltipPayload[];
  isRealMoneyMode: boolean;
};
