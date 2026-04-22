import type { RetirementInputs } from '../../types/retirement';
import { normalizeAnnualReturn, normalizeMoney } from '../../utils/normalize';
import { MoneyInput } from '../MoneyInput';
import { NumberInput } from '../NumberInput';

type RetirementInputPanelProps = {
  inputs: RetirementInputs;
  isBirthYearValid: boolean;
  isRetirementPeriodValid: boolean;
  onChange: (inputs: RetirementInputs) => void;
  onReset: () => void;
};

function normalizePositiveInteger(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.trunc(value));
}

export function RetirementInputPanel({
  inputs,
  isBirthYearValid,
  isRetirementPeriodValid,
  onChange,
  onReset,
}: RetirementInputPanelProps) {
  const update = <K extends keyof RetirementInputs>(field: K, value: RetirementInputs[K]) => {
    onChange({
      ...inputs,
      [field]: value,
    });
  };

  return (
    <section className="panel input-panel retirement-input">
      <div className="section-header input-panel__header">
        <div>
          <h2 className="section-header__title">Ваш план</h2>
          <p className="section-header__description">
            Заполните возраст, цель по допдоходу и текущий темп накоплений.
          </p>
        </div>
        <button className="button button--ghost" type="button" onClick={onReset}>
          Сбросить
        </button>
      </div>

      <div className="input-panel__grid">
        <fieldset className="input-panel__group">
          <legend>Возраст и горизонт</legend>
          <NumberInput
            label="Год рождения"
            value={inputs.birthYear}
            min={1926}
            max={new Date().getFullYear()}
            step={1}
            hint="Например: 1990"
            onChange={(value) => update('birthYear', normalizePositiveInteger(value))}
          />
          {!isBirthYearValid && (
            <p className="input-panel__warning">
              Проверьте год рождения: расчету нужен реальный возраст.
            </p>
          )}
          <NumberInput
            label="Во сколько лет выйти на пенсию"
            value={inputs.retirementAge}
            min={18}
            max={100}
            step={1}
            hint="Возраст, когда хотите получать допдоход"
            onChange={(value) => update('retirementAge', normalizePositiveInteger(value))}
          />
          <NumberInput
            label="Планировать накопления до возраста"
            value={inputs.planningAge}
            min={inputs.retirementAge}
            max={110}
            step={1}
            hint="Лучше брать с запасом: 85-90 лет"
            onChange={(value) => update('planningAge', normalizePositiveInteger(value))}
          />
          {!isRetirementPeriodValid && (
            <p className="input-panel__warning">
              Возраст планирования должен быть больше возраста выхода на пенсию.
            </p>
          )}
        </fieldset>

        <fieldset className="input-panel__group">
          <legend>Деньги</legend>
          <MoneyInput
            label="Желаемый допдоход в месяц"
            value={inputs.desiredMonthlyIncome}
            hint="В сегодняшних деньгах"
            onChange={(value) => update('desiredMonthlyIncome', normalizeMoney(value))}
          />
          <MoneyInput
            label="Уже накоплено"
            value={inputs.currentSavings}
            hint="Инвестиции и накопления под эту цель"
            onChange={(value) => update('currentSavings', normalizeMoney(value))}
          />
          <MoneyInput
            label="Готовы инвестировать в месяц"
            value={inputs.monthlyInvestment}
            hint="Текущий комфортный взнос"
            onChange={(value) => update('monthlyInvestment', normalizeMoney(value))}
          />
        </fieldset>

        <fieldset className="input-panel__group">
          <legend>Допущения</legend>
          <NumberInput
            label="Ожидаемая доходность, %"
            value={inputs.annualReturn}
            min={0}
            step={0.1}
            hint="Средняя годовая доходность портфеля"
            onChange={(value) => update('annualReturn', normalizeAnnualReturn(value))}
          />
          <NumberInput
            label="Инфляция, %"
            value={inputs.inflationRate}
            min={0}
            step={0.1}
            hint="Чтобы считать покупательную способность"
            onChange={(value) => update('inflationRate', normalizeAnnualReturn(value))}
          />
          <NumberInput
            label="Индексация взноса, %"
            value={inputs.contributionGrowthRate}
            min={0}
            step={0.1}
            hint="Как растет взнос вместе с доходом"
            onChange={(value) => update('contributionGrowthRate', normalizeAnnualReturn(value))}
          />
        </fieldset>
      </div>
    </section>
  );
}
