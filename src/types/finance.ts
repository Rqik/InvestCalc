export type Inputs = {
  targetCapital: number;
  initialCapital: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
};

export type Scenario = {
  id: string;
  name: string;
  inputs: Inputs;
  createdAt: string;
};

export type ViewMode = 'calculator' | 'plan';

export type YearRow = {
  year: number;
  startBalance: number;
  contributions: number;
  growth: number;
  endBalance: number;
};

export type ExtraYearProjection = {
  years: number;
  finalCapital: number;
  additionalCapital: number;
  additionalGrowth: number;
};
