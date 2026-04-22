import React from 'react';
import { DEFAULT_INPUTS } from '../constants/defaults';
import type { Inputs, Scenario } from '../types/finance';
import { createScenarioName, loadScenarios, saveScenarios } from '../utils/storage';

export function useScenarios(inputs: Inputs, onInputsChange: (inputs: Inputs) => void) {
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
      selectedScenarioId !== null &&
      scenarios.some((scenario) => scenario.id === selectedScenarioId);

    if (!hasSelectedScenario) {
      setSelectedScenarioId(scenarios[0].id);
    }
  }, [scenarios, selectedScenarioId]);

  const saveScenario = () => {
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

  const loadScenario = (scenario: Scenario) => {
    onInputsChange({ ...DEFAULT_INPUTS, ...scenario.inputs });
    setScenarioName(scenario.name);
    setSelectedScenarioId(scenario.id);
  };

  const deleteScenario = (scenarioId: string) => {
    setScenarios((current) => current.filter((scenario) => scenario.id !== scenarioId));
  };

  const resetScenarioDraft = () => {
    setScenarioName(createScenarioName(scenarios.length));
  };

  return {
    deleteScenario,
    loadScenario,
    resetScenarioDraft,
    saveScenario,
    scenarioName,
    scenarios,
    selectedScenarioId,
    setScenarioName,
    setSelectedScenarioId,
  };
}
