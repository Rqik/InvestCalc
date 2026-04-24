import type { RetirementInputs } from '@/types/retirement';

export type RetirementInputPanelProps = {
  inputs: RetirementInputs;
  isBirthYearValid: boolean;
  isRetirementPeriodValid: boolean;
  onChange: (inputs: RetirementInputs) => void;
  onReset: () => void;
};
