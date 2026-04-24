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
import type { Inputs } from '@/types/finance';
import type { CalculatorPageProps } from './CalculatorPage.types';

export function CalculatorPage({
  activePage,
  theme,
  onPageChange,
  onThemeToggle,
}: CalculatorPageProps) {
  const [inputs, setInputs] = React.useState<Inputs>(DEFAULT_INPUTS);
  const finance = useFinanceModel(inputs);
  const scenarios = useScenarios(inputs, setInputs);

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
      navigation={<WorkspaceNav />}
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
          <div id="results">
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

          <div id="growth-chart">
            <GrowthChart plan={finance.yearlyPlan} inflationRate={inputs.inflationRate} />
          </div>

          <WorkspaceSummary inputs={inputs} />

          <ExtraYearsPanel extraYears={finance.extraYears} />

          <div id="scenarios">
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

          <div id="yearly-plan">
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
          />
        </>
      )}
    />
  );
}
