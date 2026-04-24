import type { FinanceSnapshot, Inputs } from '@/types/finance';

export type HelpPanelsProps = {
  inputs: Inputs;
  snapshot: FinanceSnapshot;
  onApplyExample: (inputs: Inputs) => void;
};
