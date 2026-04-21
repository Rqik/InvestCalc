export function normalizeMoney(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.trunc(value));
}

export function normalizeYears(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.trunc(value));
}

export function normalizeMonths(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(0, Math.trunc(value)), 11);
}

export function normalizeAnnualReturn(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, value);
}
