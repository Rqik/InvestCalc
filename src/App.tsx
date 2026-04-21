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
  getRealValue,
  getRequiredAnnualReturn,
  getRequiredMonthlyContribution,
  getTotalInvested,
  getTotalMonths,
} from './utils/calculations';
import { formatDuration, formatMoney, formatPercent } from './utils/format';
import { createScenarioName, loadScenarios, saveScenarios } from './utils/storage';

const VIEW_COPY: Record<
  ViewMode,
  {
    title: string;
    description: string;
  }
> = {
  calculator: {
    title: 'Режим калькулятора',
    description:
      'Здесь удобно быстро оценить итоговый капитал, инфляцию, динамику роста и эффект дополнительных лет.',
  },
  plan: {
    title: 'Режим плана по годам',
    description:
      'Этот режим показывает подробную раскладку накоплений, вложений и прибыли по каждому периоду.',
  },
};

function App() {
  const [inputs, setInputs] = React.useState<Inputs>(DEFAULT_INPUTS);
  const [viewMode, setViewMode] = React.useState<ViewMode>('calculator');
  const [scenarios, setScenarios] = React.useState<Scenario[]>(() => loadScenarios());
  const [scenarioName, setScenarioName] = React.useState(createScenarioName(0));
  const [selectedScenarioId, setSelectedScenarioId] = React.useState<string | null>(null);

  React.useEffect(() => {
    saveScenarios(scenarios);
  }, [scenarios]);

  React.useEffect(() => {
    if (scenarios.length === 0) {
      if (selectedScenarioId !== null) {
        setSelectedScenarioId(null);
      }

      return;
    }

    const hasSelectedScenario =
      selectedScenarioId !== null && scenarios.some((scenario) => scenario.id === selectedScenarioId);

    if (!hasSelectedScenario) {
      setSelectedScenarioId(scenarios[0].id);
    }
  }, [scenarios, selectedScenarioId]);

  const totalMonths = React.useMemo(() => getTotalMonths(inputs), [inputs]);
  const isDurationInvalid = totalMonths <= 0;
  const projectedCapital = React.useMemo(() => getFutureValue(inputs), [inputs]);
  const realProjectedCapital = React.useMemo(
    () => getRealValue(projectedCapital, inputs),
    [inputs, projectedCapital],
  );
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
      inputs: { ...inputs },
      createdAt: new Date().toISOString(),
    };

    setScenarios((current) => [nextScenario, ...current]);
    setSelectedScenarioId(nextScenario.id);
    setScenarioName(createScenarioName(scenarios.length + 1));
  };

  const handleLoadScenario = (scenario: Scenario) => {
    setInputs({ ...DEFAULT_INPUTS, ...scenario.inputs });
    setScenarioName(scenario.name);
    setSelectedScenarioId(scenario.id);
  };

  const handleDeleteScenario = (scenarioId: string) => {
    setScenarios((current) => current.filter((scenario) => scenario.id !== scenarioId));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setScenarioName(createScenarioName(scenarios.length));
  };

  const activeView = VIEW_COPY[viewMode];

  return (
    <main className="app">
      <section className="hero panel">
        <div className="hero__topline">
          <p className="hero__eyebrow">Финансовый калькулятор</p>
          <ViewSwitcher viewMode={viewMode} onChange={setViewMode} />
        </div>

        <h1 className="hero__title">Калькулятор доходности и накоплений</h1>
        <p className="hero__description">
          Считайте цель по капиталу, нужный взнос, инфляцию, рост пополнений и
          сравнивайте сценарии без потери общей картины.
        </p>
      </section>

      <section className="app__layout">
        <div className="app__sidebar">
          <InputPanel
            inputs={inputs}
            isDurationInvalid={isDurationInvalid}
            onChange={setInputs}
            onReset={handleReset}
          />
          <ScenarioPanel
            scenarioName={scenarioName}
            scenarios={scenarios}
            selectedScenarioId={selectedScenarioId}
            onScenarioNameChange={setScenarioName}
            onSave={handleSaveScenario}
            onSelect={setSelectedScenarioId}
            onLoad={handleLoadScenario}
            onDelete={handleDeleteScenario}
          />
        </div>

        <div className="app__content">
          <ResultsGrid
            projectedCapital={projectedCapital}
            realProjectedCapital={realProjectedCapital}
            goalGap={goalGap}
            requiredContribution={requiredContribution}
            requiredReturn={requiredReturn}
            investmentProfit={investmentProfit}
            isDurationInvalid={isDurationInvalid}
          />

          <section className="panel workspace-panel">
            <div className="section-header">
              <h2 className="section-header__title">{activeView.title}</h2>
              <p className="section-header__description">{activeView.description}</p>
            </div>

            <div className="workspace-panel__grid">
              <div className="summary-chip">
                <span className="summary-chip__label">Горизонт</span>
                <strong className="summary-chip__value">
                  {formatDuration(inputs.years, inputs.months)}
                </strong>
              </div>
              <div className="summary-chip">
                <span className="summary-chip__label">Ежемесячный взнос</span>
                <strong className="summary-chip__value">{formatMoney(inputs.monthlyContribution)}</strong>
              </div>
              <div className="summary-chip">
                <span className="summary-chip__label">Инфляция</span>
                <strong className="summary-chip__value">{formatPercent(inputs.inflationRate)}</strong>
              </div>
              <div className="summary-chip">
                <span className="summary-chip__label">Индексация взноса</span>
                <strong className="summary-chip__value">
                  {formatPercent(inputs.contributionGrowthRate)}
                </strong>
              </div>
            </div>
          </section>

          {viewMode === 'calculator' ? (
            <>
              <GrowthChart plan={yearlyPlan} />
              <ExtraYearsPanel extraYears={extraYears} />
            </>
          ) : (
            <YearlyPlanTable
              plan={yearlyPlan}
              targetCapital={inputs.targetCapital}
              projectedCapital={projectedCapital}
              realProjectedCapital={realProjectedCapital}
              goalGap={goalGap}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
