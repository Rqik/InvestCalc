import React from 'react';
import type { MethodologyInsightTone } from '@/types/finance';
import { buildComparisonScenarios, buildMethodologyInsights } from '@/utils/help-panels';
import { formatMoney } from '@/utils/format';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import type { HelpPanelsProps } from './HelpPanels.types';

function getInsightClassName(tone: MethodologyInsightTone) {
  return `help-panels__insight help-panels__insight--${tone}`;
}

export function HelpPanels({ inputs, snapshot, onApplyExample }: HelpPanelsProps) {
  const methodologyInsights = React.useMemo(
    () => buildMethodologyInsights(inputs, snapshot),
    [inputs, snapshot],
  );
  const comparisonScenarios = React.useMemo(() => buildComparisonScenarios(inputs), [inputs]);

  return (
    <section className="help-panels" aria-label="Справка по расчету">
      <Card as="article" id="methodology" className="help-panels__card">
        <CardHeader>
          <CardTitle>Как читается ваш расчет</CardTitle>
          <CardDescription>
            Блок объясняет текущий сценарий простым языком: из чего складывается итог,
            где инфляция съедает запас и что сильнее всего двигает результат.
          </CardDescription>
        </CardHeader>
        {snapshot.isDurationInvalid ? (
          <Alert className="help-panels__warning" variant="warning">
            <AlertDescription>
              Сначала задайте срок больше 0 месяцев. Тогда блок сможет объяснить ваш план и
              показать полезное сравнение сценариев.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {inputs.inflationRate > inputs.annualReturn && (
              <Alert className="help-panels__warning" variant="warning">
                <AlertDescription>
                  Инфляция сейчас выше ожидаемой доходности. В такой конфигурации не стоит
                  слишком сильно ужимать жизнь ради далекой суммы: лучше держать комфортный
                  взнос и оставлять часть денег на жизнь сейчас.
                </AlertDescription>
              </Alert>
            )}

            <div className="help-panels__insights">
              {methodologyInsights.map((item, index) => (
                <article key={item.title} className={getInsightClassName(item.tone)}>
                  <div className="help-panels__insight-topline">
                    <span className="help-panels__insight-index">{index + 1}</span>
                    <h3 className="help-panels__insight-title">{item.title}</h3>
                  </div>
                  <p className="help-panels__insight-description">{item.description}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card as="article" id="examples" className="help-panels__card">
        <CardHeader>
          <CardTitle>Сравнение сценариев</CardTitle>
          <CardDescription>
            Карточки пересчитываются от ваших текущих вводных. Они не меняют план сами по
            себе, но любой вариант можно применить к форме одним действием.
          </CardDescription>
        </CardHeader>
        {snapshot.isDurationInvalid ? (
          <Alert className="help-panels__warning" variant="warning">
            <AlertDescription>
              Сравнение сценариев станет доступно, когда срок будет больше 0 месяцев.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="help-panels__comparison-grid">
            {comparisonScenarios.map((scenario) => {
              const hasGoalReserve = scenario.snapshot.goalGap >= 0;

              return (
                <Card
                  as="article"
                  key={scenario.id}
                  className={`help-panels__comparison-card ${scenario.isCurrent ? 'help-panels__comparison-card--current' : ''}`}
                >
                  <div className="help-panels__comparison-card-topline">
                    <div className="help-panels__comparison-card-title-wrap">
                      <h3 className="help-panels__comparison-card-title">{scenario.title}</h3>
                      <p className="help-panels__comparison-card-description">{scenario.description}</p>
                    </div>
                    <Badge variant={scenario.isCurrent ? 'secondary' : 'outline'}>
                      {scenario.badge}
                    </Badge>
                  </div>

                  <div className="help-panels__comparison-card-stats">
                    <div>
                      <span>Итоговый капитал</span>
                      <strong>{formatMoney(scenario.snapshot.projectedCapital)}</strong>
                    </div>
                    <div>
                      <span>{hasGoalReserve ? 'Запас к цели' : 'Разрыв до цели'}</span>
                      <strong
                        className={
                          hasGoalReserve
                            ? 'help-panels__comparison-card-goal help-panels__comparison-card-goal--positive'
                            : 'help-panels__comparison-card-goal help-panels__comparison-card-goal--negative'
                        }
                      >
                        {formatMoney(Math.abs(scenario.snapshot.goalGap))}
                      </strong>
                    </div>
                  </div>

                  <p className="help-panels__comparison-card-adjustment">{scenario.adjustmentLabel}</p>

                  {scenario.isCurrent ? (
                    <div className="help-panels__comparison-card-current-note">
                      Этот вариант уже используется в графике и расчетах.
                    </div>
                  ) : (
                    <div className="help-panels__comparison-card-actions">
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => onApplyExample(scenario.inputs)}
                      >
                        Применить к форме
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </Card>

      <Card as="article" id="faq" className="help-panels__card">
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
          <CardDescription>
            Главное правило: смотрите не только на итоговую сумму, но и на разрыв
            с целью, реальную стоимость денег и требуемый ежемесячный шаг.
          </CardDescription>
        </CardHeader>
        <div className="help-panels__qa">
          <h3>Почему прогноз и сегодняшние деньги отличаются?</h3>
          <p>Инфляция снижает покупательную способность будущего капитала.</p>
          <h3>Что делать, если цель недостижима?</h3>
          <p>Увеличить срок, поднять регулярный взнос или снизить целевую сумму.</p>
          <h3>Меняют ли карточки сравнения мой расчет автоматически?</h3>
          <p>Нет. Они только показывают варианты. Расчет меняется только после кнопки “Применить к форме”.</p>
        </div>
      </Card>
    </section>
  );
}




