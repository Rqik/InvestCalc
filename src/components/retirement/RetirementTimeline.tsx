import type { RetirementInputs, RetirementPlan } from '../../types/retirement';
import { formatMoney } from '../../utils/format';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

type RetirementTimelineProps = {
  inputs: RetirementInputs;
  plan: RetirementPlan;
};

export function RetirementTimeline({ inputs, plan }: RetirementTimelineProps) {
  return (
    <Card as="section" className="retirement-timeline">
      <CardHeader>
        <CardTitle>Маршрут</CardTitle>
        <CardDescription>
          Три опорные точки плана: где вы сейчас, когда хотите выйти на пенсию и до
          какого возраста лучше держать запас.
        </CardDescription>
      </CardHeader>

      <div className="retirement-timeline__steps">
        <Card as="article" className="retirement-timeline__step">
          <span>Сейчас</span>
          <strong>{plan.currentAge} лет</strong>
          <p>Уже накоплено {formatMoney(inputs.currentSavings)}</p>
        </Card>
        <Card as="article" className="retirement-timeline__step retirement-timeline__step--active">
          <span>Пенсия</span>
          <strong>{inputs.retirementAge} лет</strong>
          <p>Желаемый допдоход {formatMoney(inputs.desiredMonthlyIncome)} в месяц</p>
        </Card>
        <Card as="article" className="retirement-timeline__step">
          <span>Запас</span>
          <strong>{inputs.planningAge} лет</strong>
          <p>План выплат на {Math.max(0, inputs.planningAge - inputs.retirementAge)} лет</p>
        </Card>
      </div>
    </Card>
  );
}
