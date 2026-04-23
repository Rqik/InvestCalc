import React from 'react';
import { formatInputNumber, parseFormattedNumber } from '../utils/format';
import { Input } from './ui/input';
import { Label } from './ui/label';

type MoneyInputProps = {
  label: string;
  value: number;
  hint: string;
  onChange: (value: number) => void;
};

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
    <Label className="form-field">
      <span className="form-field__label">{label}</span>
      <Input
        className="form-field__input"
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
      <small className="form-field__hint">{hint}</small>
    </Label>
  );
}
