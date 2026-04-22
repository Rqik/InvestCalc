import React from 'react';
import type { RetirementInputs } from '../types/retirement';
import { calculateRetirementPlan } from '../utils/retirement';

export function useRetirementPlan(inputs: RetirementInputs) {
  return React.useMemo(() => calculateRetirementPlan(inputs), [inputs]);
}
