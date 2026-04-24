import { MONTHS_IN_YEAR } from '@/constants/defaults';
import type { RetirementAgeGroup, RetirementInputs, RetirementPlan } from '@/types/retirement';
import { isBirthYearInRange } from './age';
import { getMonthlyRateFromAnnual, projectMonthlyBalance, toRate } from './projection';

const MAX_WITHDRAWAL_YEARS = 80;

function getAgeGroup(currentAge: number, retirementAge: number): RetirementAgeGroup {
  if (currentAge >= retirementAge) {
    return 'retired';
  }

  if (currentAge < 35) {
    return 'young';
  }

  if (currentAge < 50) {
    return 'middle';
  }

  return 'preRetirement';
}

function projectCapital(
  currentSavings: number,
  monthlyInvestment: number,
  years: number,
  annualReturn: number,
  contributionGrowthRate: number,
) {
  const months = Math.max(0, Math.round(years * MONTHS_IN_YEAR));

  return projectMonthlyBalance({
    initialCapital: currentSavings,
    monthlyContribution: monthlyInvestment,
    totalMonths: months,
    annualReturn,
    contributionGrowthRate,
  });
}

function getRequiredCapitalToday(
  desiredMonthlyIncome: number,
  retirementYears: number,
  annualReturn: number,
  inflationRate: number,
) {
  const months = Math.max(0, Math.round(retirementYears * MONTHS_IN_YEAR));
  const realAnnualReturn = (1 + toRate(annualReturn)) / (1 + toRate(inflationRate)) - 1;
  const realMonthlyReturn = (1 + realAnnualReturn) ** (1 / MONTHS_IN_YEAR) - 1;
  const monthlyIncome = Math.max(0, desiredMonthlyIncome);

  if (months === 0 || monthlyIncome === 0) {
    return 0;
  }

  if (Math.abs(realMonthlyReturn) < 0.000001) {
    return monthlyIncome * months;
  }

  return (monthlyIncome * (1 - (1 + realMonthlyReturn) ** -months)) / realMonthlyReturn;
}

function getRequiredMonthlyInvestment(inputs: RetirementInputs, targetCapital: number, years: number) {
  if (targetCapital <= inputs.currentSavings || years <= 0) {
    return 0;
  }

  let low = 0;
  let high = Math.max(inputs.monthlyInvestment, inputs.desiredMonthlyIncome, 10_000);

  while (
    projectCapital(
      inputs.currentSavings,
      high,
      years,
      inputs.annualReturn,
      inputs.contributionGrowthRate,
    ) < targetCapital
  ) {
    high *= 2;

    if (high > 100_000_000) {
      break;
    }
  }

  for (let step = 0; step < 60; step += 1) {
    const middle = (low + high) / 2;
    const capital = projectCapital(
      inputs.currentSavings,
      middle,
      years,
      inputs.annualReturn,
      inputs.contributionGrowthRate,
    );

    if (capital >= targetCapital) {
      high = middle;
    } else {
      low = middle;
    }
  }

  return high;
}

function estimateWithdrawalYears(
  capital: number,
  desiredMonthlyIncome: number,
  yearsToRetirement: number,
  annualReturn: number,
  inflationRate: number,
) {
  let balance = Math.max(0, capital);
  let withdrawal = Math.max(0, desiredMonthlyIncome) * (1 + toRate(inflationRate)) ** yearsToRetirement;
  const monthlyReturn = getMonthlyRateFromAnnual(annualReturn);
  const annualInflation = toRate(inflationRate);
  const maxMonths = MAX_WITHDRAWAL_YEARS * MONTHS_IN_YEAR;

  if (withdrawal === 0) {
    return MAX_WITHDRAWAL_YEARS;
  }

  for (let month = 0; month < maxMonths; month += 1) {
    balance *= 1 + monthlyReturn;
    balance -= withdrawal;

    if (balance <= 0) {
      return (month + 1) / MONTHS_IN_YEAR;
    }

    if ((month + 1) % MONTHS_IN_YEAR === 0) {
      withdrawal *= 1 + annualInflation;
    }
  }

  return MAX_WITHDRAWAL_YEARS;
}

export function calculateRetirementPlan(
  inputs: RetirementInputs,
  currentYear = new Date().getFullYear(),
): RetirementPlan {
  const isBirthYearValid = isBirthYearInRange(inputs.birthYear, currentYear);
  const currentAge = Math.max(0, currentYear - inputs.birthYear);
  const yearsToRetirement = Math.max(0, inputs.retirementAge - currentAge);
  const retirementYears = Math.max(0, inputs.planningAge - inputs.retirementAge);
  const inflationFactor = (1 + toRate(inputs.inflationRate)) ** yearsToRetirement;
  const requiredCapitalToday = getRequiredCapitalToday(
    inputs.desiredMonthlyIncome,
    retirementYears,
    inputs.annualReturn,
    inputs.inflationRate,
  );
  const requiredCapital = requiredCapitalToday * inflationFactor;
  const projectedCapital = projectCapital(
    inputs.currentSavings,
    inputs.monthlyInvestment,
    yearsToRetirement,
    inputs.annualReturn,
    inputs.contributionGrowthRate,
  );
  const projectedCapitalToday = projectedCapital / Math.max(1, inflationFactor);
  const gap = projectedCapital - requiredCapital;
  const requiredMonthlyInvestment = getRequiredMonthlyInvestment(
    inputs,
    requiredCapital,
    yearsToRetirement,
  );
  const moneyLastsYears = estimateWithdrawalYears(
    projectedCapital,
    inputs.desiredMonthlyIncome,
    yearsToRetirement,
    inputs.annualReturn,
    inputs.inflationRate,
  );

  return {
    ageGroup: getAgeGroup(currentAge, inputs.retirementAge),
    currentAge,
    gap,
    isAlreadyRetirementAge: currentAge >= inputs.retirementAge,
    isBirthYearValid,
    isOnTrack: gap >= 0,
    moneyLastsUntilAge: inputs.retirementAge + moneyLastsYears,
    moneyLastsYears,
    projectedCapital,
    projectedCapitalToday,
    requiredCapital,
    requiredCapitalToday,
    requiredMonthlyInvestment,
    retirementYears,
    yearsToRetirement,
  };
}
