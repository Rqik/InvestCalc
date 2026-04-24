import { MONTHS_IN_YEAR } from '@/constants/defaults';
import { MAX_MONEY, MAX_PLAN_YEARS } from '@/constants/limits';
import type {
  ComparisonScenario,
  FinanceSnapshot,
  Inputs,
  MethodologyInsight,
} from '@/types/finance';
import { buildFinanceSnapshot, getNormalizedDuration, getTotalMonths } from './calculations';
import { formatDuration, formatMoney, formatPercent } from './format';

const CAUTIOUS_RETURN_DELTA = 3;
const CAUTIOUS_DURATION_BONUS_MONTHS = 24;
const ACCELERATED_CONTRIBUTION_MULTIPLIER = 1.2;
const MAX_DURATION_MONTHS = MAX_PLAN_YEARS * MONTHS_IN_YEAR + (MONTHS_IN_YEAR - 1);

function clampTotalMonths(totalMonths: number) {
  return Math.min(Math.max(totalMonths, 0), MAX_DURATION_MONTHS);
}

function withDuration(inputs: Inputs, totalMonths: number): Inputs {
  const normalizedDuration = getNormalizedDuration(clampTotalMonths(totalMonths));

  return {
    ...inputs,
    years: normalizedDuration.years,
    months: normalizedDuration.months,
  };
}

export function buildMethodologyInsights(
  inputs: Inputs,
  snapshot: FinanceSnapshot,
): MethodologyInsight[] {
  const indexedContributions = Math.max(snapshot.totalInvested - inputs.initialCapital, 0);
  const inflationLoss = Math.max(snapshot.projectedCapital - snapshot.realProjectedCapital, 0);
  const missingContribution = Math.max(snapshot.requiredContribution - inputs.monthlyContribution, 0);

  const actionInsight: MethodologyInsight =
    inputs.inflationRate > inputs.annualReturn
      ? {
          title: 'Когда лучше не ужимать жизнь ради плана',
          description:
            'Если инфляция обгоняет ожидаемую доходность, капитал растет медленнее цен. В такой конфигурации не стоит слишком сильно жертвовать качеством жизни ради далекой суммы: полезнее оставить комфортный взнос, а свободные деньги направлять и на жизнь сейчас.',
          tone: 'warning',
        }
      : snapshot.goalGap < 0
      ? snapshot.requiredReturn === null
        ? {
            title: 'Что сильнее всего сдвинет результат',
            description:
              'При текущем сроке и взносе даже очень высокая доходность не закрывает разрыв сама по себе. Практичнее добавить срок и увеличить ежемесячный шаг.',
            tone: 'danger',
          }
        : snapshot.requiredContribution > inputs.monthlyContribution
          ? {
              title: 'Что сильнее всего сдвинет результат',
              description: `Чтобы прийти к цели в тот же срок, нужен взнос около ${formatMoney(snapshot.requiredContribution)} в месяц. Это примерно на ${formatMoney(missingContribution)} больше текущего шага.`,
              tone: 'warning',
            }
          : {
              title: 'Что сильнее всего сдвинет результат',
              description: `В этом горизонте нужен средний доход около ${formatPercent(snapshot.requiredReturn)} вместо текущих ${formatPercent(inputs.annualReturn)}. Обычно надежнее добавить срок или взнос, чем рассчитывать только на более высокую доходность.`,
              tone: 'warning',
            }
      : inputs.inflationRate > 0 && snapshot.realProjectedCapital < inputs.targetCapital
        ? {
            title: 'Что сильнее всего сдвинет результат',
            description:
              'Номинально цель уже закрыта, но в сегодняшних деньгах запас тоньше. Если важен реальный комфорт, помогают индексация взноса и небольшой запас по сроку.',
            tone: 'warning',
          }
        : {
            title: 'Что сильнее всего сдвинет результат',
            description: `План уже выглядит рабочим: запас над целью около ${formatMoney(snapshot.goalGap)}. Дополнительную устойчивость обычно дают индексация взноса и небольшой запас по сроку.`,
            tone: 'good',
          };

  return [
    {
      title: 'Из чего складывается итог',
      description: `Стартовый капитал ${formatMoney(inputs.initialCapital)}, регулярные вложения ${formatMoney(indexedContributions)} и инвестиционный рост ${formatMoney(snapshot.investmentProfit)} вместе дают прогноз ${formatMoney(snapshot.projectedCapital)}.`,
      tone: 'neutral',
    },
    {
      title: 'Что остается в сегодняшних деньгах',
      description:
        inputs.inflationRate > 0
          ? `Номинальный итог составляет ${formatMoney(snapshot.projectedCapital)}, а с поправкой на инфляцию — около ${formatMoney(snapshot.realProjectedCapital)}. Потеря покупательной способности съедает примерно ${formatMoney(inflationLoss)}.`
          : `Инфляционная поправка не задана, поэтому номинальный и реальный результат сейчас совпадают: ${formatMoney(snapshot.projectedCapital)}.`,
      tone: inputs.inflationRate > 0 ? 'warning' : 'neutral',
    },
    {
      title: snapshot.goalGap >= 0 ? 'Запас над целью' : 'Разрыв до цели',
      description:
        snapshot.goalGap >= 0
          ? `По текущему сценарию план выше цели на ${formatMoney(snapshot.goalGap)}. Это запас, который помогает спокойнее переживать отклонения по доходности или сроку.`
          : `По текущему сценарию до цели не хватает ${formatMoney(Math.abs(snapshot.goalGap))}. Это не значит, что цель плохая: просто ей нужен другой срок, взнос или набор ожиданий.`,
      tone: snapshot.goalGap >= 0 ? 'good' : 'warning',
    },
    actionInsight,
  ];
}

