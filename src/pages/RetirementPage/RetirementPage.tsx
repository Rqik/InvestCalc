import React from 'react';
import { WorkspaceNav } from '@/components/WorkspaceNav';
import { RetirementAdvicePanel } from '@/components/RetirementAdvicePanel';
import { RetirementHero } from '@/components/RetirementHero';
import { RetirementInputPanel } from '@/components/RetirementInputPanel';
import { RetirementResultsGrid } from '@/components/RetirementResultsGrid';
import { RetirementTimeline } from '@/components/RetirementTimeline';
import { DEFAULT_RETIREMENT_INPUTS } from '@/constants/defaults';
import { useRetirementPlan } from '@/hooks/useRetirementPlan';
import { AppLayout } from '@/layouts/AppLayout';
import type { RetirementInputs } from '@/types/retirement';
import type { RetirementPageProps } from './RetirementPage.types';

export function RetirementPage({
  activePage,
  theme,
  onPageChange,
  onThemeToggle,
}: RetirementPageProps) {
  const [inputs, setInputs] = React.useState<RetirementInputs>(DEFAULT_RETIREMENT_INPUTS);
  const plan = useRetirementPlan(inputs);
  const isRetirementPeriodValid = inputs.planningAge > inputs.retirementAge;

  return (
    <AppLayout
      activePage={activePage}
      theme={theme}
      onPageChange={onPageChange}
      onThemeToggle={onThemeToggle}
      hero={<RetirementHero />}
      navigation={<WorkspaceNav isRetirement />}
      controls={(
        <RetirementInputPanel
          inputs={inputs}
          isBirthYearValid={plan.isBirthYearValid}
          isRetirementPeriodValid={isRetirementPeriodValid}
          onChange={setInputs}
          onReset={() => setInputs(DEFAULT_RETIREMENT_INPUTS)}
        />
      )}
      content={(
        <>
          <div id="retirement-results">
            <RetirementResultsGrid inputs={inputs} plan={plan} />
          </div>
          <div id="retirement-timeline">
            <RetirementTimeline inputs={inputs} plan={plan} />
          </div>
          <div id="retirement-advice">
            <RetirementAdvicePanel inputs={inputs} plan={plan} />
          </div>
        </>
      )}
    />
  );
}
