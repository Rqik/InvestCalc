import type { Inputs, ViewMode } from '../types/finance';
import { formatDuration, formatMoney, formatPercent } from '../utils/format';

const VIEW_COPY: Record<
  ViewMode,
  {
    title: string;
    description: string;
  }
> = {
  calculator: {
    title: 'Режим калькулятора',
    description:
      'Здесь удобно быстро оценить итоговый капитал, инфляцию, динамику роста и эффект дополнительных лет.',
  },
  plan: {
    title: 'Режим плана по годам',
    description:
      'Этот режим показывает подробную раскладку накоплений, вложений и прибыли по каждому периоду.',
  },
};

type WorkspaceSummaryProps = {
  inputs: Inputs;
  viewMode: ViewMode;
};

export function WorkspaceSummary({ inputs, viewMode }: WorkspaceSummaryProps) {
  const activeView = VIEW_COPY[viewMode];

  return (
    <section className="panel workspace-panel">
      <div className="section-header">
        <h2 className="section-header__title">{activeView.title}</h2>
        <p className="section-header__description">{activeView.description}</p>
      </div>

      <div className="workspace-panel__grid">
        <div className="summary-chip">
          <span className="summary-chip__label">Горизонт</span>
          <strong className="summary-chip__value">
            {formatDuration(inputs.years, inputs.months)}
          </strong>
        </div>
        <div className="summary-chip">
          <span className="summary-chip__label">Ежемесячный взнос</span>
          <strong className="summary-chip__value">{formatMoney(inputs.monthlyContribution)}</strong>
        </div>
        <div className="summary-chip">
          <span className="summary-chip__label">Инфляция</span>
          <strong className="summary-chip__value">{formatPercent(inputs.inflationRate)}</strong>
        </div>
        <div className="summary-chip">
          <span className="summary-chip__label">Индексация взноса</span>
          <strong className="summary-chip__value">
            {formatPercent(inputs.contributionGrowthRate)}
          </strong>
        </div>
      </div>
    </section>
  );
}
