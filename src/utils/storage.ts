import { STORAGE_KEY } from '../constants/defaults';
import type { Scenario } from '../types/finance';

function normalizeScenario(scenario: Scenario): Scenario {
  return {
    ...scenario,
    inputs: {
      ...scenario.inputs,
      months: scenario.inputs.months ?? 0,
    },
  };
}

export function loadScenarios(): Scenario[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Scenario[];
    return Array.isArray(parsed) ? parsed.map(normalizeScenario) : [];
  } catch {
    return [];
  }
}

export function saveScenarios(scenarios: Scenario[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
}

export function createScenarioName(count: number) {
  return `Сценарий ${count + 1}`;
}
