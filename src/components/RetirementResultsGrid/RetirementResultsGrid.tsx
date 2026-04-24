import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { RetirementInputs, RetirementPlan } from '@/types/retirement';
import { formatMoney, formatYears } from '@/utils/format';
import type { RetirementResultsGridProps } from './RetirementResultsGrid.types';
import styles from './RetirementResultsGrid.module.scss';

function getRetirementCapitalTone(plan: RetirementPlan) {
  if (plan.gap >= 0) {
    return plan.gap >= plan.requiredCapital * 0.15
      ? styles['metric--excellent']
      : styles['metric--good'];
  }

  return Math.abs(plan.gap) >= plan.requiredCapital * 0.2
    ? styles['metric--danger']
    : styles['metric--warning'];
}

function getGapTone(plan: RetirementPlan) {
  if (plan.gap >= 0) {
    return styles['metric--good'];
  }

  return Math.abs(plan.gap) >= plan.requiredCapital * 0.2
    ? styles['metric--danger']
    : styles['metric--warning'];
}

function getRunwayTone(
  lastsThroughPlan: boolean,
  inputs: RetirementInputs,
  plan: RetirementPlan,
) {
  if (lastsThroughPlan) {
    return styles['metric--good'];
  }

  const yearsShort = inputs.planningAge - plan.moneyLastsUntilAge;
  return yearsShort >= 7
    ? styles['metric--danger']
    : styles['metric--warning'];
}

export function RetirementResultsGrid({
  inputs,
  plan,
}: RetirementResultsGridProps) {
  const gapLabel = plan.gap >= 0 ? 'Запас' : 'Не хватает';
  const gapValue = Math.abs(plan.gap);
  const lastsThroughPlan = plan.moneyLastsUntilAge >= inputs.planningAge;

  return (
    <Card as="section" className={styles.retirementResults}>
      <CardHeader>
        <CardTitle>Картина будущего</CardTitle>
        <CardDescription>
          Смотрим не на идеальный сценарий, а на понятный маршрут, который можно
          улучшать маленькими шагами.
        </CardDescription>
      </CardHeader>

      <div className={styles.retirementResults__grid}>
        <Card as="article" className={cn(styles.metric, getRetirementCapitalTone(plan))}>
          <span className={styles.metric__label}>Капитал к пенсии</span>
          <strong className={styles.metric__value}>{formatMoney(plan.projectedCapital)}</strong>
          <span className={styles.metric__hint}>
            Это около {formatMoney(plan.projectedCapitalToday)} в сегодняшних деньгах.
          </span>
        </Card>

        <Card as="article" className={styles.metric}>
          <span className={styles.metric__label}>Нужно к пенсии</span>
          <strong className={styles.metric__value}>{formatMoney(plan.requiredCapital)}</strong>
          <span className={styles.metric__hint}>
            Для дохода {formatMoney(inputs.desiredMonthlyIncome)} в месяц.
          </span>
        </Card>

        <Card as="article" className={cn(styles.metric, getGapTone(plan))}>
          <span className={styles.metric__label}>{gapLabel}</span>
          <strong className={styles.metric__value}>{formatMoney(gapValue)}</strong>
          <span className={styles.metric__hint}>
            {plan.isOnTrack
              ? 'План выглядит устойчиво, можно думать о запасе и рисках.'
              : 'Это не провал, а точка настройки: взнос, срок или цель можно подвигнуть.'}
          </span>
        </Card>

        <Card as="article" className={styles.metric}>
          <span className={styles.metric__label}>
            {plan.isAlreadyRetirementAge ? 'Фокус сейчас' : 'Нужный взнос'}
          </span>
          <strong className={styles.metric__value}>
            {plan.isAlreadyRetirementAge ? 'выплаты' : formatMoney(plan.requiredMonthlyInvestment)}
          </strong>
          <span className={styles.metric__hint}>
            {plan.isAlreadyRetirementAge
              ? 'Важнее настроить устойчивый темп снятия и подушку.'
              : 'Ориентир на первый год, дальше взнос растет с индексацией.'}
          </span>
        </Card>

        <Card as="article" className={cn(styles.metric, getRunwayTone(lastsThroughPlan, inputs, plan))}>
          <span className={styles.metric__label}>Накоплений хватит</span>
          <strong className={styles.metric__value}>
            {lastsThroughPlan
              ? `до ${inputs.planningAge} лет`
              : `до ${Math.floor(plan.moneyLastsUntilAge)} лет`}
          </strong>
          <span className={styles.metric__hint}>
            При текущих вводных это примерно {formatYears(plan.moneyLastsYears)} выплат.
          </span>
        </Card>

        <Card as="article" className={styles.metric}>
          <span className={styles.metric__label}>До пенсии</span>
          <strong className={styles.metric__value}>
            {plan.isAlreadyRetirementAge ? 'сейчас' : formatYears(plan.yearsToRetirement)}
          </strong>
          <span className={styles.metric__hint}>
            Сейчас вам примерно {plan.currentAge} лет. Расчет можно спокойно уточнять.
          </span>
        </Card>
      </div>
    </Card>
  );
}
