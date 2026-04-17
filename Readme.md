# Yield Calculator MVP

React + TypeScript MVP для расчета накоплений, требуемого ежемесячного взноса и ориентировочной доходности.

README написан как handoff-документ: чтобы другой ИИ или разработчик мог быстро продолжить работу без долгого изучения проекта.

## Что делает приложение

- считает итоговый капитал к концу выбранного срока;
- считает, сколько нужно откладывать в месяц при заданной доходности;
- считает, какая доходность нужна при текущем ежемесячном взносе;
- показывает годовой план накоплений;
- показывает график роста капитала по годам;
- показывает, сколько можно получить, если подождать еще `+1`, `+2`, `+3` года;
- сохраняет сценарии в `localStorage`.

## Текущий стек

- `React 18`
- `TypeScript`
- `Vite`
- `SCSS`

## Структура проекта

```text
src/
  components/
    ExtraYearsPanel.tsx
    GrowthChart.tsx
    InputPanel.tsx
    MoneyInput.tsx
    NumberInput.tsx
    ResultsGrid.tsx
    ScenarioPanel.tsx
    ViewSwitcher.tsx
    YearlyPlanTable.tsx
  constants/
    defaults.ts
  styles/
    main.scss
    _base.scss
    _buttons.scss
    _chart.scss
    _extra-years.scss
    _forms.scss
    _hero.scss
    _layout.scss
    _metrics.scss
    _responsive.scss
    _scenarios.scss
    _yearly-plan.scss
  types/
    finance.ts
  utils/
    calculations.ts
    format.ts
    normalize.ts
    storage.ts
  App.tsx
  main.tsx
  vite-env.d.ts
```

## Архитектурные решения

### 1. Расчеты вынесены в чистые функции

Основная бизнес-логика лежит в:

- [src/utils/calculations.ts](C:/Users/tabas/OneDrive/Документы/New%20project/src/utils/calculations.ts)
- [src/utils/normalize.ts](C:/Users/tabas/OneDrive/Документы/New%20project/src/utils/normalize.ts)
- [src/utils/format.ts](C:/Users/tabas/OneDrive/Документы/New%20project/src/utils/format.ts)
- [src/utils/storage.ts](C:/Users/tabas/OneDrive/Документы/New%20project/src/utils/storage.ts)

Это сделано специально, чтобы:

- было проще тестировать расчеты отдельно от UI;
- можно было позже вынести логику в API или shared package;
- компонентам не приходилось держать сложную математику внутри JSX.

### 2. `App.tsx` выполняет роль orchestration-слоя

[src/App.tsx](C:/Users/tabas/OneDrive/Документы/New%20project/src/App.tsx) не должен разрастаться в “god component”.

Сейчас он:

- хранит state;
- собирает данные для экрана через `useMemo`;
- прокидывает props в UI-компоненты;
- управляет сценариями.

Если проект продолжать, следующий логичный шаг: вынести state и derived data в кастомный хук `useInvestmentCalculator`.

### 3. Стили переписаны на SCSS и BEM

Точка входа:

- [src/styles/main.scss](C:/Users/tabas/OneDrive/Документы/New%20project/src/styles/main.scss)

Подход:

- один SCSS partial на одну тематическую область;
- именование классов в BEM-стиле;
- без CSS-in-JS и без CSS modules;
- UI остается простым для поддержки и быстрой правки ИИ.

## Важные файлы и их роль

### UI

- [src/components/InputPanel.tsx](C:/Users/tabas/OneDrive/Документы/New%20project/src/components/InputPanel.tsx)
  Основная форма ввода.

- [src/components/ResultsGrid.tsx](C:/Users/tabas/OneDrive/Документы/New%20project/src/components/ResultsGrid.tsx)
  Карточки с ключевыми результатами.

- [src/components/GrowthChart.tsx](C:/Users/tabas/OneDrive/Документы/New%20project/src/components/GrowthChart.tsx)
  График роста по годам.
  Сейчас это CSS-based bar chart без сторонней библиотеки.

