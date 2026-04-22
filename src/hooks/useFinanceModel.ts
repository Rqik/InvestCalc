import React from 'react';
import type { Inputs } from '../types/finance';
import {
  buildExtraYearProjections,
  buildYearlyPlan,
  getFutureValue,
  getRealValue,
  getRequiredAnnualReturn,
  getRequiredMonthlyContribution,
  getTotalInvested,
  getTotalMonths,
} from '../utils/calculations';

export function useFinanceModel(inputs: Inputs) {
  const totalMonths = React.useMemo(() => getTotalMonths(inputs), [inputs]);
  const isDurationInvalid = totalMonths <= 0;
  const projectedCapital = React.useMemo(() => getFutureValue(inputs), [inputs]);
  const realProjectedCapital = React.useMemo(
    () => getRealValue(projectedCapital, inputs),
    [inputs, projectedCapital],
  );
  const requiredContribution = React.useMemo(
    () => getRequiredMonthlyContribution(inputs),
    [inputs],
  );
  const requiredReturn = React.useMemo(() => getRequiredAnnualReturn(inputs), [inputs]);
  const yearlyPlan = React.useMemo(() => buildYearlyPlan(inputs), [inputs]);
  const totalInvested = React.useMemo(() => getTotalInvested(inputs), [inputs]);
  const investmentProfit = projectedCapital - totalInvested;
  const goalGap = projectedCapital - inputs.targetCapital;
  const extraYears = React.useMemo(
    () => buildExtraYearProjections(inputs, projectedCapital),
    [inputs, projectedCapital],
  );

  return {
    extraYears,
    goalGap,
    investmentProfit,
    isDurationInvalid,
    projectedCapital,
    realProjectedCapital,
    requiredContribution,
    requiredReturn,
    totalInvested,
    totalMonths,
    yearlyPlan,
  };
}
