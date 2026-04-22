import type { Inputs } from '../types/finance';
import { normalizeAnnualReturn, normalizeMoney } from '../utils/normalize';
import { DurationInput } from './DurationInput';
import { MoneyInput } from './MoneyInput';
import { NumberInput } from './NumberInput';

type InputPanelProps = {
  inputs: Inputs;
  isDurationInvalid: boolean;
  onChange: (inputs: Inputs) => void;
  onReset: () => void;
};

export function InputPanel({ inputs, isDurationInvalid, onChange, onReset }: InputPanelProps) {
  const update = <K extends keyof Inputs>(field: K, value: Inputs[K]) => {
    onChange({
      ...inputs,
      [field]: value,
    });
  };

  return (
    <section className="panel input-panel">
      <div className="section-header input-panel__header">
        <div>
          <h2 className="section-header__title">Входные данные</h2>
          <p className="section-header__description">
            Заполните цель, срок и параметры пополнений. Все расчеты обновляются сразу.
          </p>
        </div>
        <button className="button button--ghost" type="button" onClick={onReset}>
          Сбросить
        </button>
      </div>

      <div className="input-panel__grid">
        <fieldset className="input-panel__group">
          <legend>Цель</legend>
          <MoneyInput
            label="Цель по капиталу"
            value={inputs.targetCapital}
            hint="Например: 5 000 000"
            onChange={(value) => update('targetCapital', normalizeMoney(value))}
          />
          <MoneyInput
            label="Уже накоплено"
            value={inputs.initialCapital}
            hint="Стартовая сумма"
            onChange={(value) => update('initialCapital', normalizeMoney(value))}
          />
        </fieldset>

        <fieldset className="input-panel__group">
          <legend>Срок и взносы</legend>
          <MoneyInput
            label="Откладываете в месяц"
            value={inputs.monthlyContribution}
            hint="Взнос в первый год"
            onChange={(value) => update('monthlyContribution', normalizeMoney(value))}
          />
          <DurationInput
            years={inputs.years}
            months={inputs.months ?? 0}
            onChange={(duration) => onChange({ ...inputs, ...duration })}
          />
          {isDurationInvalid && (
            <p className="input-panel__warning">
              Укажите срок больше нуля: например, 1 месяц или 1 год.
            </p>
          )}
        </fieldset>

        <fieldset className="input-panel__group">
          <legend>Допущения</legend>
          <NumberInput
            label="Ожидаемая доходность, %"
            value={inputs.annualReturn}
            min={0}
            step={0.1}
            hint="Средняя годовая доходность"
            onChange={(value) => update('annualReturn', normalizeAnnualReturn(value))}
          />
          <NumberInput
            label="Инфляция, %"
            value={inputs.inflationRate}
            min={0}
            step={0.1}
            hint="Для оценки в сегодняшних деньгах"
            onChange={(value) => update('inflationRate', normalizeAnnualReturn(value))}
          />
          <NumberInput
            label="Индексация взноса, %"
            value={inputs.contributionGrowthRate}
            min={0}
            step={0.1}
            hint="Ежегодный рост пополнений"
            onChange={(value) => update('contributionGrowthRate', normalizeAnnualReturn(value))}
          />
        </fieldset>
      </div>
    </section>
  );
}
