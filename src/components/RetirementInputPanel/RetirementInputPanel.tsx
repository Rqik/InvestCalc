import {
  MAX_PLANNING_AGE,
  MAX_RATE_PERCENT,
  MAX_RETIREMENT_AGE,
  MIN_RETIREMENT_AGE,
} from '@/constants/limits';
import { MoneyInput } from '@/components/MoneyInput';
import { NumberInput } from '@/components/NumberInput';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import type { RetirementInputs } from '@/types/retirement';
import { getBirthYearRange } from '@/utils/age';
import {
  normalizeAnnualReturn,
  normalizeBirthYear,
  normalizeMoney,
  normalizePlanningAge,
  normalizeRetirementAge,
} from '@/utils/normalize';
import type { RetirementInputPanelProps } from './RetirementInputPanel.types';
import styles from './RetirementInputPanel.module.scss';

export function RetirementInputPanel({
  inputs,
  isBirthYearValid,
  isRetirementPeriodValid,
  onChange,
  onReset,
}: RetirementInputPanelProps) {
  const birthYearRange = getBirthYearRange();

  const update = <K extends keyof RetirementInputs>(field: K, value: RetirementInputs[K]) => {
    onChange({
      ...inputs,
      [field]: value,
    });
  };

  return (
    <Card as="section" className={styles.inputPanel}>
      <CardHeader className={styles.inputPanel__header}>
        <div className={styles.inputPanel__headerContent}>
          <CardTitle>Ваш план</CardTitle>
          <CardDescription>
            Заполните возраст, цель по допдоходу и текущий темп накоплений.
          </CardDescription>
        </div>
      </CardHeader>

      <div className={styles.inputPanel__grid}>
        <fieldset className={styles.inputPanel__group}>
          <legend className={styles.inputPanel__legend}>Возраст и горизонт</legend>
          <NumberInput
            label="Год рождения"
            value={inputs.birthYear}
            min={birthYearRange.min}
            max={birthYearRange.max}
            step={1}
            hint="Например: 1990"
            onChange={(value) => update('birthYear', normalizeBirthYear(value))}
          />
          {!isBirthYearValid && (
            <Alert className={styles.inputPanel__warning} variant="warning">
              <AlertDescription>
                Проверьте год рождения: расчету нужен реалистичный возраст.
              </AlertDescription>
            </Alert>
          )}
          <NumberInput
            label="Во сколько лет выйти на пенсию"
            value={inputs.retirementAge}
            min={MIN_RETIREMENT_AGE}
            max={MAX_RETIREMENT_AGE}
            step={1}
            hint="Возраст, когда хотите получать допдоход"
            onChange={(value) => update('retirementAge', normalizeRetirementAge(value))}
          />
          <NumberInput
            label="Планировать накопления до возраста"
            value={inputs.planningAge}
            min={inputs.retirementAge}
            max={MAX_PLANNING_AGE}
            step={1}
            hint="Лучше брать с запасом: 85-90 лет"
            onChange={(value) => update('planningAge', normalizePlanningAge(value))}
          />
          {!isRetirementPeriodValid && (
            <Alert className={styles.inputPanel__warning} variant="warning">
              <AlertDescription>
                Возраст планирования должен быть больше возраста выхода на пенсию.
              </AlertDescription>
            </Alert>
          )}
        </fieldset>

        <fieldset className={styles.inputPanel__group}>
          <legend className={styles.inputPanel__legend}>Деньги</legend>
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

        <fieldset className={styles.inputPanel__group}>
          <legend className={styles.inputPanel__legend}>Допущения</legend>
          <NumberInput
            label="Ожидаемая доходность, %"
            value={inputs.annualReturn}
            min={0}
            max={MAX_RATE_PERCENT}
            step={0.1}
            hint="Средняя годовая доходность портфеля"
            onChange={(value) => update('annualReturn', normalizeAnnualReturn(value))}
          />
          <NumberInput
            label="Инфляция, %"
            value={inputs.inflationRate}
            min={0}
            max={MAX_RATE_PERCENT}
            step={0.1}
            hint="Чтобы считать покупательную способность"
            onChange={(value) => update('inflationRate', normalizeAnnualReturn(value))}
          />
          <NumberInput
            label="Индексация взноса, %"
            value={inputs.contributionGrowthRate}
            min={0}
            max={MAX_RATE_PERCENT}
            step={0.1}
            hint="Как растет взнос вместе с доходом"
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
