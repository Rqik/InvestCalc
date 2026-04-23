import {
  MAX_MONEY,
  MAX_PLAN_YEARS,
  MAX_PLANNING_AGE,
  MAX_RATE_PERCENT,
  MAX_RETIREMENT_AGE,
  MIN_RETIREMENT_AGE,
} from '../constants/limits';
import { getBirthYearRange } from './age';

export function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

export function normalizeInteger(value: number, min: number, max: number) {
  return Math.trunc(clampNumber(value, min, max));
}

export function normalizeMoney(value: number) {
  return normalizeInteger(value, 0, MAX_MONEY);
}

export function normalizeYears(value: number) {
  return normalizeInteger(value, 0, MAX_PLAN_YEARS);
}

export function normalizeMonths(value: number) {
  return normalizeInteger(value, 0, 11);
}

export function normalizeAnnualReturn(value: number) {
  return clampNumber(value, 0, MAX_RATE_PERCENT);
}

export function normalizeBirthYear(value: number, currentYear = new Date().getFullYear()) {
  const range = getBirthYearRange(currentYear);

  return normalizeInteger(value, range.min, range.max);
}

export function normalizeRetirementAge(value: number) {
  return normalizeInteger(value, MIN_RETIREMENT_AGE, MAX_RETIREMENT_AGE);
}

export function normalizePlanningAge(value: number) {
  return normalizeInteger(value, MIN_RETIREMENT_AGE, MAX_PLANNING_AGE);
}
