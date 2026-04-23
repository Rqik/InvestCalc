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
  const normalizedValue = value.replace(/\s/g, '');

  if (!normalizedValue) {
    return 0;
  }

  if (!/^\d+$/.test(normalizedValue)) {
    return null;
  }

  return Number(normalizedValue);
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

export function pluralize(value: number, one: string, few: string, many: string) {
  const normalized = Math.abs(value) % 100;
  const lastDigit = normalized % 10;

  if (normalized > 10 && normalized < 20) {
    return many;
  }

  if (lastDigit === 1) {
    return one;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }

  return many;
}

export function formatYears(value: number) {
  const rounded = Math.max(0, Math.round(value));

  return `${rounded} ${pluralize(rounded, 'год', 'года', 'лет')}`;
}

export function formatDuration(years: number, months = 0) {
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${pluralize(years, 'год', 'года', 'лет')}`);
  }

  if (months > 0) {
    parts.push(`${months} ${pluralize(months, 'месяц', 'месяца', 'месяцев')}`);
  }

  return parts.length > 0 ? parts.join(' ') : '0 месяцев';
}

export function formatAdditionalYears(years: number) {
  if (years === 0) {
    return 'текущий срок';
  }

  return `срок больше на ${years} ${pluralize(years, 'год', 'года', 'лет')}`;
}
