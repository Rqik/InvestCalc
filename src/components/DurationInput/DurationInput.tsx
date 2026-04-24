import { NumberInput } from '@/components/NumberInput';
import { MAX_PLAN_YEARS } from '@/constants/limits';
import { normalizeMonths, normalizeYears } from '@/utils/normalize';
import type { DurationInputProps } from './DurationInput.types';
import styles from './DurationInput.module.scss';

export function DurationInput({ years, months, onChange }: DurationInputProps) {
  const handleYearsChange = (nextYears: number) => {
    onChange({
      years: normalizeYears(nextYears),
      months,
    });
  };

  const handleMonthsChange = (nextMonths: number) => {
    onChange({
      years,
      months: normalizeMonths(nextMonths),
    });
  };

  return (
    <div className={styles.durationField}>
      <span className={styles.durationField__label}>Срок</span>
      <div className={styles.durationField__grid}>
        <NumberInput
          label="Годы"
          value={years}
          min={0}
          max={MAX_PLAN_YEARS}
          step={1}
          hint="Полных лет"
          onChange={handleYearsChange}
        />
        <NumberInput
          label="Месяцы"
          value={months}
          min={0}
          max={11}
          step={1}
          hint="От 0 до 11"
          onChange={handleMonthsChange}
        />
      </div>
    </div>
  );
}
