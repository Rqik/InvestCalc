import type { RetirementInputs, RetirementPlan } from '../../types/retirement';
import { formatMoney } from '../../utils/format';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

type RetirementAdvicePanelProps = {
  inputs: RetirementInputs;
  plan: RetirementPlan;
};

const AGE_MESSAGES = {
  young: {
    title: 'Ваш главный союзник — время',
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
    title: 'Главное — бережный режим выплат',
    text:
      'Если пенсия уже близко или началась, задача меняется: меньше гонки за доходностью, больше контроля расходов, подушки и плавного снятия денег.',
  },
};

export function RetirementAdvicePanel({ inputs, plan }: RetirementAdvicePanelProps) {
  const ageMessage = AGE_MESSAGES[plan.ageGroup];
  const monthlyDelta = Math.max(0, plan.requiredMonthlyInvestment - inputs.monthlyInvestment);
  const firstStepText = plan.isAlreadyRetirementAge
    ? 'Если период выплат уже начался, начните с бережного бюджета: обязательные расходы, комфортные расходы и резерв отдельно. Так план становится спокойнее и предсказуемее.'
    : `Можно начать с прибавки около ${formatMoney(monthlyDelta)} к ежемесячному взносу или частично компенсировать разницу более поздним сроком/меньшим допдоходом.`;

  return (
    <Card as="section" className="retirement-advice">
      <CardHeader>
        <CardTitle>Мягкие рекомендации</CardTitle>
        <CardDescription>
          Это не финансовый приговор, а спокойная навигация: что можно улучшить первым делом.
        </CardDescription>
      </CardHeader>

      <div className="retirement-advice__grid">
        <Card as="article" className="retirement-advice__card retirement-advice__card--highlight">
          <span className="retirement-advice__eyebrow">По вашему возрасту</span>
          <h3>{ageMessage.title}</h3>
          <p>{ageMessage.text}</p>
        </Card>

        <Card as="article" className="retirement-advice__card">
          <span className="retirement-advice__eyebrow">Первый шаг</span>
          <h3>{plan.isOnTrack ? 'Сохраняйте темп' : 'Подкрутите план мягко'}</h3>
          <p>
            {plan.isOnTrack
              ? 'Текущий маршрут уже выглядит достойно. Следующий уровень — запас на здоровье, непредвиденные расходы и более низкий риск ближе к пенсии.'
              : firstStepText}
          </p>
        </Card>

        <Card as="article" className="retirement-advice__card">
          <span className="retirement-advice__eyebrow">Очень важно</span>
          <h3>Подушка отдельно от инвестиций</h3>
          <p>
            Держите 3-6 месяцев расходов в доступном резерве. Тогда инвестиции не придется
            продавать в плохой момент, и план будет психологически легче выдержать.
          </p>
        </Card>

        <Card as="article" className="retirement-advice__card">
          <span className="retirement-advice__eyebrow">Продолжительность жизни</span>
          <h3>Планируйте с запасом</h3>
          <p>
            Средняя продолжительность жизни — это статистический ориентир, не личная граница.
            Росстат в среднем варианте прогноза ожидает около 79,8 года к 2045 году, поэтому
            горизонт 85-90 лет выглядит более бережным для личного плана.
          </p>
          <a
            className="retirement-advice__link"
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
