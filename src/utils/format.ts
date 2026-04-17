export function formatMoney(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatInputNumber(value: number) {
  if (!Number.isFinite(value)) {
    return '';
  }

  return formatNumber(Math.max(0, Math.trunc(value)));
}

export function parseFormattedNumber(value: string) {
  const digitsOnly = value.replace(/[^\d]/g, '');
  if (!digitsOnly) {
    return 0;
  }

  return Number(digitsOnly);
}

export function formatPercent(value: number) {
  return `${value.toFixed(2)}% годовых`;
}

export function formatScenarioDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}
