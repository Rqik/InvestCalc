import React from 'react';
import { ExtraYearsPanel } from './components/ExtraYearsPanel';
import { GrowthChart } from './components/GrowthChart';
import { InputPanel } from './components/InputPanel';
import { ResultsGrid } from './components/ResultsGrid';
import { ScenarioPanel } from './components/ScenarioPanel';
import { ViewSwitcher } from './components/ViewSwitcher';
import { YearlyPlanTable } from './components/YearlyPlanTable';
import { DEFAULT_INPUTS } from './constants/defaults';
import type { Inputs, Scenario, ViewMode } from './types/finance';
import {
  buildExtraYearProjections,
  buildYearlyPlan,
  getFutureValue,
  getRequiredAnnualReturn,
  getRequiredMonthlyContribution,
  getTotalInvested,
} from './utils/calculations';
import { createScenarioName, loadScenarios, saveScenarios } from './utils/storage';

function App() {
  const [inputs, setInputs] = React.useState<Inputs>(DEFAULT_INPUTS);
  const [viewMode, setViewMode] = React.useState<ViewMode>('calculator');
  const [scenarios, setScenarios] = React.useState<Scenario[]>(() => loadScenarios());
  const [scenarioName, setScenarioName] = React.useState(createScenarioName(0));

  React.useEffect(() => {
    saveScenarios(scenarios);
  }, [scenarios]);

  const projectedCapital = React.useMemo(() => getFutureValue(inputs), [inputs]);
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

  const handleSaveScenario = () => {
    const normalizedName = scenarioName.trim() || createScenarioName(scenarios.length);
    const nextScenario: Scenario = {
      id: `${Date.now()}`,
      name: normalizedName,
      inputs,
      createdAt: new Date().toISOString(),
    };

    setScenarios((current) => [nextScenario, ...current]);
    setScenarioName(createScenarioName(scenarios.length + 1));
  };

  const handleLoadScenario = (scenario: Scenario) => {
    setInputs(scenario.inputs);
    setScenarioName(scenario.name);
  };

  const handleDeleteScenario = (scenarioId: string) => {
    setScenarios((current) => current.filter((scenario) => scenario.id !== scenarioId));
  };

  return (
    <main className="app">
      <section className="hero panel">
        <div className="hero__topline">
          <p className="hero__eyebrow">Финансовый калькулятор</p>
          <ViewSwitcher viewMode={viewMode} onChange={setViewMode} />
        </div>

        <h1 className="hero__title">Калькулятор доходности и накоплений</h1>
        <p className="hero__description">
          Считайте цель по капиталу, нужный взнос, график роста и разницу, если
          дать инвестициям поработать еще несколько лет.
        </p>
      </section>

      <section className="app__layout">
        <div className="app__sidebar">
          <InputPanel inputs={inputs} onChange={setInputs} />
          <ScenarioPanel
            scenarioName={scenarioName}
            scenarios={scenarios}
            onScenarioNameChange={setScenarioName}
            onSave={handleSaveScenario}
            onLoad={handleLoadScenario}
            onDelete={handleDeleteScenario}
          />
        </div>

        <div className="app__content">
          <ResultsGrid
            projectedCapital={projectedCapital}
            goalGap={goalGap}
            requiredContribution={requiredContribution}
            requiredReturn={requiredReturn}
            investmentProfit={investmentProfit}
          />
          <GrowthChart plan={yearlyPlan} />
          <ExtraYearsPanel extraYears={extraYears} />
          {viewMode === 'plan' && (
            <YearlyPlanTable
              plan={yearlyPlan}
              targetCapital={inputs.targetCapital}
              projectedCapital={projectedCapital}
              goalGap={goalGap}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
