import React from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import type { NumberInputProps } from './NumberInput.types';
import styles from './NumberInput.module.scss';

function formatNumberValue(value: number) {
  return Number.isFinite(value) ? String(value) : '';
}

function clampValue(value: number, min?: number, max?: number) {
  const lowerBound = min ?? Number.NEGATIVE_INFINITY;
  const upperBound = max ?? Number.POSITIVE_INFINITY;

  return Math.min(Math.max(value, lowerBound), upperBound);
}

export function NumberInput({
  label,
  value,
  min,
  max,
  step,
  hint,
  onChange,
}: NumberInputProps) {
  const [draftValue, setDraftValue] = React.useState(() => formatNumberValue(value));

  React.useEffect(() => {
    setDraftValue(formatNumberValue(value));
  }, [value]);

  const commitValue = (nextValue: string) => {
    if (nextValue.trim() === '') {
      const fallbackValue = min ?? 0;
      setDraftValue(formatNumberValue(fallbackValue));
      onChange(fallbackValue);
      return;
    }

    const parsedValue = Number(nextValue);

    if (!Number.isFinite(parsedValue)) {
      setDraftValue(formatNumberValue(value));
      return;
    }

    const clampedValue = clampValue(parsedValue, min, max);

    setDraftValue(formatNumberValue(clampedValue));
    onChange(clampedValue);
  };

  return (
    <Label className={styles.formField}>
      <span className={styles.formField__label}>{label}</span>
      <Input
        className={styles.formField__input}
        type="number"
        min={min}
        max={max}
        step={step}
        value={draftValue}
        onChange={(event) => {
          const nextValue = event.target.value;
          setDraftValue(nextValue);

          if (nextValue.trim() === '') {
            return;
          }

          const parsedValue = Number(nextValue);

          if (Number.isFinite(parsedValue)) {
            onChange(clampValue(parsedValue, min, max));
          }
        }}
        onBlur={(event) => commitValue(event.target.value)}
      />
      <small className={styles.formField__hint}>{hint}</small>
    </Label>
  );
}
