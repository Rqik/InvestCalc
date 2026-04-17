import type { Inputs } from '../types/finance';
import { normalizeAnnualReturn, normalizeMoney, normalizeYears } from '../utils/normalize';
import { MoneyInput } from './MoneyInput';
import { NumberInput } from './NumberInput';

type InputPanelProps = {
  inputs: Inputs;
  onChange: (inputs: Inputs) => void;
};

export function InputPanel({ inputs, onChange }: InputPanelProps) {
  const update = <K extends keyof Inputs>(field: K, value: Inputs[K]) => {
    onChange({
      ...inputs,
      [field]: value,
    });
  };

  return (
    <section className="panel input-panel">
      <div className="section-header">
        <h2 className="section-header__title">Входные данные</h2>
        <p className="section-header__description">
          Суммы форматируются пробелами, чтобы большие числа было проще читать.
        </p>
      </div>

      <div className="input-panel__grid">
        <MoneyInput
          label="Цель по капиталу"
          value={inputs.targetCapital}
          hint="Например: 5 000 000"
          onChange={(value) => update('targetCapital', normalizeMoney(value))}
        />
        <MoneyInput
          label="Уже накоплено"
          value={inputs.initialCapital}
          hint="Стартовый капитал"
          onChange={(value) => update('initialCapital', normalizeMoney(value))}
        />
        <MoneyInput
          label="Откладываете в месяц"
          value={inputs.monthlyContribution}
          hint="Регулярное пополнение"
          onChange={(value) => update('monthlyContribution', normalizeMoney(value))}
        />
        <NumberInput
          label="Срок, лет"
          value={inputs.years}
          min={1}
          step={1}
          hint="Горизонт планирования"
          onChange={(value) => update('years', normalizeYears(value))}
        />
        <NumberInput
          label="Ожидаемая доходность, %"
          value={inputs.annualReturn}
          min={0}
          step={0.1}
          hint="Средняя годовая доходность"
          onChange={(value) => update('annualReturn', normalizeAnnualReturn(value))}
        />
      </div>
    </section>
  );
}
