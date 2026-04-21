import type { Inputs } from '../types/finance';
import { normalizeAnnualReturn, normalizeMoney } from '../utils/normalize';
import { DurationInput } from './DurationInput';
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
          Суммы форматируются пробелами, а срок можно задать точнее: отдельно годы
          и месяцы.
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
        <DurationInput
          years={inputs.years}
          months={inputs.months ?? 0}
          onChange={(duration) => onChange({ ...inputs, ...duration })}
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
