import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import type { RetirementInputs, RetirementPlan } from '@/types/retirement';
import { formatMoney, formatYears } from '@/utils/format';
import type { RetirementResultsGridProps } from './RetirementResultsGrid.types';

function getRetirementCapitalTone(plan: RetirementPlan) {
  if (plan.gap >= 0) {
    return plan.gap >= plan.requiredCapital * 0.15
      ? 'retirement-results__metric--excellent'
      : 'retirement-results__metric--good';
  }

  return Math.abs(plan.gap) >= plan.requiredCapital * 0.2
    ? 'retirement-results__metric--danger'
    : 'retirement-results__metric--warning';
}

function getGapTone(plan: RetirementPlan) {
  if (plan.gap >= 0) {
    return 'retirement-results__metric--good';
  }

  return Math.abs(plan.gap) >= plan.requiredCapital * 0.2
    ? 'retirement-results__metric--danger'
    : 'retirement-results__metric--warning';
}

function getRunwayTone(lastsThroughPlan: boolean, inputs: RetirementInputs, plan: RetirementPlan) {
  if (lastsThroughPlan) {
    return 'retirement-results__metric--good';
  }

  const yearsShort = inputs.planningAge - plan.moneyLastsUntilAge;
  return yearsShort >= 7
    ? 'retirement-results__metric--danger'
    : 'retirement-results__metric--warning';
}

export function RetirementResultsGrid({ inputs, plan }: RetirementResultsGridProps) {
  const gapLabel = plan.gap >= 0 ? 'Запас' : 'Не хватает';
  const gapValue = Math.abs(plan.gap);
  const lastsThroughPlan = plan.moneyLastsUntilAge >= inputs.planningAge;

  return (
    <Card as="section" className="results-panel retirement-results">
      <CardHeader>
        <CardTitle>Картина будущего</CardTitle>
        <CardDescription>
          Смотрим не на идеальный сценарий, а на понятный маршрут, который можно улучшать
          маленькими шагами.
        </CardDescription>
      </CardHeader>

      <div className="results-panel__grid">
        <Card as="article" className={`retirement-results__metric ${getRetirementCapitalTone(plan)}`}>
          <span className="retirement-results__metric-label">Капитал к пенсии</span>
          <strong className="retirement-results__metric-value">{formatMoney(plan.projectedCapital)}</strong>
          <span className="retirement-results__metric-hint">
            Это около {formatMoney(plan.projectedCapitalToday)} в сегодняшних деньгах.
          </span>
        </Card>

        <Card as="article" className="retirement-results__metric">
          <span className="retirement-results__metric-label">Нужно к пенсии</span>
          <strong className="retirement-results__metric-value">{formatMoney(plan.requiredCapital)}</strong>
          <span className="retirement-results__metric-hint">
            Для допдохода {formatMoney(inputs.desiredMonthlyIncome)} в месяц.
          </span>
        </Card>

        <Card as="article" className={`retirement-results__metric ${getGapTone(plan)}`}>
          <span className="retirement-results__metric-label">{gapLabel}</span>
          <strong className="retirement-results__metric-value">{formatMoney(gapValue)}</strong>
          <span className="retirement-results__metric-hint">
            {plan.isOnTrack
              ? 'План выглядит устойчиво, можно думать о запасе и рисках.'
              : 'Это не провал, а точка настройки: взнос, срок или цель можно подвинуть.'}
          </span>
        </Card>

        <Card as="article" className="retirement-results__metric">
          <span className="retirement-results__metric-label">
            {plan.isAlreadyRetirementAge ? 'Фокус сейчас' : 'Нужный взнос'}
          </span>
          <strong className="retirement-results__metric-value">
            {plan.isAlreadyRetirementAge ? 'выплаты' : formatMoney(plan.requiredMonthlyInvestment)}
          </strong>
          <span className="retirement-results__metric-hint">
            {plan.isAlreadyRetirementAge
              ? 'Важнее настроить устойчивый темп снятия и подушку.'
              : 'Ориентир на первый год, дальше взнос растет с индексацией.'}
          </span>
        </Card>

        <Card as="article" className={`retirement-results__metric ${getRunwayTone(lastsThroughPlan, inputs, plan)}`}>
          <span className="retirement-results__metric-label">Накоплений хватит</span>
          <strong className="retirement-results__metric-value">
            {lastsThroughPlan
              ? `до ${inputs.planningAge} лет`
              : `до ${Math.floor(plan.moneyLastsUntilAge)} лет`}
          </strong>
          <span className="retirement-results__metric-hint">
            При текущих вводных это примерно {formatYears(plan.moneyLastsYears)} выплат.
          </span>
        </Card>

        <Card as="article" className="retirement-results__metric">
          <span className="retirement-results__metric-label">До пенсии</span>
          <strong className="retirement-results__metric-value">
            {plan.isAlreadyRetirementAge ? 'сейчас' : formatYears(plan.yearsToRetirement)}
          </strong>
          <span className="retirement-results__metric-hint">
            Сейчас вам примерно {plan.currentAge} лет. Расчет можно спокойно уточнять.
          </span>
        </Card>
      </div>
    </Card>
  );
}
