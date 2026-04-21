import type { Inputs } from '../types/finance';

export const MONTHS_IN_YEAR = 12;
export const STORAGE_KEY = 'yield-calculator-scenarios';
export const EXTRA_YEARS_TO_COMPARE = 5;

export const DEFAULT_INPUTS: Inputs = {
  targetCapital: 5_000_000,
  initialCapital: 300_000,
  monthlyContribution: 35_000,
  years: 10,
  months: 0,
  annualReturn: 12,
};
