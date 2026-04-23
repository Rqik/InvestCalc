export type Inputs = {
  targetCapital: number;
  initialCapital: number;
  monthlyContribution: number;
  years: number;
  months: number;
  annualReturn: number;
  inflationRate: number;
  contributionGrowthRate: number;
};

export type Scenario = {
  id: string;
  name: string;
  inputs: Inputs;
  createdAt: string;
};

export type YearRow = {
  year: number;
  label: string;
  monthsInPeriod: number;
  startBalance: number;
  contributions: number;
  totalInvested: number;
  growth: number;
  profit: number;
  endBalance: number;
  realEndBalance: number;
};

export type ExtraYearProjection = {
  years: number;
  months: number;
  additionalYears: number;
  finalCapital: number;
  additionalCapital: number;
  additionalGrowth: number;
};
