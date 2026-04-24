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
import styles from './RetirementPage.module.scss';

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
          <div id="retirement-results" className={styles.retirementPage__section}>
            <RetirementResultsGrid inputs={inputs} plan={plan} />
          </div>
          <div id="retirement-timeline" className={styles.retirementPage__section}>
            <RetirementTimeline inputs={inputs} plan={plan} />
          </div>
          <div id="retirement-advice" className={styles.retirementPage__section}>
            <RetirementAdvicePanel inputs={inputs} plan={plan} />
          </div>
        </>
      )}
    />
  );
}
