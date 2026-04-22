import type { KeyboardEvent } from 'react';
import type { Scenario } from '../types/finance';
import { formatDuration, formatMoney, formatPercent, formatScenarioDate } from '../utils/format';

type ScenarioPanelProps = {
  scenarioName: string;
  scenarios: Scenario[];
  selectedScenarioId: string | null;
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
    <section className="panel scenario-panel">
      <div className="section-header scenario-panel__header">
        <div>
          <h2 className="section-header__title">Сценарии</h2>
          <p className="section-header__description">
            Сохраняйте варианты расчета и быстро возвращайтесь к нужному плану.
          </p>
        </div>
        <span className="scenario-panel__counter">{scenarios.length}</span>
      </div>

      <div className="scenario-panel__creator">
        <input
          className="scenario-panel__name-input"
          type="text"
          value={scenarioName}
          onChange={(event) => onScenarioNameChange(event.target.value)}
          placeholder="Название сценария"
        />
        <button className="button button--primary" type="button" onClick={onSave}>
          Сохранить
        </button>
      </div>

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
              <article
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
                    <span className="scenario-card__state">
                      {isActive ? 'Выбран' : 'Открыть'}
                    </span>
                  </div>
                  <span className="scenario-card__meta">
                    {formatMoney(scenario.inputs.targetCapital)} за{' '}
                    {formatDuration(scenario.inputs.years, scenarioMonths)}
                  </span>
                </div>
                <time className="scenario-card__date" dateTime={scenario.createdAt}>
                  {formatScenarioDate(scenario.createdAt)}
                </time>
              </article>
            );
          })}
        </div>
      )}

      {selectedScenario && (
        <section className="scenario-inspector">
          <div className="scenario-inspector__topline">
            <div>
              <span className="scenario-inspector__eyebrow">Выбранный сценарий</span>
              <h3 className="scenario-inspector__title">{selectedScenario.name}</h3>
            </div>
            <button
              className="button button--secondary"
              type="button"
              onClick={() => onLoad(selectedScenario)}
            >
              Применить
            </button>
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

          <button
            className="button button--danger scenario-inspector__delete"
            type="button"
            onClick={() => onDelete(selectedScenario.id)}
          >
            Удалить сценарий
          </button>
        </section>
      )}
    </section>
  );
}
