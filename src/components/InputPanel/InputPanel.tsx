import { DurationInput } from '@/components/DurationInput';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { MAX_RATE_PERCENT } from '@/constants/limits';
import type { Inputs } from '@/types/finance';
import { normalizeAnnualReturn, normalizeMoney } from '@/utils/normalize';
import type { InputPanelProps } from './InputPanel.types';
import styles from './InputPanel.module.scss';

export function InputPanel({ inputs, isDurationInvalid, onChange, onReset }: InputPanelProps) {
  const update = <K extends keyof Inputs>(field: K, value: Inputs[K]) => {
    onChange({
      ...inputs,
      [field]: value,
    });
  };

  return (
    <Card as="section" className={styles.inputPanel}>
      <CardHeader className={styles.inputPanel__header}>
        <div className={styles.inputPanel__headerContent}>
          <CardTitle>Входные данные</CardTitle>
          <CardDescription>
            Меняйте цель, срок и допущения. Результаты, график и план по годам
            обновляются сразу.
          </CardDescription>
        </div>
      </CardHeader>

      <div className={styles.inputPanel__grid}>
        <fieldset className={styles.inputPanel__group}>
          <legend className={styles.inputPanel__legend}>Цель и старт</legend>
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
        </fieldset>

        <fieldset className={styles.inputPanel__group}>
          <legend className={styles.inputPanel__legend}>Срок и взносы</legend>
          <MoneyInput
            label="Откладываете в месяц"
            value={inputs.monthlyContribution}
            hint="Базовый ежемесячный взнос"
            onChange={(value) => update('monthlyContribution', normalizeMoney(value))}
          />
          <DurationInput
            years={inputs.years}
            months={inputs.months ?? 0}
            onChange={(duration) => onChange({ ...inputs, ...duration })}
          />
          {isDurationInvalid && (
            <Alert className={styles.inputPanel__warning} variant="warning">
              <AlertDescription>
                Укажите срок больше нуля: например, 1 месяц или 1 год.
              </AlertDescription>
            </Alert>
          )}
        </fieldset>

        <fieldset className={styles.inputPanel__group}>
          <legend className={styles.inputPanel__legend}>Допущения расчета</legend>
          <NumberInput
            label="Ожидаемая доходность, %"
            value={inputs.annualReturn}
            min={0}
            max={MAX_RATE_PERCENT}
            step={0.1}
            hint="Средняя годовая доходность"
            onChange={(value) => update('annualReturn', normalizeAnnualReturn(value))}
          />
          <NumberInput
            label="Инфляция, %"
            value={inputs.inflationRate}
            min={0}
            max={MAX_RATE_PERCENT}
            step={0.1}
            hint="Чтобы видеть сумму в сегодняшних деньгах"
            onChange={(value) => update('inflationRate', normalizeAnnualReturn(value))}
          />
          <NumberInput
            label="Индексация взноса, %"
            value={inputs.contributionGrowthRate}
            min={0}
            max={MAX_RATE_PERCENT}
            step={0.1}
            hint="Ежегодное увеличение ежемесячного взноса"
            onChange={(value) => update('contributionGrowthRate', normalizeAnnualReturn(value))}
          />
        </fieldset>
      </div>

      <div className={styles.inputPanel__footer}>
        <Button variant="outline" type="button" onClick={onReset}>
          Сбросить к значениям по умолчанию
        </Button>
      </div>
    </Card>
  );
}