- [src/components/ExtraYearsPanel.tsx](C:/Users/tabas/OneDrive/Документы/New%20project/src/components/ExtraYearsPanel.tsx)
  Блок “если подождать еще”.

- [src/components/YearlyPlanTable.tsx](C:/Users/tabas/OneDrive/Документы/New%20project/src/components/YearlyPlanTable.tsx)
  Таблица накоплений по годам.

- [src/components/ScenarioPanel.tsx](C:/Users/tabas/OneDrive/Документы/New%20project/src/components/ScenarioPanel.tsx)
  Работа со сценариями через `localStorage`.

### Бизнес-логика

- [src/utils/calculations.ts](C:/Users/tabas/OneDrive/Документы/New%20project/src/utils/calculations.ts)
  Содержит:
  - `getFutureValue`
  - `getRequiredMonthlyContribution`
  - `getRequiredAnnualReturn`
  - `buildYearlyPlan`
  - `buildExtraYearProjections`
  - `getTotalInvested`

- [src/utils/storage.ts](C:/Users/tabas/OneDrive/Документы/New%20project/src/utils/storage.ts)
  Содержит работу с `localStorage` и генерацию имен сценариев.

## Текущее состояние проекта

### Уже сделано

- MVP собран;
- проект разбит на компоненты;
- расчеты вынесены в утилиты;
- SCSS структура добавлена;
- форматирование больших сумм работает;
- сценарии сохраняются;
- график роста добавлен;
- блок дополнительных лет добавлен.

### Проверки

Успешно:

- `tsc -b` проходит без ошибок.

Не завершено:

- `vite build` сейчас не проходит до конца без установленного SCSS-препроцессора.

## Важный блокер

На момент последней проверки сборка Vite падала с ошибкой:

`[vite:css] Preprocessor dependency "sass-embedded" not found`

Причина:

- в `package.json` добавлена SCSS-зависимость,
- но в локальном окружении она фактически еще не доустановлена.

Что сделать:

1. выполнить `npm install`
2. если Vite снова попросит именно embedded-версию, установить:
   `npm install -D sass-embedded`
3. затем снова запустить:
   `npm run build`

Примечание:

- в текущей среде у агента не было доступного `npm`, поэтому зависимость не была доустановлена автоматически;
- `node_modules` уже существует, но в нем нет нужного пакета для SCSS.

## Что стоит сделать следующим ИИ

Рекомендуемый порядок:

1. Довести окружение до рабочего состояния:
   установить `sass` или `sass-embedded`, затем прогнать `npm run build`.

2. Добавить тесты на чистые функции:
   в первую очередь на `getFutureValue`, `getRequiredMonthlyContribution`, `getRequiredAnnualReturn`, `buildYearlyPlan`.

3. Вынести state в кастомный хук:
   например `src/hooks/useInvestmentCalculator.ts`.

4. Улучшить график:
   текущий вариант без библиотек хороший для MVP, но позже можно перейти на `SVG` или на chart library.

5. Добавить экспорт сценариев:
   `JSON` или `CSV`.

6. Добавить настройки валюты:
   `RUB`, `USD`, `EUR`.

## Предположения и ограничения

- расчет использует ежемесячную капитализацию на базе годовой ставки;
- это ориентировочный финансовый калькулятор, а не инвестиционный совет;
- UI сейчас на русском языке;
- возможны артефакты отображения русских строк в Windows-консоли из-за кодировки, но сами файлы проекта должны храниться нормально.

## Команды

Когда окружение будет готово:

```bash
npm install
npm run dev
npm run build
```

## Если продолжать рефакторинг

Хорошее следующее направление:

- добавить `hooks/`;
- ввести `selectors` или отдельный слой derived state;
- покрыть расчеты unit-тестами;
- при необходимости сделать настройки сценария через URL query params для шаринга.

## Короткий handoff summary

Проект не заброшен и не “сырой хаос”: база уже собрана правильно.
Следующему ИИ не нужно переписывать все заново.
Главная практическая задача сейчас — доустановить SCSS-зависимость и прогнать финальную сборку, после чего можно спокойно улучшать тесты, UX и визуализацию.
