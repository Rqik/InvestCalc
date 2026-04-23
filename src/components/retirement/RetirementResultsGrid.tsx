import type { RetirementInputs } from '../../types/retirement';
import type { RetirementPlan } from '../../types/retirement';
import { formatMoney, formatYears } from '../../utils/format';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

type RetirementResultsGridProps = {
  inputs: RetirementInputs;
  plan: RetirementPlan;
};

export function RetirementResultsGrid({ inputs, plan }: RetirementResultsGridProps) {
  const gapLabel = plan.gap >= 0 ? 'Запас' : 'Не хватает';
  const gapValue = Math.abs(plan.gap);
  const lastsThroughPlan = plan.moneyLastsUntilAge >= inputs.planningAge;

  return (
    <Card as="section" className="results-panel retirement-results">
      <CardHeader>
        <CardTitle>Картина будущего</CardTitle>
        <CardDescription>
          Смотрим не на “идеальный” сценарий, а на понятный маршрут, который можно
          улучшать маленькими шагами.
        </CardDescription>
      </CardHeader>

      <div className="results-panel__grid">
        <Card as="article" className="metric-card metric-card--accent">
          <span className="metric-card__label">Капитал к пенсии</span>
          <strong className="metric-card__value">{formatMoney(plan.projectedCapital)}</strong>
          <span className="metric-card__hint">
            Это около {formatMoney(plan.projectedCapitalToday)} в сегодняшних деньгах.
          </span>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">Нужно к пенсии</span>
          <strong className="metric-card__value">{formatMoney(plan.requiredCapital)}</strong>
          <span className="metric-card__hint">
            Для допдохода {formatMoney(inputs.desiredMonthlyIncome)} в месяц.
          </span>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">{gapLabel}</span>
          <strong className="metric-card__value">{formatMoney(gapValue)}</strong>
          <span className="metric-card__hint">
            {plan.isOnTrack
              ? 'План выглядит устойчиво, можно думать о запасе и рисках.'
              : 'Это не провал, а точка настройки: взнос, срок или цель можно подвинуть.'}
          </span>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">
            {plan.isAlreadyRetirementAge ? 'Фокус сейчас' : 'Нужный взнос'}
          </span>
          <strong className="metric-card__value">
            {plan.isAlreadyRetirementAge
              ? 'выплаты'
              : formatMoney(plan.requiredMonthlyInvestment)}
          </strong>
          <span className="metric-card__hint">
            {plan.isAlreadyRetirementAge
              ? 'Важнее настроить устойчивый темп снятия и подушку.'
              : 'Ориентир на первый год, дальше взнос растет с индексацией.'}
          </span>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">Накоплений хватит</span>
          <strong className="metric-card__value">
            {lastsThroughPlan
              ? `до ${inputs.planningAge} лет`
              : `до ${Math.floor(plan.moneyLastsUntilAge)} лет`}
          </strong>
          <span className="metric-card__hint">
            При текущих вводных это примерно {formatYears(plan.moneyLastsYears)} выплат.
          </span>
        </Card>

        <Card as="article" className="metric-card">
          <span className="metric-card__label">До пенсии</span>
          <strong className="metric-card__value">
            {plan.isAlreadyRetirementAge ? 'сейчас' : formatYears(plan.yearsToRetirement)}
          </strong>
          <span className="metric-card__hint">
            Сейчас вам примерно {plan.currentAge} лет. Расчет можно спокойно уточнять.
          </span>
        </Card>
      </div>
    </Card>
  );
}
