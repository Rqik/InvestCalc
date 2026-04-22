import React from 'react';
import { AppHero } from '../components/AppHero';
import { ExtraYearsPanel } from '../components/ExtraYearsPanel';
import { GrowthChart } from '../components/GrowthChart';
import { HelpPanels } from '../components/HelpPanels';
import { InputPanel } from '../components/InputPanel';
import { ResultsGrid } from '../components/ResultsGrid';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { WorkspaceSummary } from '../components/WorkspaceSummary';
import { WorkspaceNav } from '../components/WorkspaceNav';
import { YearlyPlanTable } from '../components/YearlyPlanTable';
import { DEFAULT_INPUTS } from '../constants/defaults';
import { useFinanceModel } from '../hooks/useFinanceModel';
import { useScenarios } from '../hooks/useScenarios';
import { AppLayout } from '../layouts/AppLayout';
import type { Inputs, ViewMode } from '../types/finance';
import type { AppPage } from '../types/navigation';

type CalculatorPageProps = {
  activePage: AppPage;
  theme: 'dark' | 'light';
  onPageChange: (page: AppPage) => void;
  onThemeToggle: () => void;
};

export function CalculatorPage({
  activePage,
  theme,
  onPageChange,
  onThemeToggle,
}: CalculatorPageProps) {
  const [inputs, setInputs] = React.useState<Inputs>(DEFAULT_INPUTS);
  const [viewMode, setViewMode] = React.useState<ViewMode>('calculator');
  const finance = useFinanceModel(inputs);
  const scenarios = useScenarios(inputs, setInputs);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    scenarios.resetScenarioDraft();
  };

  return (
    <AppLayout
      activePage={activePage}
      theme={theme}
      onPageChange={onPageChange}
      onThemeToggle={onThemeToggle}
      hero={
        <AppHero />
      }
      navigation={<WorkspaceNav viewMode={viewMode} onViewModeChange={setViewMode} />}
      controls={
        <InputPanel
          inputs={inputs}
          isDurationInvalid={finance.isDurationInvalid}
          onChange={setInputs}
          onReset={handleReset}
        />
      }
      content={
        <>
          <ResultsGrid
            projectedCapital={finance.projectedCapital}
            realProjectedCapital={finance.realProjectedCapital}
            goalGap={finance.goalGap}
            requiredContribution={finance.requiredContribution}
            requiredReturn={finance.requiredReturn}
            investmentProfit={finance.investmentProfit}
            isDurationInvalid={finance.isDurationInvalid}
          />

          <WorkspaceSummary inputs={inputs} viewMode={viewMode} />

          <div id="scenarios">
            <ScenarioPanel
              scenarioName={scenarios.scenarioName}
              scenarios={scenarios.scenarios}
              selectedScenarioId={scenarios.selectedScenarioId}
              onScenarioNameChange={scenarios.setScenarioName}
              onSave={scenarios.saveScenario}
              onSelect={scenarios.setSelectedScenarioId}
              onLoad={scenarios.loadScenario}
              onDelete={scenarios.deleteScenario}
            />
          </div>

          {viewMode === 'calculator' ? (
            <>
              <GrowthChart plan={finance.yearlyPlan} />
              <ExtraYearsPanel extraYears={finance.extraYears} />
            </>
          ) : (
            <YearlyPlanTable
              plan={finance.yearlyPlan}
              targetCapital={inputs.targetCapital}
              projectedCapital={finance.projectedCapital}
              realProjectedCapital={finance.realProjectedCapital}
              goalGap={finance.goalGap}
            />
          )}

          <HelpPanels />
        </>
      }
    />
  );
}
