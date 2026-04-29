import React from 'react';
import { AppHero } from '@/components/AppHero';
import { ExtraYearsPanel } from '@/components/ExtraYearsPanel';
import { GrowthChart } from '@/components/GrowthChart';
import { HelpPanels } from '@/components/HelpPanels';
import { InputPanel } from '@/components/InputPanel';
import { ResultsGrid } from '@/components/ResultsGrid';
import { ScenarioPanel } from '@/components/ScenarioPanel';
import { WorkspaceSummary } from '@/components/WorkspaceSummary';
import { WorkspaceNav } from '@/components/WorkspaceNav';
import { YearlyPlanTable } from '@/components/YearlyPlanTable';
import { DEFAULT_INPUTS } from '@/constants/defaults';
import { useFinanceModel } from '@/hooks/useFinanceModel';
import { useScenarios } from '@/hooks/useScenarios';
import { AppLayout } from '@/layouts/AppLayout';
import { cn } from '@/lib/utils';
import type { Inputs } from '@/types/finance';
import type { CalculatorPageProps } from './CalculatorPage.types';
import styles from './CalculatorPage.module.scss';

export function CalculatorPage({
  activePage,
  theme,
  onPageChange,
  onThemeToggle,
}: CalculatorPageProps) {
  const [inputs, setInputs] = React.useState<Inputs>(DEFAULT_INPUTS);
  const finance = useFinanceModel(inputs);
  const scenarios = useScenarios(inputs, setInputs);
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const growthChartRef = React.useRef<HTMLDivElement>(null);
  const scenariosRef = React.useRef<HTMLDivElement>(null);
  const yearlyPlanRef = React.useRef<HTMLDivElement>(null);
  const methodologyRef = React.useRef<HTMLElement>(null);
  const examplesRef = React.useRef<HTMLElement>(null);
  const faqRef = React.useRef<HTMLElement>(null);
  const helpPanelRefs = React.useMemo(
    () => ({
      methodology: methodologyRef,
      examples: examplesRef,
      faq: faqRef,
    }),
    [],
  );
  const sectionRefs = React.useMemo(
    () => ({
      results: resultsRef,
      'growth-chart': growthChartRef,
      scenarios: scenariosRef,
      'yearly-plan': yearlyPlanRef,
      methodology: methodologyRef,
      examples: examplesRef,
      faq: faqRef,
    }),
    [],
  );

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    scenarios.resetScenarioDraft();
  };

  const handleApplyExample = (nextInputs: Inputs) => {
    setInputs(nextInputs);
    scenarios.resetScenarioDraft();
  };

  return (
    <AppLayout
      activePage={activePage}
      theme={theme}
      onPageChange={onPageChange}
      onThemeToggle={onThemeToggle}
      hero={<AppHero />}
      navigation={<WorkspaceNav sectionRefs={sectionRefs} />}
      controls={(
        <InputPanel
          inputs={inputs}
          isDurationInvalid={finance.isDurationInvalid}
          onChange={setInputs}
          onReset={handleReset}
        />
      )}
      content={(
        <>
          <div ref={resultsRef} className={styles.calculatorPage__section}>
            <ResultsGrid
              projectedCapital={finance.projectedCapital}
              realProjectedCapital={finance.realProjectedCapital}
              goalGap={finance.goalGap}
              requiredContribution={finance.requiredContribution}
              requiredReturn={finance.requiredReturn}
              investmentProfit={finance.investmentProfit}
              isDurationInvalid={finance.isDurationInvalid}
            />
          </div>

          <div ref={growthChartRef} className={styles.calculatorPage__section}>
            <GrowthChart plan={finance.yearlyPlan} inflationRate={inputs.inflationRate} />
          </div>

          <WorkspaceSummary inputs={inputs} />

          <ExtraYearsPanel extraYears={finance.extraYears} />

          <div ref={scenariosRef} className={styles.calculatorPage__section}>
            <ScenarioPanel
              scenarioName={scenarios.scenarioName}
              scenarios={scenarios.scenarios}
              selectedScenarioId={scenarios.selectedScenarioId}
              storageError={scenarios.storageError}
              onScenarioNameChange={scenarios.setScenarioName}
              onSave={scenarios.saveScenario}
              onSelect={scenarios.setSelectedScenarioId}
              onLoad={scenarios.loadScenario}
              onDelete={scenarios.deleteScenario}
            />
          </div>

          <div
            ref={yearlyPlanRef}
            className={cn(
              styles.calculatorPage__section,
              styles['calculatorPage__section--scrollBoundary'],
            )}
          >
            <YearlyPlanTable
              plan={finance.yearlyPlan}
              targetCapital={inputs.targetCapital}
              projectedCapital={finance.projectedCapital}
              realProjectedCapital={finance.realProjectedCapital}
              goalGap={finance.goalGap}
            />
          </div>

          <HelpPanels
            inputs={inputs}
            snapshot={finance}
            onApplyExample={handleApplyExample}
            sectionRefs={helpPanelRefs}
          />
        </>
      )}
    />
  );
}
