import type { Scenario } from '../types/finance';
import { formatMoney, formatScenarioDate } from '../utils/format';

type ScenarioPanelProps = {
  scenarioName: string;
  scenarios: Scenario[];
  onScenarioNameChange: (value: string) => void;
  onSave: () => void;
  onLoad: (scenario: Scenario) => void;
  onDelete: (scenarioId: string) => void;
};

export function ScenarioPanel({
  scenarioName,
  scenarios,
  onScenarioNameChange,
  onSave,
  onLoad,
  onDelete,
}: ScenarioPanelProps) {
  return (
    <section className="panel scenario-panel">
      <div className="section-header">
        <h2 className="section-header__title">Сценарии</h2>
        <p className="section-header__description">
          Хранятся в localStorage, поэтому останутся доступными только в этом браузере.
        </p>
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

      <div className="scenario-panel__list">
        {scenarios.length === 0 ? (
          <div className="scenario-panel__empty">
            Пока нет сохраненных сценариев. Сохраните первый вариант расчета.
          </div>
        ) : (
          scenarios.map((scenario) => (
            <article key={scenario.id} className="scenario-card">
              <div className="scenario-card__content">
                <strong className="scenario-card__title">{scenario.name}</strong>
                <small className="scenario-card__meta">
                  Цель {formatMoney(scenario.inputs.targetCapital)} за {scenario.inputs.years} лет
                </small>
                <small className="scenario-card__meta">
                  Сохранено {formatScenarioDate(scenario.createdAt)}
                </small>
              </div>

              <div className="scenario-card__actions">
                <button
                  className="button button--secondary"
                  type="button"
                  onClick={() => onLoad(scenario)}
                >
                  Загрузить
                </button>
                <button
                  className="button button--danger"
                  type="button"
                  onClick={() => onDelete(scenario.id)}
                >
                  Удалить
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
