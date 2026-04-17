import {
  EXTRA_YEARS_TO_COMPARE,
  MONTHS_IN_YEAR,
} from '../constants/defaults';
import type { ExtraYearProjection, Inputs, YearRow } from '../types/finance';

export function getMonthlyRate(annualReturn: number) {
  return annualReturn / 100 / MONTHS_IN_YEAR;
}

export function getFutureValue({
  initialCapital,
  monthlyContribution,
  years,
  annualReturn,
}: Inputs) {
  const totalMonths = years * MONTHS_IN_YEAR;
  const monthlyRate = getMonthlyRate(annualReturn);

  if (monthlyRate === 0) {
    return initialCapital + monthlyContribution * totalMonths;
  }

  const growth = Math.pow(1 + monthlyRate, totalMonths);
  const investedInitial = initialCapital * growth;
  const investedMonthly = monthlyContribution * ((growth - 1) / monthlyRate);

  return investedInitial + investedMonthly;
}

export function getTotalInvested(inputs: Inputs) {
  return inputs.initialCapital + inputs.monthlyContribution * inputs.years * MONTHS_IN_YEAR;
}

export function getRequiredMonthlyContribution(inputs: Inputs) {
  const { targetCapital, initialCapital, years, annualReturn } = inputs;
  const totalMonths = years * MONTHS_IN_YEAR;
  const monthlyRate = getMonthlyRate(annualReturn);

  if (totalMonths <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return Math.max((targetCapital - initialCapital) / totalMonths, 0);
  }

  const growth = Math.pow(1 + monthlyRate, totalMonths);
  const futureInitial = initialCapital * growth;
  const annuityFactor = (growth - 1) / monthlyRate;

  if (annuityFactor <= 0) {
    return 0;
  }

  return Math.max((targetCapital - futureInitial) / annuityFactor, 0);
}

export function getRequiredAnnualReturn(inputs: Inputs) {
  const tolerance = 0.5;
  let low = 0;
  let high = 100;

  if (getFutureValue({ ...inputs, annualReturn: low }) >= inputs.targetCapital) {
    return 0;
  }

  if (getFutureValue({ ...inputs, annualReturn: high }) < inputs.targetCapital) {
    return null;
  }

  for (let iteration = 0; iteration < 60; iteration += 1) {
    const middle = (low + high) / 2;
    const futureValue = getFutureValue({ ...inputs, annualReturn: middle });

    if (Math.abs(futureValue - inputs.targetCapital) <= tolerance) {
      return middle;
    }

    if (futureValue < inputs.targetCapital) {
      low = middle;
    } else {
      high = middle;
    }
  }

  return (low + high) / 2;
}

export function buildYearlyPlan(inputs: Inputs): YearRow[] {
  const plan: YearRow[] = [];
  let balance = inputs.initialCapital;
  const monthlyRate = getMonthlyRate(inputs.annualReturn);

  for (let year = 1; year <= inputs.years; year += 1) {
    const startBalance = balance;
    let contributions = 0;

    for (let month = 0; month < MONTHS_IN_YEAR; month += 1) {
      balance *= 1 + monthlyRate;
      balance += inputs.monthlyContribution;
      contributions += inputs.monthlyContribution;
    }

    plan.push({
      year,
      startBalance,
      contributions,
      growth: balance - startBalance - contributions,
      endBalance: balance,
    });
  }

  return plan;
}

export function buildExtraYearProjections(
  inputs: Inputs,
  baseProjectedCapital: number,
  extraYearsCount = EXTRA_YEARS_TO_COMPARE,
): ExtraYearProjection[] {
  const baseInvested = getTotalInvested(inputs);

  return Array.from({ length: extraYearsCount }, (_, index) => {
    const years = inputs.years + index + 1;
    const projected = getFutureValue({ ...inputs, years });
    const totalInvested = inputs.initialCapital + inputs.monthlyContribution * years * MONTHS_IN_YEAR;

    return {
      years,
      finalCapital: projected,
      additionalCapital: projected - baseProjectedCapital,
      additionalGrowth: (projected - totalInvested) - (baseProjectedCapital - baseInvested),
    };
  });
}
