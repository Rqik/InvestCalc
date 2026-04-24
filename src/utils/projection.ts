import { MONTHS_IN_YEAR } from '@/constants/defaults';

export function toRate(value: number) {
  return Math.max(0, value) / 100;
}

export function getMonthlyRateFromAnnual(annualRate: number) {
  return toRate(annualRate) / MONTHS_IN_YEAR;
}

export function getIndexedContribution(
  monthlyContribution: number,
  contributionGrowthRate: number,
  monthIndex: number,
) {
  const completedYears = Math.floor(monthIndex / MONTHS_IN_YEAR);

  return Math.max(0, monthlyContribution) * Math.pow(1 + toRate(contributionGrowthRate), completedYears);
}

export function projectMonthlyBalance({
  initialCapital,
  monthlyContribution,
  totalMonths,
  annualReturn,
  contributionGrowthRate,
}: {
  initialCapital: number;
  monthlyContribution: number;
  totalMonths: number;
  annualReturn: number;
  contributionGrowthRate: number;
}) {
  const monthlyRate = getMonthlyRateFromAnnual(annualReturn);
  let balance = Math.max(0, initialCapital);

  for (let month = 0; month < Math.max(0, totalMonths); month += 1) {
    balance *= 1 + monthlyRate;
    balance += getIndexedContribution(monthlyContribution, contributionGrowthRate, month);
  }

  return balance;
}
