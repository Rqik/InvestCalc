import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { formatMoney } from '@/utils/format';
import type { RetirementAdvicePanelProps } from './RetirementAdvicePanel.types';
import styles from './RetirementAdvicePanel.module.scss';

const AGE_MESSAGES = {
  young: {
    title: 'Ваш главный союзник - время',
    text:
      'Сейчас не обязательно давить на себя огромным взносом. Гораздо сильнее работает привычка: автоматический перевод, ежегодная индексация и спокойная диверсификация.',
  },
  middle: {
    title: 'Хороший момент собрать систему',
    text:
      'До пенсии еще есть пространство для маневра. Лучше всего работают регулярность, рост взноса вместе с доходом и честная проверка расходов раз в несколько месяцев.',
  },
  preRetirement: {
    title: 'Фокус на устойчивость',
    text:
      'Сейчас особенно важны запас ликвидности, понятный риск портфеля и реалистичный размер будущих выплат. План можно усилить без резких движений.',
  },
  retired: {
    title: 'Главное - бережный режим выплат',
    text:
      'Если пенсия уже близко или началась, задача меняется: меньше гонки за доходностью, больше контроля расходов, подушки и плавного снятия денег.',
  },
};

export function RetirementAdvicePanel({ inputs, plan }: RetirementAdvicePanelProps) {
  const ageMessage = AGE_MESSAGES[plan.ageGroup];
  const monthlyDelta = Math.max(0, plan.requiredMonthlyInvestment - inputs.monthlyInvestment);
  const firstStepText = plan.isAlreadyRetirementAge
    ? 'Если период выплат уже начался, начните с бережного бюджета: обязательные расходы, комфортные расходы и резерв отдельно. Так план становится спокойнее и предсказуемее.'
    : `Можно начать с прибавки около ${formatMoney(monthlyDelta)} к ежемесячному взносу или частично компенсировать разницу более поздним сроком/меньшим доходом.`;

  return (
    <Card as="section" className={styles.retirementAdvice}>
      <CardHeader>
        <CardTitle>Мягкие рекомендации</CardTitle>
        <CardDescription>
          Это не финансовый приговор, а спокойная навигация: что можно улучшить первым делом.
        </CardDescription>
      </CardHeader>

      <div className={styles.retirementAdvice__grid}>
        <Card
          as="article"
          className={cn(
            styles.retirementAdvice__card,
            styles['retirementAdvice__card--highlight'],
          )}
        >
          <span className={styles.retirementAdvice__eyebrow}>По вашему возрасту</span>
          <h3 className={styles.retirementAdvice__cardTitle}>{ageMessage.title}</h3>
          <p className={styles.retirementAdvice__cardText}>{ageMessage.text}</p>
        </Card>

        <Card as="article" className={styles.retirementAdvice__card}>
          <span className={styles.retirementAdvice__eyebrow}>Первый шаг</span>
          <h3 className={styles.retirementAdvice__cardTitle}>
            {plan.isOnTrack ? 'Сохраняйте темп' : 'Подкрутите план мягко'}
          </h3>
          <p className={styles.retirementAdvice__cardText}>
            {plan.isOnTrack
              ? 'Текущий маршрут уже выглядит достойно. Следующий уровень - запас на здоровье, непредвиденные расходы и более низкий риск ближе к пенсии.'
              : firstStepText}
          </p>
        </Card>

        <Card as="article" className={styles.retirementAdvice__card}>
          <span className={styles.retirementAdvice__eyebrow}>Очень важно</span>
          <h3 className={styles.retirementAdvice__cardTitle}>
            Подушка отдельно от инвестиций
          </h3>
          <p className={styles.retirementAdvice__cardText}>
            Держите 3-6 месяцев расходов в доступном резерве. Тогда инвестиции не придется продавать в плохой момент, и план будет психологически легче выдержать.
          </p>
        </Card>

        <Card as="article" className={styles.retirementAdvice__card}>
          <span className={styles.retirementAdvice__eyebrow}>Продолжительность жизни</span>
          <h3 className={styles.retirementAdvice__cardTitle}>Планируйте с запасом</h3>
          <p className={styles.retirementAdvice__cardText}>
            Средняя продолжительность жизни - это статистический ориентир, не личная граница. Росстат в среднем варианте прогноза ожидает около 79,8 года к 2045 году, поэтому горизонт 85-90 лет выглядит более бережным для личного плана.
          </p>
          <a
            className={styles.retirementAdvice__link}
            href="https://www.rosstat.gov.ru/folder/313/document/220709"
            target="_blank"
            rel="noopener noreferrer"
          >
            Источник: демографический прогноз Росстата
          </a>
        </Card>
      </div>
    </Card>
  );
}
