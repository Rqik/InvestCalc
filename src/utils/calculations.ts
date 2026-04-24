import {
  EXTRA_YEARS_TO_COMPARE,
  MONTHS_IN_YEAR,
} from '@/constants/defaults';
import type {
  ExtraYearProjection,
  FinanceSnapshot,
  Inputs,
  YearRow,
} from '@/types/finance';
import { formatDuration } from './format';
import {
  getIndexedContribution,
  getMonthlyRateFromAnnual,
  projectMonthlyBalance,
} from './projection';

function buildFibonacciLikeOffsets(count: number) {
  const offsets = [0];

  if (count <= 1) {
    return offsets;
  }

  let previous = 1;
  let current = 2;

  while (offsets.length < count) {
    offsets.push(previous);
    [previous, current] = [current, previous + current];
  }

  return offsets;
}

export function getMonthlyRate(annualReturn: number) {
  return getMonthlyRateFromAnnual(annualReturn);
}

export function getMonthlyInflationRate(inflationRate: number) {
  return inflationRate / 100 / MONTHS_IN_YEAR;
}

export function getTotalMonths(inputs: Inputs) {
  return inputs.years * MONTHS_IN_YEAR + (inputs.months ?? 0);
}

export function getNormalizedDuration(totalMonths: number) {
  return {
    years: Math.floor(totalMonths / MONTHS_IN_YEAR),
    months: totalMonths % MONTHS_IN_YEAR,
  };
}

export function getRealValue(value: number, inputs: Inputs) {
  const totalMonths = getTotalMonths(inputs);
  const monthlyInflationRate = getMonthlyInflationRate(inputs.inflationRate ?? 0);

  if (monthlyInflationRate === 0 || totalMonths <= 0) {
    return value;
  }

  return value / Math.pow(1 + monthlyInflationRate, totalMonths);
}

export function getFutureValue(inputs: Inputs) {
  return projectMonthlyBalance({
    initialCapital: inputs.initialCapital,
    monthlyContribution: inputs.monthlyContribution,
    totalMonths: getTotalMonths(inputs),
    annualReturn: inputs.annualReturn,
    contributionGrowthRate: inputs.contributionGrowthRate ?? 0,
  });
}

export function getTotalInvested(inputs: Inputs) {
  const totalMonths = getTotalMonths(inputs);
  let totalInvested = inputs.initialCapital;

  for (let month = 0; month < totalMonths; month += 1) {
    totalInvested += getIndexedContribution(
      inputs.monthlyContribution,
      inputs.contributionGrowthRate ?? 0,
      month,
    );
  }

  return totalInvested;
}

export function getRequiredMonthlyContribution(inputs: Inputs) {
  const totalMonths = getTotalMonths(inputs);

  if (totalMonths <= 0) {
    return 0;
  }

  const futureInitial = getFutureValue({ ...inputs, monthlyContribution: 0 });
  const contributionCoefficient = getFutureValue({
    ...inputs,
    initialCapital: 0,
    monthlyContribution: 1,
  });

  if (contributionCoefficient <= 0) {
    return 0;
  }

  return Math.max((inputs.targetCapital - futureInitial) / contributionCoefficient, 0);
}

export function getRequiredAnnualReturn(inputs: Inputs) {
  const totalMonths = getTotalMonths(inputs);
  const tolerance = 0.5;
  let low = 0;
  let high = 100;

  if (totalMonths <= 0) {
    return 0;
  }

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

export function buildFinanceSnapshot(inputs: Inputs): FinanceSnapshot {
  const totalMonths = getTotalMonths(inputs);
  const isDurationInvalid = totalMonths <= 0;
  const projectedCapital = getFutureValue(inputs);
  const realProjectedCapital = getRealValue(projectedCapital, inputs);
  const requiredContribution = getRequiredMonthlyContribution(inputs);
  const requiredReturn = getRequiredAnnualReturn(inputs);
  const yearlyPlan = buildYearlyPlan(inputs);
  const totalInvested = getTotalInvested(inputs);
  const investmentProfit = projectedCapital - totalInvested;
  const goalGap = projectedCapital - inputs.targetCapital;

  return {
    totalMonths,
    isDurationInvalid,
    projectedCapital,
    realProjectedCapital,
    requiredContribution,
    requiredReturn,
    totalInvested,
    investmentProfit,
    goalGap,
    yearlyPlan,
  };
}

export function buildYearlyPlan(inputs: Inputs): YearRow[] {
  const plan: YearRow[] = [];
  let balance = inputs.initialCapital;
  let totalInvested = inputs.initialCapital;
  let realTotalInvested = inputs.initialCapital;
  const monthlyRate = getMonthlyRate(inputs.annualReturn);
  const monthlyInflationRate = getMonthlyInflationRate(inputs.inflationRate ?? 0);
  const totalMonths = getTotalMonths(inputs);
  const rowCount = Math.ceil(totalMonths / MONTHS_IN_YEAR);

  for (let year = 1; year <= rowCount; year += 1) {
    const startBalance = balance;
    let contributions = 0;
    const monthsBeforePeriod = (year - 1) * MONTHS_IN_YEAR;
    const monthsInPeriod = Math.min(MONTHS_IN_YEAR, totalMonths - monthsBeforePeriod);

    for (let month = 0; month < monthsInPeriod; month += 1) {
      const monthIndex = monthsBeforePeriod + month;
      const contribution = getIndexedContribution(
        inputs.monthlyContribution,
        inputs.contributionGrowthRate ?? 0,
        monthIndex,
      );

      balance *= 1 + monthlyRate;
      balance += contribution;
      contributions += contribution;
      totalInvested += contribution;
      realTotalInvested +=
        monthlyInflationRate === 0
          ? contribution
          : contribution / Math.pow(1 + monthlyInflationRate, monthIndex + 1);
    }

    const duration = getNormalizedDuration(monthsBeforePeriod + monthsInPeriod);
    const realEndBalance =
      monthlyInflationRate === 0
        ? balance
        : balance / Math.pow(1 + monthlyInflationRate, monthsBeforePeriod + monthsInPeriod);

    plan.push({
      year,
      label: monthsInPeriod === MONTHS_IN_YEAR ? `${year} год` : formatDuration(duration.years, duration.months),
      monthsInPeriod,
      startBalance,
      contributions,
      totalInvested,
      realTotalInvested,
      growth: balance - startBalance - contributions,
      profit: balance - totalInvested,
      endBalance: balance,
      realEndBalance,
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
  const offsets = buildFibonacciLikeOffsets(extraYearsCount);
  const baseTotalMonths = getTotalMonths(inputs);

  return offsets.map((additionalYears) => {
    const totalMonths = baseTotalMonths + additionalYears * MONTHS_IN_YEAR;
    const { years, months } = getNormalizedDuration(totalMonths);
    const projected = getFutureValue({ ...inputs, years, months });
    const totalInvested = getTotalInvested({ ...inputs, years, months });

    return {
      years,
      months,
      additionalYears,
      finalCapital: projected,
      additionalCapital: projected - baseProjectedCapital,
      additionalGrowth: (projected - totalInvested) - (baseProjectedCapital - baseInvested),
    };
  });
}
