import { DEFAULT_INPUTS, STORAGE_KEY } from '../constants/defaults';
import { MAX_SCENARIO_NAME_LENGTH, MAX_SCENARIOS } from '../constants/limits';
import type { Scenario } from '../types/finance';
import {
  normalizeAnnualReturn,
  normalizeMoney,
  normalizeMonths,
  normalizeYears,
} from './normalize';

export type LoadScenariosResult = {
  canPersist: boolean;
  scenarios: Scenario[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(value: unknown, fallback: string) {
  return typeof value === 'string' ? value : fallback;
}

function readNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function normalizeScenarioName(value: unknown, fallback: string) {
  const normalizedName = readString(value, fallback).trim();

  return (normalizedName || fallback).slice(0, MAX_SCENARIO_NAME_LENGTH);
}

function normalizeDate(value: unknown) {
  const dateValue = readString(value, '');
  const timestamp = Date.parse(dateValue);

  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : new Date().toISOString();
}

function normalizeScenario(value: unknown, index: number): Scenario | null {
  if (!isRecord(value) || !isRecord(value.inputs)) {
    return null;
  }

  const rawInputs = value.inputs;

  return {
    id: normalizeScenarioName(value.id, `${Date.now()}-${index}`),
    name: normalizeScenarioName(value.name, createScenarioName(index)),
    createdAt: normalizeDate(value.createdAt),
    inputs: {
      ...DEFAULT_INPUTS,
      targetCapital: normalizeMoney(readNumber(rawInputs.targetCapital, DEFAULT_INPUTS.targetCapital)),
      initialCapital: normalizeMoney(readNumber(rawInputs.initialCapital, DEFAULT_INPUTS.initialCapital)),
      monthlyContribution: normalizeMoney(
        readNumber(rawInputs.monthlyContribution, DEFAULT_INPUTS.monthlyContribution),
      ),
      years: normalizeYears(readNumber(rawInputs.years, DEFAULT_INPUTS.years)),
      months: normalizeMonths(readNumber(rawInputs.months, DEFAULT_INPUTS.months)),
      annualReturn: normalizeAnnualReturn(
        readNumber(rawInputs.annualReturn, DEFAULT_INPUTS.annualReturn),
      ),
      inflationRate: normalizeAnnualReturn(
        readNumber(rawInputs.inflationRate, DEFAULT_INPUTS.inflationRate),
      ),
      contributionGrowthRate: normalizeAnnualReturn(
        readNumber(rawInputs.contributionGrowthRate, DEFAULT_INPUTS.contributionGrowthRate),
      ),
    },
  };
}

export function loadScenarios(): LoadScenariosResult {
  if (typeof window === 'undefined') {
    return { canPersist: false, scenarios: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { canPersist: true, scenarios: [] };
    }

    const parsed = JSON.parse(raw) as unknown;
    const scenarios = Array.isArray(parsed)
      ? parsed
          .map((scenario, index) => normalizeScenario(scenario, index))
          .filter((scenario): scenario is Scenario => scenario !== null)
          .slice(0, MAX_SCENARIOS)
      : [];

    return { canPersist: true, scenarios };
  } catch {
    return { canPersist: false, scenarios: [] };
  }
}

export function saveScenarios(scenarios: Scenario[]) {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios.slice(0, MAX_SCENARIOS)));
    return true;
  } catch {
    return false;
  }
}

export function createScenarioName(count: number) {
  return `Сценарий ${count + 1}`;
}
