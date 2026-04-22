import React from 'react';
import { RetirementAdvicePanel } from '../components/retirement/RetirementAdvicePanel';
import { RetirementHero } from '../components/retirement/RetirementHero';
import { RetirementInputPanel } from '../components/retirement/RetirementInputPanel';
import { RetirementResultsGrid } from '../components/retirement/RetirementResultsGrid';
import { RetirementTimeline } from '../components/retirement/RetirementTimeline';
import { DEFAULT_RETIREMENT_INPUTS } from '../constants/defaults';
import { useRetirementPlan } from '../hooks/useRetirementPlan';
import { AppLayout } from '../layouts/AppLayout';
import type { AppPage } from '../types/navigation';
import type { RetirementInputs } from '../types/retirement';

type RetirementPageProps = {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
};

export function RetirementPage({ activePage, onPageChange }: RetirementPageProps) {
  const [inputs, setInputs] = React.useState<RetirementInputs>(DEFAULT_RETIREMENT_INPUTS);
  const plan = useRetirementPlan(inputs);
  const isRetirementPeriodValid = inputs.planningAge > inputs.retirementAge;

  return (
    <AppLayout
      hero={<RetirementHero activePage={activePage} onPageChange={onPageChange} />}
      sidebar={
        <RetirementInputPanel
          inputs={inputs}
          isBirthYearValid={plan.isBirthYearValid}
          isRetirementPeriodValid={isRetirementPeriodValid}
          onChange={setInputs}
          onReset={() => setInputs(DEFAULT_RETIREMENT_INPUTS)}
        />
      }
      content={
        <>
          <RetirementResultsGrid inputs={inputs} plan={plan} />
          <RetirementTimeline inputs={inputs} plan={plan} />
          <RetirementAdvicePanel inputs={inputs} plan={plan} />
        </>
      }
    />
  );
}
