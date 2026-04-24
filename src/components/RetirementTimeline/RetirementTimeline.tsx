import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { formatMoney } from '@/utils/format';
import type { RetirementTimelineProps } from './RetirementTimeline.types';
import styles from './RetirementTimeline.module.scss';

export function RetirementTimeline({ inputs, plan }: RetirementTimelineProps) {
  return (
    <Card as="section" className={styles.retirementTimeline}>
      <CardHeader>
        <CardTitle>Маршрут</CardTitle>
        <CardDescription>
          Три опорные точки плана: где вы сейчас, когда хотите выйти на пенсию и до какого возраста лучше держать запас.
        </CardDescription>
      </CardHeader>

      <div className={styles.retirementTimeline__steps}>
        <Card as="article" className={styles.retirementTimeline__step}>
          <span className={styles.retirementTimeline__stepLabel}>Сейчас</span>
          <strong className={styles.retirementTimeline__stepValue}>{plan.currentAge} лет</strong>
          <p className={styles.retirementTimeline__stepText}>
            Уже накоплено {formatMoney(inputs.currentSavings)}
          </p>
        </Card>

        <Card
          as="article"
          className={cn(
            styles.retirementTimeline__step,
            styles['retirementTimeline__step--active'],
          )}
        >
          <span className={styles.retirementTimeline__stepLabel}>Пенсия</span>
          <strong className={styles.retirementTimeline__stepValue}>{inputs.retirementAge} лет</strong>
          <p className={styles.retirementTimeline__stepText}>
            Желаемый доход {formatMoney(inputs.desiredMonthlyIncome)} в месяц
          </p>
        </Card>

        <Card as="article" className={styles.retirementTimeline__step}>
          <span className={styles.retirementTimeline__stepLabel}>Запас</span>
          <strong className={styles.retirementTimeline__stepValue}>{inputs.planningAge} лет</strong>
          <p className={styles.retirementTimeline__stepText}>
            План выплат на {Math.max(0, inputs.planningAge - inputs.retirementAge)} лет
          </p>
        </Card>
      </div>
    </Card>
  );
}
