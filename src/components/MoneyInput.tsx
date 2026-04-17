import { formatInputNumber, parseFormattedNumber } from '../utils/format';

type MoneyInputProps = {
  label: string;
  value: number;
  hint: string;
  onChange: (value: number) => void;
};

export function MoneyInput({ label, value, hint, onChange }: MoneyInputProps) {
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      <input
        className="form-field__input"
        type="text"
        inputMode="numeric"
        value={formatInputNumber(value)}
        onChange={(event) => onChange(parseFormattedNumber(event.target.value))}
      />
      <small className="form-field__hint">{hint}</small>
    </label>
  );
}
