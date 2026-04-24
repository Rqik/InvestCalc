export type NumberInputProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  hint: string;
  onChange: (value: number) => void;
};
