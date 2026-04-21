import React from 'react';

type NumberInputProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  hint: string;
  onChange: (value: number) => void;
};

function formatNumberValue(value: number) {
  return Number.isFinite(value) ? String(value) : '';
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

    onChange(parsedValue);
  };

  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      <input
        className="form-field__input"
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
            onChange(parsedValue);
          }
        }}
        onBlur={(event) => commitValue(event.target.value)}
      />
      <small className="form-field__hint">{hint}</small>
    </label>
  );
}
