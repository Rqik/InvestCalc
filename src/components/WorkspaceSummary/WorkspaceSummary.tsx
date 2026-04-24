import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatDuration, formatMoney, formatPercent } from '@/utils/format';
import type { WorkspaceSummaryProps } from './WorkspaceSummary.types';
import styles from './WorkspaceSummary.module.scss';

export function WorkspaceSummary({ inputs }: WorkspaceSummaryProps) {
  return (
    <Card as="section" className={styles.workspacePanel}>
      <CardHeader>
        <CardTitle>Картина плана</CardTitle>
        <CardDescription>
          Здесь собраны ключевые вводные: горизонт, взнос, инфляция и индексация. Ниже
          сразу видны и график роста, и подробный план по годам без переключения режима.
        </CardDescription>
      </CardHeader>

      <div className={styles.workspacePanel__grid}>
        <Card className={styles.workspacePanel__chip}>
          <span className={styles.workspacePanel__chipLabel}>Горизонт</span>
          <strong className={styles.workspacePanel__chipValue}>
            {formatDuration(inputs.years, inputs.months)}
          </strong>
        </Card>
        <Card className={styles.workspacePanel__chip}>
          <span className={styles.workspacePanel__chipLabel}>Ежемесячный взнос</span>
          <strong className={styles.workspacePanel__chipValue}>
            {formatMoney(inputs.monthlyContribution)}
          </strong>
        </Card>
        <Card className={styles.workspacePanel__chip}>
          <span className={styles.workspacePanel__chipLabel}>Инфляция</span>
          <strong className={styles.workspacePanel__chipValue}>
            {formatPercent(inputs.inflationRate)}
          </strong>
        </Card>
        <Card className={styles.workspacePanel__chip}>
          <span className={styles.workspacePanel__chipLabel}>Индексация взноса</span>
          <strong className={styles.workspacePanel__chipValue}>
            {formatPercent(inputs.contributionGrowthRate)}
          </strong>
        </Card>
      </div>
    </Card>
  );
}
