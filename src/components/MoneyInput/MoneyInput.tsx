import React from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatInputNumber, parseFormattedNumber } from '@/utils/format';
import type { MoneyInputProps } from './MoneyInput.types';
import styles from './MoneyInput.module.scss';

export function MoneyInput({ label, value, hint, onChange }: MoneyInputProps) {
  const [draftValue, setDraftValue] = React.useState(() => formatInputNumber(value));

  React.useEffect(() => {
    setDraftValue(formatInputNumber(value));
  }, [value]);

  const commitValue = (nextValue: string) => {
    if (nextValue.trim() === '') {
      setDraftValue(formatInputNumber(0));
      onChange(0);
      return;
    }

    const parsedValue = parseFormattedNumber(nextValue);

    if (parsedValue === null) {
      setDraftValue(formatInputNumber(value));
      return;
    }

    onChange(parsedValue);
    setDraftValue(formatInputNumber(parsedValue));
  };

  return (
    <Label className={styles.formField}>
      <span className={styles.formField__label}>{label}</span>
      <Input
        className={styles.formField__input}
        type="text"
        inputMode="numeric"
        maxLength={18}
        value={draftValue}
        onChange={(event) => {
          const nextValue = event.target.value;
          setDraftValue(nextValue);

          if (nextValue.trim() === '') {
            return;
          }

          const parsedValue = parseFormattedNumber(nextValue);

          if (parsedValue !== null) {
            onChange(parsedValue);
          }
        }}
        onBlur={(event) => commitValue(event.target.value)}
      />
      <small className={styles.formField__hint}>{hint}</small>
    </Label>
  );
}
