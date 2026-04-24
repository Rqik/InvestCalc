import type { YearRow } from '@/types/finance';

export type YearlyPlanTableProps = {
  plan: YearRow[];
  targetCapital: number;
  projectedCapital: number;
  realProjectedCapital: number;
  goalGap: number;
};
