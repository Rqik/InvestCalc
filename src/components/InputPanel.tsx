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
            Срок можно задать точнее: отдельно годы и месяцы. Взнос может
            индексироваться каждый год.
          </p>
        </div>
        <button className="button button--ghost" type="button" onClick={onReset}>
          Сбросить
        </button>
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
          hint="Регулярное пополнение в первый год"
          onChange={(value) => update('monthlyContribution', normalizeMoney(value))}
        />
        <DurationInput
          years={inputs.years}
          months={inputs.months ?? 0}
          onChange={(duration) => onChange({ ...inputs, ...duration })}
        />
        {isDurationInvalid && (
          <p className="input-panel__warning">
            Укажите срок больше нуля: например, 1 месяц или 1 год. Пока срок равен
            нулю, расчет показывает только текущий капитал.
          </p>
        )}
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
          hint="Для пересчета капитала в сегодняшние деньги"
          onChange={(value) => update('inflationRate', normalizeAnnualReturn(value))}
        />
        <NumberInput
          label="Индексация взноса, %"
          value={inputs.contributionGrowthRate}
          min={0}
          step={0.1}
          hint="На сколько увеличивать ежемесячный взнос каждый год"
          onChange={(value) => update('contributionGrowthRate', normalizeAnnualReturn(value))}
        />
      </div>
    </section>
  );
}
