import React from 'react';
import type { Inputs } from '../types/finance';
import {
  buildFinanceSnapshot,
  buildExtraYearProjections,
} from '../utils/calculations';

export function useFinanceModel(inputs: Inputs) {
  return React.useMemo(() => {
    const snapshot = buildFinanceSnapshot(inputs);

    return {
      ...snapshot,
      extraYears: buildExtraYearProjections(inputs, snapshot.projectedCapital),
    };
  }, [inputs]);
}
