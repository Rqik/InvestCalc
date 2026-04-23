import type { KeyboardEvent } from 'react';
import { MAX_SCENARIO_NAME_LENGTH } from '../constants/limits';
import type { Scenario } from '../types/finance';
import { formatDuration, formatMoney, formatPercent, formatScenarioDate } from '../utils/format';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

type ScenarioPanelProps = {
  scenarioName: string;
  scenarios: Scenario[];
  selectedScenarioId: string | null;
  storageError?: string | null;
  onScenarioNameChange: (value: string) => void;
  onSave: () => void;
  onSelect: (scenarioId: string) => void;
  onLoad: (scenario: Scenario) => void;
  onDelete: (scenarioId: string) => void;
};

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

  const handleScenarioKeyDown = (event: KeyboardEvent<HTMLElement>, scenarioId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(scenarioId);
    }
  };

  return (
    <Card as="section" className="scenario-panel">
      <CardHeader className="scenario-panel__header">
        <div className="scenario-panel__heading">
          <div className="scenario-panel__title-row">
            <CardTitle>Сценарии</CardTitle>
            <Badge className="scenario-panel__counter" variant="secondary">
              {scenarios.length} {scenarios.length === 1 ? 'сценарий' : 'сценария'}
            </Badge>
          </div>
          <CardDescription>
            Сохраняйте варианты расчета и быстро возвращайтесь к нужному плану.
          </CardDescription>
        </div>
      </CardHeader>

      <div className="scenario-panel__creator">
        <Input
          className="scenario-panel__name-input"
          type="text"
          value={scenarioName}
          maxLength={MAX_SCENARIO_NAME_LENGTH}
          onChange={(event) => onScenarioNameChange(event.target.value)}
          placeholder="Название сценария"
        />
        <div className="scenario-panel__actions">
          <Button variant="primary" type="button" onClick={onSave}>
            Сохранить
          </Button>
        </div>
      </div>

      {storageError && (
        <Alert className="input-panel__warning" variant="warning">
          <AlertDescription>{storageError}</AlertDescription>
        </Alert>
      )}

      {scenarios.length === 0 ? (
        <div className="scenario-panel__empty">
          Сохраните первый вариант, и он появится здесь для сравнения и повторной загрузки.
        </div>
      ) : (
        <div className="scenario-panel__list" aria-label="Список сохраненных сценариев">
          {scenarios.map((scenario) => {
            const isActive = scenario.id === selectedScenario?.id;
            const scenarioMonths = scenario.inputs.months ?? 0;

            return (
              <Card
                as="article"
                key={scenario.id}
                className={`scenario-card ${isActive ? 'scenario-card--active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(scenario.id)}
                onKeyDown={(event) => handleScenarioKeyDown(event, scenario.id)}
              >
                <div className="scenario-card__content">
                  <div className="scenario-card__topline">
                    <strong className="scenario-card__title">{scenario.name}</strong>
                    <Badge className="scenario-card__state" variant="secondary">
                      {isActive ? 'Выбран' : 'Открыть'}
                    </Badge>
                  </div>
                  <span className="scenario-card__meta">
                    {formatMoney(scenario.inputs.targetCapital)} за{' '}
                    {formatDuration(scenario.inputs.years, scenarioMonths)}
                  </span>
                </div>
                <time className="scenario-card__date" dateTime={scenario.createdAt}>
                  {formatScenarioDate(scenario.createdAt)}
                </time>
              </Card>
            );
          })}
        </div>
      )}

      {selectedScenario && (
        <Card as="section" className="scenario-inspector">
          <div className="scenario-inspector__topline">
            <div>
              <span className="scenario-inspector__eyebrow">Выбранный сценарий</span>
              <h3 className="scenario-inspector__title">{selectedScenario.name}</h3>
            </div>
          </div>

          <div className="scenario-inspector__highlights">
            <div>
              <span>Цель</span>
              <strong>{formatMoney(selectedScenario.inputs.targetCapital)}</strong>
            </div>
            <div>
              <span>Срок</span>
              <strong>
                {formatDuration(selectedScenario.inputs.years, selectedScenario.inputs.months ?? 0)}
              </strong>
            </div>
          </div>

          <dl className="scenario-inspector__details">
            <div>
              <dt>Стартовый капитал</dt>
              <dd>{formatMoney(selectedScenario.inputs.initialCapital)}</dd>
            </div>
            <div>
              <dt>Ежемесячный взнос</dt>
              <dd>{formatMoney(selectedScenario.inputs.monthlyContribution)}</dd>
            </div>
            <div>
              <dt>Доходность</dt>
              <dd>{formatPercent(selectedScenario.inputs.annualReturn)}</dd>
            </div>
            <div>
              <dt>Инфляция</dt>
              <dd>{formatPercent(selectedScenario.inputs.inflationRate)}</dd>
            </div>
            <div>
              <dt>Индексация взноса</dt>
              <dd>{formatPercent(selectedScenario.inputs.contributionGrowthRate)}</dd>
            </div>
          </dl>

          <div className="scenario-inspector__actions">
            <Button
              variant="secondary"
              type="button"
              onClick={() => onLoad(selectedScenario)}
            >
              Применить
            </Button>
            <Button
              className="scenario-inspector__delete"
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
