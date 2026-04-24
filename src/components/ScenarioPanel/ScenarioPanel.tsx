import type { KeyboardEvent } from 'react';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { MAX_SCENARIO_NAME_LENGTH } from '@/constants/limits';
import { cn } from '@/lib/utils';
import {
  formatDuration,
  formatMoney,
  formatPercent,
  formatScenarioDate,
} from '@/utils/format';
import type { ScenarioPanelProps } from './ScenarioPanel.types';
import styles from './ScenarioPanel.module.scss';

export function ScenarioPanel({
  scenarioName,
  scenarios,
  selectedScenarioId,
  storageError,
  onScenarioNameChange,
  onSave,
  onSelect,
  onLoad,
  onDelete,
}: ScenarioPanelProps) {
  const selectedScenario =
    scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0] ?? null;

  const handleScenarioKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    scenarioId: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(scenarioId);
    }
  };

  return (
    <Card as="section" className={styles.scenarioPanel}>
      <CardHeader className={styles.scenarioPanel__header}>
        <div className={styles.scenarioPanel__heading}>
          <div className={styles.scenarioPanel__titleRow}>
            <CardTitle>Сценарии</CardTitle>
            <Badge className={styles.scenarioPanel__counter} variant="secondary">
              {scenarios.length} {scenarios.length === 1 ? 'сценарий' : 'сценария'}
            </Badge>
          </div>
          <CardDescription>
            Сохраняйте варианты расчета и быстро возвращайтесь к нужному плану.
          </CardDescription>
        </div>
      </CardHeader>

      <div className={styles.scenarioPanel__creator}>
        <Input
          className={styles.scenarioPanel__nameInput}
          type="text"
          value={scenarioName}
          maxLength={MAX_SCENARIO_NAME_LENGTH}
          onChange={(event) => onScenarioNameChange(event.target.value)}
          placeholder="Название сценария"
        />
        <div className={styles.scenarioPanel__actions}>
          <Button variant="primary" type="button" onClick={onSave}>
            Сохранить
          </Button>
        </div>
      </div>

      {storageError && (
        <Alert className={styles.scenarioPanel__warning} variant="warning">
          <AlertDescription>{storageError}</AlertDescription>
        </Alert>
      )}

      {scenarios.length === 0 ? (
        <div className={styles.scenarioPanel__empty}>
          Сохраните первый вариант, и он появится здесь для сравнения и повторной загрузки.
        </div>
      ) : (
        <div className={styles.scenarioPanel__list} aria-label="Список сохраненных сценариев">
          {scenarios.map((scenario) => {
            const isActive = scenario.id === selectedScenario?.id;
            const scenarioMonths = scenario.inputs.months ?? 0;

            return (
              <Card
                as="article"
                key={scenario.id}
                className={cn(styles.scenarioCard, isActive && styles['scenarioCard--active'])}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(scenario.id)}
                onKeyDown={(event) => handleScenarioKeyDown(event, scenario.id)}
              >
                <div className={styles.scenarioCard__content}>
                  <div className={styles.scenarioCard__topline}>
                    <strong className={styles.scenarioCard__title}>{scenario.name}</strong>
                    <Badge className={styles.scenarioCard__state} variant="secondary">
                      {isActive ? 'Выбран' : 'Открыть'}
                    </Badge>
                  </div>
                  <span className={styles.scenarioCard__meta}>
                    {formatMoney(scenario.inputs.targetCapital)} за{' '}
                    {formatDuration(scenario.inputs.years, scenarioMonths)}
                  </span>
                </div>
                <time className={styles.scenarioCard__date} dateTime={scenario.createdAt}>
                  {formatScenarioDate(scenario.createdAt)}
                </time>
              </Card>
            );
          })}
        </div>
      )}

      {selectedScenario && (
        <Card as="section" className={styles.scenarioInspector}>
          <div className={styles.scenarioInspector__topline}>
            <div className={styles.scenarioInspector__titleWrap}>
              <span className={styles.scenarioInspector__eyebrow}>Выбранный сценарий</span>
              <h3 className={styles.scenarioInspector__title}>{selectedScenario.name}</h3>
            </div>
          </div>

          <div className={styles.scenarioInspector__highlights}>
            <div className={styles.scenarioInspector__highlight}>
              <span className={styles.scenarioInspector__highlightLabel}>Цель</span>
              <strong className={styles.scenarioInspector__highlightValue}>
                {formatMoney(selectedScenario.inputs.targetCapital)}
              </strong>
            </div>
            <div className={styles.scenarioInspector__highlight}>
              <span className={styles.scenarioInspector__highlightLabel}>Срок</span>
              <strong className={styles.scenarioInspector__highlightValue}>
                {formatDuration(
                  selectedScenario.inputs.years,
                  selectedScenario.inputs.months ?? 0,
                )}
              </strong>
            </div>
          </div>

          <dl className={styles.scenarioInspector__details}>
            <div className={styles.scenarioInspector__detailRow}>
              <dt className={styles.scenarioInspector__detailTerm}>Стартовый капитал</dt>
              <dd className={styles.scenarioInspector__detailValue}>
                {formatMoney(selectedScenario.inputs.initialCapital)}
              </dd>
            </div>
            <div className={styles.scenarioInspector__detailRow}>
              <dt className={styles.scenarioInspector__detailTerm}>Ежемесячный взнос</dt>
              <dd className={styles.scenarioInspector__detailValue}>
                {formatMoney(selectedScenario.inputs.monthlyContribution)}
              </dd>
            </div>
            <div className={styles.scenarioInspector__detailRow}>
              <dt className={styles.scenarioInspector__detailTerm}>Доходность</dt>
              <dd className={styles.scenarioInspector__detailValue}>
                {formatPercent(selectedScenario.inputs.annualReturn)}
              </dd>
            </div>
            <div className={styles.scenarioInspector__detailRow}>
              <dt className={styles.scenarioInspector__detailTerm}>Инфляция</dt>
              <dd className={styles.scenarioInspector__detailValue}>
                {formatPercent(selectedScenario.inputs.inflationRate)}
              </dd>
            </div>
            <div className={styles.scenarioInspector__detailRow}>
              <dt className={styles.scenarioInspector__detailTerm}>Индексация взноса</dt>
              <dd className={styles.scenarioInspector__detailValue}>
                {formatPercent(selectedScenario.inputs.contributionGrowthRate)}
              </dd>
            </div>
          </dl>

          <div className={styles.scenarioInspector__actions}>
            <Button variant="secondary" type="button" onClick={() => onLoad(selectedScenario)}>
              Применить
            </Button>
            <Button
              className={styles.scenarioInspector__delete}
              variant="destructive"
              type="button"
              onClick={() => onDelete(selectedScenario.id)}
            >
              Удалить сценарий
            </Button>
          </div>
        </Card>
      )}
    </Card>
  );
}
