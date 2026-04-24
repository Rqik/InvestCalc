import { formatDuration, formatMoney, formatPercent } from '@/utils/format';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import type { WorkspaceSummaryProps } from './WorkspaceSummary.types';

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
        <Card className="workspace-panel__chip">
          <span className="workspace-panel__chip-label">Горизонт</span>
          <strong className="workspace-panel__chip-value">
            {formatDuration(inputs.years, inputs.months)}
          </strong>
        </Card>
        <Card className="workspace-panel__chip">
          <span className="workspace-panel__chip-label">Ежемесячный взнос</span>
          <strong className="workspace-panel__chip-value">{formatMoney(inputs.monthlyContribution)}</strong>
        </Card>
        <Card className="workspace-panel__chip">
          <span className="workspace-panel__chip-label">Инфляция</span>
          <strong className="workspace-panel__chip-value">{formatPercent(inputs.inflationRate)}</strong>
        </Card>
        <Card className="workspace-panel__chip">
          <span className="workspace-panel__chip-label">Индексация взноса</span>
          <strong className="workspace-panel__chip-value">
            {formatPercent(inputs.contributionGrowthRate)}
          </strong>
        </Card>
      </div>
    </Card>
  );
}


