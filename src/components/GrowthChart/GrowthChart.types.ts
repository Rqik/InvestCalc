import type { YearRow } from '@/types/finance';

export type GrowthChartProps = {
  plan: YearRow[];
  inflationRate: number;
};
