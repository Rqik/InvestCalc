import type { RetirementInputs, RetirementPlan } from '../../types/retirement';
import { formatMoney } from '../../utils/format';

type RetirementTimelineProps = {
  inputs: RetirementInputs;
  plan: RetirementPlan;
};

export function RetirementTimeline({ inputs, plan }: RetirementTimelineProps) {
  return (
    <section className="panel retirement-timeline">
      <div className="section-header">
        <h2 className="section-header__title">Маршрут</h2>
        <p className="section-header__description">
          Три опорные точки плана: где вы сейчас, когда хотите выйти на пенсию и до
          какого возраста лучше держать запас.
        </p>
      </div>

      <div className="retirement-timeline__steps">
        <article className="retirement-timeline__step">
          <span>Сейчас</span>
          <strong>{plan.currentAge} лет</strong>
          <p>Уже накоплено {formatMoney(inputs.currentSavings)}</p>
        </article>
        <article className="retirement-timeline__step retirement-timeline__step--active">
          <span>Пенсия</span>
          <strong>{inputs.retirementAge} лет</strong>
          <p>Желаемый допдоход {formatMoney(inputs.desiredMonthlyIncome)} в месяц</p>
        </article>
        <article className="retirement-timeline__step">
          <span>Запас</span>
          <strong>{inputs.planningAge} лет</strong>
          <p>План выплат на {Math.max(0, inputs.planningAge - inputs.retirementAge)} лет</p>
        </article>
      </div>
    </section>
  );
}
