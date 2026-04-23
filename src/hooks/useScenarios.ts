import React from 'react';
import { DEFAULT_INPUTS } from '../constants/defaults';
import { MAX_SCENARIO_NAME_LENGTH, MAX_SCENARIOS } from '../constants/limits';
import type { Inputs, Scenario } from '../types/finance';
import { createScenarioName, loadScenarios, saveScenarios } from '../utils/storage';

export function useScenarios(inputs: Inputs, onInputsChange: (inputs: Inputs) => void) {
  const initialLoadRef = React.useRef<ReturnType<typeof loadScenarios> | null>(null);

  if (initialLoadRef.current === null) {
    initialLoadRef.current = loadScenarios();
  }

  const [scenarios, setScenarios] = React.useState<Scenario[]>(() => initialLoadRef.current!.scenarios);
  const [scenarioName, setScenarioName] = React.useState(createScenarioName(0));
  const [selectedScenarioId, setSelectedScenarioId] = React.useState<string | null>(null);
  const [canPersistScenarios, setCanPersistScenarios] = React.useState(
    () => initialLoadRef.current!.canPersist,
  );
  const [storageError, setStorageError] = React.useState<string | null>(
    initialLoadRef.current!.canPersist
      ? null
      : 'Не удалось прочитать сохраненные сценарии. Новые изменения пока не будут перезаписаны поверх старых данных.',
  );

  React.useEffect(() => {
    if (!canPersistScenarios) {
      return;
    }

    const didSave = saveScenarios(scenarios);

    if (!didSave) {
      setStorageError('Не удалось сохранить сценарии. Проверьте доступность хранилища браузера.');
    }
  }, [canPersistScenarios, scenarios]);

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
    const normalizedName = (scenarioName.trim() || createScenarioName(scenarios.length)).slice(
      0,
      MAX_SCENARIO_NAME_LENGTH,
    );
    const nextScenario: Scenario = {
      id: `${Date.now()}`,
      name: normalizedName,
      inputs: { ...inputs },
      createdAt: new Date().toISOString(),
    };

    setCanPersistScenarios(true);
    setStorageError(null);
    setScenarios((current) => [nextScenario, ...current].slice(0, MAX_SCENARIOS));
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

  const changeScenarioName = (value: string) => {
    setScenarioName(value.slice(0, MAX_SCENARIO_NAME_LENGTH));
  };

  return {
    deleteScenario,
    loadScenario,
    resetScenarioDraft,
    saveScenario,
    scenarioName,
    scenarios,
    selectedScenarioId,
    setScenarioName: changeScenarioName,
    setSelectedScenarioId,
    storageError,
  };
}
