export type RetirementInputs = {
  birthYear: number;
  retirementAge: number;
  desiredMonthlyIncome: number;
  currentSavings: number;
  monthlyInvestment: number;
  annualReturn: number;
  inflationRate: number;
  contributionGrowthRate: number;
  planningAge: number;
};

export type RetirementAgeGroup = 'young' | 'middle' | 'preRetirement' | 'retired';

export type RetirementPlan = {
  ageGroup: RetirementAgeGroup;
  currentAge: number;
  yearsToRetirement: number;
  retirementYears: number;
  projectedCapital: number;
  projectedCapitalToday: number;
  requiredCapital: number;
  requiredCapitalToday: number;
  gap: number;
  requiredMonthlyInvestment: number;
  moneyLastsYears: number;
  moneyLastsUntilAge: number;
  isOnTrack: boolean;
  isAlreadyRetirementAge: boolean;
  isBirthYearValid: boolean;
};
