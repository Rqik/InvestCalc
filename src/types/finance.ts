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
  realTotalInvested: number;
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

export type FinanceSnapshot = {
  totalMonths: number;
  isDurationInvalid: boolean;
  projectedCapital: number;
  realProjectedCapital: number;
  requiredContribution: number;
  requiredReturn: number | null;
  totalInvested: number;
  investmentProfit: number;
  goalGap: number;
  yearlyPlan: YearRow[];
};

export type MethodologyInsightTone = 'neutral' | 'good' | 'warning' | 'danger';

export type MethodologyInsight = {
  title: string;
  description: string;
  tone: MethodologyInsightTone;
};

export type ComparisonScenarioKind = 'cautious' | 'current' | 'accelerated';

export type ComparisonScenario = {
  id: ComparisonScenarioKind;
  title: string;
  badge: string;
  description: string;
  adjustmentLabel: string;
  inputs: Inputs;
  snapshot: FinanceSnapshot;
  isCurrent: boolean;
};
