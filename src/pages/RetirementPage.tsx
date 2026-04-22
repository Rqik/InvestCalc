import React from 'react';
import { RetirementAdvicePanel } from '../components/retirement/RetirementAdvicePanel';
import { RetirementHero } from '../components/retirement/RetirementHero';
import { RetirementInputPanel } from '../components/retirement/RetirementInputPanel';
import { RetirementResultsGrid } from '../components/retirement/RetirementResultsGrid';
import { RetirementTimeline } from '../components/retirement/RetirementTimeline';
import { WorkspaceNav } from '../components/WorkspaceNav';
import { DEFAULT_RETIREMENT_INPUTS } from '../constants/defaults';
import { useRetirementPlan } from '../hooks/useRetirementPlan';
import { AppLayout } from '../layouts/AppLayout';
import type { AppPage } from '../types/navigation';
import type { RetirementInputs } from '../types/retirement';

type RetirementPageProps = {
  activePage: AppPage;
  theme: 'dark' | 'light';
  onPageChange: (page: AppPage) => void;
  onThemeToggle: () => void;
};

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
      navigation={<WorkspaceNav />}
      controls={
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
      }
    />
  );
}
