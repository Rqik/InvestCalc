export function HelpPanels() {
  return (
    <section className="help-panels" aria-label="Справка по расчету">
      <article id="methodology" className="panel help-card">
        <div className="section-header">
          <h2 className="section-header__title">Методика</h2>
          <p className="section-header__description">
            Расчет строится на ежегодной капитализации, регулярных пополнениях,
            индексации взноса и поправке результата на инфляцию.
          </p>
        </div>
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
      </article>

      <article id="examples" className="panel help-card">
        <div className="section-header">
          <h2 className="section-header__title">Примеры</h2>
          <p className="section-header__description">
            Сравнивайте базовый, осторожный и агрессивный сценарии, чтобы видеть
            чувствительность плана к сроку, доходности и размеру взноса.
          </p>
        </div>
        <div className="help-card__example-grid">
          <span>Осторожный: ниже доходность, выше запас по сроку.</span>
          <span>Базовый: реалистичные ожидания и регулярная индексация.</span>
          <span>Ускоренный: больший взнос при том же горизонте.</span>
        </div>
      </article>

      <article id="faq" className="panel help-card">
        <div className="section-header">
          <h2 className="section-header__title">FAQ</h2>
          <p className="section-header__description">
            Главное правило: смотрите не только на итоговую сумму, но и на разрыв
            с целью, реальную стоимость денег и требуемый ежемесячный шаг.
          </p>
        </div>
        <div className="help-card__qa">
          <h3>Почему прогноз и сегодняшние деньги отличаются?</h3>
          <p>Инфляция снижает покупательную способность будущего капитала.</p>
          <h3>Что делать, если цель недостижима?</h3>
          <p>Увеличить срок, поднять регулярный взнос или снизить целевую сумму.</p>
        </div>
      </article>
    </section>
  );
}