export function buildComparisonScenarios(inputs: Inputs): ComparisonScenario[] {
  const totalMonths = getTotalMonths(inputs);

  if (totalMonths <= 0) {
    return [];
  }

  const cautiousInputs = withDuration(
    {
      ...inputs,
      annualReturn: Math.max(inputs.annualReturn - CAUTIOUS_RETURN_DELTA, 0),
    },
    totalMonths + CAUTIOUS_DURATION_BONUS_MONTHS,
  );

  const acceleratedInputs: Inputs = {
    ...inputs,
    monthlyContribution: Math.min(
      Math.round(inputs.monthlyContribution * ACCELERATED_CONTRIBUTION_MULTIPLIER),
      MAX_MONEY,
    ),
  };

  return [
    {
      id: 'cautious',
      title: 'Осторожный',
      badge: 'Больше времени',
      description:
        'Более сдержанная доходность и запас по сроку помогают видеть, как план чувствует себя без завышенных ожиданий.',
      adjustmentLabel: `Доходность ${formatPercent(cautiousInputs.annualReturn)}, срок ${formatDuration(cautiousInputs.years, cautiousInputs.months)}`,
      inputs: cautiousInputs,
      snapshot: buildFinanceSnapshot(cautiousInputs),
      isCurrent: false,
    },
    {
      id: 'current',
      title: 'Базовый',
      badge: 'Текущий план',
      description:
        'Это ваш текущий сценарий без изменений. От него удобно отталкиваться при сравнении более мягкого и более быстрого маршрута.',
      adjustmentLabel: `Взнос ${formatMoney(inputs.monthlyContribution)} и срок ${formatDuration(inputs.years, inputs.months)}`,
      inputs,
      snapshot: buildFinanceSnapshot(inputs),
      isCurrent: true,
    },
    {
      id: 'accelerated',
      title: 'Ускоренный',
      badge: 'Взнос +20%',
      description:
        'Тот же горизонт и та же доходность, но ежемесячный шаг выше примерно на 20%. Это показывает, насколько вклад пользователя двигает цель быстрее.',
      adjustmentLabel: `Взнос ${formatMoney(acceleratedInputs.monthlyContribution)} в месяц при том же сроке`,
      inputs: acceleratedInputs,
      snapshot: buildFinanceSnapshot(acceleratedInputs),
      isCurrent: false,
    },
  ];
}
