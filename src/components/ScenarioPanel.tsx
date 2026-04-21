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
      <div className="section-header">
        <h2 className="section-header__title">Сохраненные сценарии</h2>
        <p className="section-header__description">
          Сохраняйте варианты, просматривайте их параметры и выбирайте нужный
          сценарий из списка перед загрузкой в форму.
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
            Пока нет сохраненных сценариев. Сохраните первый вариант расчета, и он
            появится в списке ниже.
          </div>
        ) : (
          scenarios.map((scenario) => {
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
                  <small className="scenario-card__meta">
                    Цель {formatMoney(scenario.inputs.targetCapital)} за{' '}
                    {formatDuration(scenario.inputs.years, scenarioMonths)}
                  </small>
                  <small className="scenario-card__meta">
                    Сохранено {formatScenarioDate(scenario.createdAt)}
                  </small>
                </div>
              </article>
            );
          })
        )}
      </div>

      {selectedScenario && (
        <section className="scenario-preview">
          <div className="section-header">
            <h3 className="section-header__title">Просмотр сценария</h3>
            <p className="section-header__description">
              Проверьте значения и примените выбранный сценарий в калькулятор одним
              нажатием.
            </p>
          </div>

          <div className="scenario-preview__grid">
            <div className="scenario-preview__item">
              <span className="scenario-preview__label">Название</span>
              <strong className="scenario-preview__value">{selectedScenario.name}</strong>
            </div>
            <div className="scenario-preview__item">
              <span className="scenario-preview__label">Цель по капиталу</span>
              <strong className="scenario-preview__value">
                {formatMoney(selectedScenario.inputs.targetCapital)}
              </strong>
            </div>
            <div className="scenario-preview__item">
              <span className="scenario-preview__label">Уже накоплено</span>
              <strong className="scenario-preview__value">
                {formatMoney(selectedScenario.inputs.initialCapital)}
              </strong>
            </div>
            <div className="scenario-preview__item">
              <span className="scenario-preview__label">Ежемесячный взнос</span>
              <strong className="scenario-preview__value">
                {formatMoney(selectedScenario.inputs.monthlyContribution)}
              </strong>
            </div>
            <div className="scenario-preview__item">
              <span className="scenario-preview__label">Срок</span>
              <strong className="scenario-preview__value">
                {formatDuration(selectedScenario.inputs.years, selectedScenario.inputs.months ?? 0)}
              </strong>
            </div>
            <div className="scenario-preview__item">
              <span className="scenario-preview__label">Доходность</span>
              <strong className="scenario-preview__value">
                {formatPercent(selectedScenario.inputs.annualReturn)}
              </strong>
            </div>
          </div>

          <div className="scenario-preview__actions">
            <button
              className="button button--secondary"
              type="button"
              onClick={() => onLoad(selectedScenario)}
            >
              Применить в форму
            </button>
            <button
              className="button button--danger"
              type="button"
              onClick={() => onDelete(selectedScenario.id)}
            >
              Удалить сценарий
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
