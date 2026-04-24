import type { Inputs } from '@/types/finance';

export type DurationInputProps = {
  years: number;
  months: number;
  onChange: (duration: Pick<Inputs, 'years' | 'months'>) => void;
};
