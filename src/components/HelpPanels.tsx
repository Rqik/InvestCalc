import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export function HelpPanels() {
  return (
    <section className="help-panels" aria-label="Справка по расчету">
      <Card as="article" id="methodology" className="help-card">
        <CardHeader>
          <CardTitle>Методика</CardTitle>
          <CardDescription>
            Расчет строится на ежегодной капитализации, регулярных пополнениях,
            индексации взноса и поправке результата на инфляцию.
          </CardDescription>
        </CardHeader>
        <dl className="help-card__list">
          <div>
            <dt>Прогноз</dt>
            <dd>Сумма стартового капитала, пополнений и инвестиционного роста.</dd>
          </div>
          <div>
            <dt>Сегодняшние деньги</dt>
            <dd>Оценка будущего капитала с учетом потери покупательной способности.</dd>
          </div>
          <div>
            <dt>Нужная доходность</dt>
            <dd>Средняя годовая доходность, при которой текущий взнос достигает цели.</dd>
          </div>
        </dl>
      </Card>

      <Card as="article" id="examples" className="help-card">
        <CardHeader>
          <CardTitle>Примеры</CardTitle>
          <CardDescription>
            Сравнивайте базовый, осторожный и агрессивный сценарии, чтобы видеть
            чувствительность плана к сроку, доходности и размеру взноса.
          </CardDescription>
        </CardHeader>
        <div className="help-card__example-grid">
          <span>Осторожный: ниже доходность, выше запас по сроку.</span>
          <span>Базовый: реалистичные ожидания и регулярная индексация.</span>
          <span>Ускоренный: больший взнос при том же горизонте.</span>
        </div>
      </Card>

      <Card as="article" id="faq" className="help-card">
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
          <CardDescription>
            Главное правило: смотрите не только на итоговую сумму, но и на разрыв
            с целью, реальную стоимость денег и требуемый ежемесячный шаг.
          </CardDescription>
        </CardHeader>
        <div className="help-card__qa">
          <h3>Почему прогноз и сегодняшние деньги отличаются?</h3>
          <p>Инфляция снижает покупательную способность будущего капитала.</p>
          <h3>Что делать, если цель недостижима?</h3>
          <p>Увеличить срок, поднять регулярный взнос или снизить целевую сумму.</p>
        </div>
      </Card>
    </section>
  );
}
