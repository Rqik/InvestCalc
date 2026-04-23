import type { Inputs } from '../types/finance';
import { formatDuration, formatMoney, formatPercent } from '../utils/format';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type WorkspaceSummaryProps = {
  inputs: Inputs;
};

export function WorkspaceSummary({ inputs }: WorkspaceSummaryProps) {
  return (
    <Card as="section" className="workspace-panel">
      <CardHeader>
        <CardTitle>Картина плана</CardTitle>
        <CardDescription>
          Здесь собраны ключевые вводные: горизонт, взнос, инфляция и индексация. Ниже
          сразу видны и график роста, и подробный план по годам без переключения режима.
        </CardDescription>
      </CardHeader>

      <div className="workspace-panel__grid">
        <Card className="summary-chip">
          <span className="summary-chip__label">Горизонт</span>
          <strong className="summary-chip__value">
            {formatDuration(inputs.years, inputs.months)}
          </strong>
        </Card>
        <Card className="summary-chip">
          <span className="summary-chip__label">Ежемесячный взнос</span>
          <strong className="summary-chip__value">{formatMoney(inputs.monthlyContribution)}</strong>
        </Card>
        <Card className="summary-chip">
          <span className="summary-chip__label">Инфляция</span>
          <strong className="summary-chip__value">{formatPercent(inputs.inflationRate)}</strong>
        </Card>
        <Card className="summary-chip">
          <span className="summary-chip__label">Индексация взноса</span>
          <strong className="summary-chip__value">
            {formatPercent(inputs.contributionGrowthRate)}
          </strong>
        </Card>
      </div>
    </Card>
  );
}
