import { MAX_PERSON_AGE } from '@/constants/limits';

export function getBirthYearRange(currentYear = new Date().getFullYear()) {
  return {
    min: currentYear - MAX_PERSON_AGE,
    max: currentYear,
  };
}

export function isBirthYearInRange(birthYear: number, currentYear = new Date().getFullYear()) {
  const range = getBirthYearRange(currentYear);

  return birthYear >= range.min && birthYear <= range.max;
}
