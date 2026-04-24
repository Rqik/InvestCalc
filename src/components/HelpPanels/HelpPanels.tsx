import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { MethodologyInsightTone } from '@/types/finance';
import { formatMoney } from '@/utils/format';
import { buildComparisonScenarios, buildMethodologyInsights } from '@/utils/help-panels';
import type { HelpPanelsProps } from './HelpPanels.types';
import styles from './HelpPanels.module.scss';

function getInsightClassName(tone: MethodologyInsightTone) {
  return cn(styles.helpPanels__insight, styles[`helpPanels__insight--${tone}`]);
}

export function HelpPanels({ inputs, snapshot, onApplyExample }: HelpPanelsProps) {
  const methodologyInsights = React.useMemo(
    () => buildMethodologyInsights(inputs, snapshot),
    [inputs, snapshot],
  );
  const comparisonScenarios = React.useMemo(() => buildComparisonScenarios(inputs), [inputs]);

  return (
    <section className={styles.helpPanels} aria-label="Справка по расчету">
      <Card as="article" id="methodology" className={styles.helpPanels__card}>
        <CardHeader>
          <CardTitle>Как читается ваш расчет</CardTitle>
          <CardDescription>
            Блок объясняет текущий сценарий простым языком: из чего складывается итог, где инфляция съедает запас и что сильнее всего двигает результат.
          </CardDescription>
        </CardHeader>
        {snapshot.isDurationInvalid ? (
          <Alert className={styles.helpPanels__warning} variant="warning">
            <AlertDescription>
              Сначала задайте срок больше 0 месяцев. Тогда блок сможет объяснить ваш план и показать полезное сравнение сценариев.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {inputs.inflationRate > inputs.annualReturn && (
              <Alert className={styles.helpPanels__warning} variant="warning">
                <AlertDescription>
                  Инфляция сейчас выше ожидаемой доходности. В такой конфигурации не стоит слишком сильно ужимать жизнь ради далекой суммы: лучше держать комфортный взнос и оставлять часть денег на жизнь сейчас.
                </AlertDescription>
              </Alert>
            )}

            <div className={styles.helpPanels__insights}>
              {methodologyInsights.map((item, index) => (
                <article key={item.title} className={getInsightClassName(item.tone)}>
                  <div className={styles.helpPanels__insightTopline}>
                    <span className={styles.helpPanels__insightIndex}>{index + 1}</span>
                    <h3 className={styles.helpPanels__insightTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.helpPanels__insightDescription}>{item.description}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card as="article" id="examples" className={styles.helpPanels__card}>
        <CardHeader>
          <CardTitle>Сравнение сценариев</CardTitle>
          <CardDescription>
            Карточки пересчитываются от ваших текущих вводных. Они не меняют план сами по себе, но любой вариант можно применить к форме одним действием.
          </CardDescription>
        </CardHeader>
        {snapshot.isDurationInvalid ? (
          <Alert className={styles.helpPanels__warning} variant="warning">
            <AlertDescription>
              Сравнение сценариев станет доступно, когда срок будет больше 0 месяцев.
            </AlertDescription>
          </Alert>
        ) : (
          <div className={styles.helpPanels__comparisonGrid}>
            {comparisonScenarios.map((scenario) => {
              const hasGoalReserve = scenario.snapshot.goalGap >= 0;

              return (
                <Card
                  as="article"
                  key={scenario.id}
                  className={cn(
                    styles.helpPanels__comparisonCard,
                    scenario.isCurrent && styles['helpPanels__comparisonCard--current'],
                  )}
                >
                  <div className={styles.helpPanels__comparisonCardTopline}>
                    <div className={styles.helpPanels__comparisonCardTitleWrap}>
                      <h3 className={styles.helpPanels__comparisonCardTitle}>{scenario.title}</h3>
                      <p className={styles.helpPanels__comparisonCardDescription}>
                        {scenario.description}
                      </p>
                    </div>
                    <Badge variant={scenario.isCurrent ? 'secondary' : 'outline'}>
                      {scenario.badge}
                    </Badge>
                  </div>

                  <div className={styles.helpPanels__comparisonCardStats}>
                    <div className={styles.helpPanels__comparisonCardStat}>
                      <span className={styles.helpPanels__comparisonCardStatLabel}>
                        Итоговый капитал
                      </span>
                      <strong className={styles.helpPanels__comparisonCardStatValue}>
                        {formatMoney(scenario.snapshot.projectedCapital)}
                      </strong>
                    </div>
                    <div className={styles.helpPanels__comparisonCardStat}>
                      <span className={styles.helpPanels__comparisonCardStatLabel}>
                        {hasGoalReserve ? 'Запас к цели' : 'Разрыв до цели'}
                      </span>
                      <strong
                        className={cn(
                          styles.helpPanels__comparisonCardStatValue,
                          styles.helpPanels__comparisonCardGoal,
                          hasGoalReserve
                            ? styles['helpPanels__comparisonCardGoal--positive']
                            : styles['helpPanels__comparisonCardGoal--negative'],
                        )}
                      >
                        {formatMoney(Math.abs(scenario.snapshot.goalGap))}
                      </strong>
                    </div>
                  </div>

                  <p className={styles.helpPanels__comparisonCardAdjustment}>
                    {scenario.adjustmentLabel}
                  </p>

                  {scenario.isCurrent ? (
                    <div className={styles.helpPanels__comparisonCardCurrentNote}>
                      Этот вариант уже используется в графике и расчетах.
                    </div>
                  ) : (
                    <div className={styles.helpPanels__comparisonCardActions}>
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

      <Card as="article" id="faq" className={styles.helpPanels__card}>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
          <CardDescription>
            Главное правило: смотрите не только на итоговую сумму, но и на разрыв с целью, реальную стоимость денег и требуемый ежемесячный шаг.
          </CardDescription>
        </CardHeader>
        <div className={styles.helpPanels__qa}>
          <h3 className={styles.helpPanels__qaTitle}>
            Почему прогноз и сегодняшние деньги отличаются?
          </h3>
          <p className={styles.helpPanels__qaText}>
            Инфляция снижает покупательную способность будущего капитала.
          </p>
          <h3 className={styles.helpPanels__qaTitle}>
            Что делать, если цель недостижима?
          </h3>
          <p className={styles.helpPanels__qaText}>
            Увеличить срок, поднять регулярный взнос или снизить целевую сумму.
          </p>
          <h3 className={styles.helpPanels__qaTitle}>
            Меняют ли карточки сравнения мой расчет автоматически?
          </h3>
          <p className={styles.helpPanels__qaText}>
            Нет. Они только показывают варианты. Расчет меняется только после кнопки
            {' '}
            "Применить к форме".
          </p>
        </div>
      </Card>
    </section>
  );
}
