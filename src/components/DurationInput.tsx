import type { Inputs } from '../types/finance';
import { normalizeMonths, normalizeYears } from '../utils/normalize';
import { NumberInput } from './NumberInput';

type DurationInputProps = {
  years: number;
  months: number;
  onChange: (duration: Pick<Inputs, 'years' | 'months'>) => void;
};

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
    <div className="duration-field">
      <span className="duration-field__label">Срок</span>
      <div className="duration-field__grid">
        <NumberInput
          label="Годы"
          value={years}
          min={0}
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
