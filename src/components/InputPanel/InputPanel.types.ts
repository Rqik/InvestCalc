import type { Inputs } from '@/types/finance';

export type InputPanelProps = {
  inputs: Inputs;
  isDurationInvalid: boolean;
  onChange: (inputs: Inputs) => void;
  onReset: () => void;
};
