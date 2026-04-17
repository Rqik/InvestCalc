type NumberInputProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  hint: string;
  onChange: (value: number) => void;
};

export function NumberInput({
  label,
  value,
  min,
  max,
  step,
  hint,
  onChange,
}: NumberInputProps) {
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      <input
        className="form-field__input"
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <small className="form-field__hint">{hint}</small>
    </label>
  );
}
