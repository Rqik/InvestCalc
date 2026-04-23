# Fix audit findings across data safety, code quality, and responsive UX

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the repository guidance in `PLANS.md`. The project is a React 18, TypeScript, Vite, Sass financial application with two hash-routed pages: the calculator page at `#calculator` and the retirement page at `#retirement`.

## Purpose / Big Picture

The recent audit found no critical security holes, but it identified data integrity risks, maintainability issues, and responsive UX problems. After this work, users should be able to clear and edit money fields comfortably, corrupted saved scenarios should not break the app, extreme numeric values should be bounded, goal progress text should be correct, financial projection formulas should be less duplicated, and mobile/tablet layouts should be easier to use.

The changes should preserve the current warm finance guidance tone. Calculations remain estimates based on assumptions, not financial guarantees.

## Progress

- [x] (2026-04-22 22:00 MSK) Read the audit findings and repository planning guidance.
- [x] (2026-04-22 22:00 MSK) Created this ExecPlan before implementation.
- [x] (2026-04-22 22:35 MSK) Re-read the current `master`-based files after the user asked to fix all audit findings.
- [x] (2026-04-22 22:52 MSK) Fixed data safety and input integrity findings in `MoneyInput`, `NumberInput`, `normalize`, `storage`, and `useScenarios`.
- [x] (2026-04-22 22:52 MSK) Fixed code quality/navigation findings by centralizing page routes, correcting goal gap copy, sharing projection helpers, and removing the unused view switcher component.
- [x] (2026-04-22 22:52 MSK) Fixed responsive findings for mobile chart density, scenario-list nested scroll, table row context, tablet grids, and mobile layout order.
- [x] (2026-04-22 22:55 MSK) Updated `CHANGELOG.md` with a short top entry.
- [x] (2026-04-22 22:57 MSK) Ran `npm run build`; it passed after one TypeScript nullability fix in `useScenarios`.

## Surprises & Discoveries

- Observation: The repository has `PLANS.md` at the project root, while `AGENTS.md` refers to `.agent/PLANS.md`.
  Evidence: `cmd /c "if exist .agent\PLANS.md ... else if exist PLANS.md ..."` printed the root `PLANS.md`.

- Observation: After pulling `master`, `src/App.tsx` now also manages theme state and `src/components/WorkspaceNav.tsx` exists with page/section navigation.
  Evidence: Reading `src/App.tsx` showed `ThemeMode` and `window.history.pushState`; reading `WorkspaceNav.tsx` showed both calculator and retirement page items plus shared help links.

- Observation: `MoneyInput` was the only caller of `parseFormattedNumber`, so changing the parser to return `null` for ambiguous values only required updating that component.
  Evidence: `rg -n "parseFormattedNumber" src` showed references in `src/utils/format.ts` and `src/components/MoneyInput.tsx`.

## Decision Log

- Decision: Use three parallel worker agents with disjoint write responsibilities.
  Rationale: The user explicitly requested agents, and the audit naturally splits into data safety, calculation/code quality, and responsive UX.
  Date/Author: 2026-04-22 / Codex.

- Decision: Keep the plan in `.agent/audit-fixes-execplan.md`.
  Rationale: The user asked to use ExecPlans and the referenced `.agent` folder did not exist, so creating the plan there makes future agent guidance discoverable.
  Date/Author: 2026-04-22 / Codex.

- Decision: Implement the current fix pass locally rather than spawning new agents.
  Rationale: The user explicitly requested agents for the audit, but the current request is to fix all errors. The active agent instructions only allow spawning subagents when the user explicitly asks for delegation in this turn.
  Date/Author: 2026-04-22 / Codex.

- Decision: Keep page navigation hashes for pages and known section hashes for reload detection, but make sidebar section navigation scroll by DOM id without changing the hash.
  Rationale: This preserves direct page links while removing the practical conflict where section links on the wrong page could switch or reload to the wrong experience.
  Date/Author: 2026-04-22 / Codex.

## Outcomes & Retrospective

The audit fix pass is complete. The project now clamps extreme numeric values, lets money fields be cleared while editing, validates saved scenarios before rendering, protects scenario persistence from storage exceptions, removes the missing-section links from the retirement navigation, shares monthly projection helpers, improves mobile chart/table behavior, removes the unused `ViewSwitcher`, and records the change in `CHANGELOG.md`. `npm run build` passes; the existing Sass legacy API and Vite chunk-size warnings remain.

## Context and Orientation

`src/App.tsx` switches between pages using `window.location.hash`. The calculator page lives in `src/pages/CalculatorPage.tsx`; the retirement page lives in `src/pages/RetirementPage.tsx`. Shared visual components live in `src/components`, and retirement-specific components live in `src/components/retirement`.

Financial calculations are currently split between `src/utils/calculations.ts` for the calculator and `src/utils/retirement.ts` for the retirement page. Inputs are normalized by `src/utils/normalize.ts`; saved calculator scenarios are loaded and saved by `src/utils/storage.ts`; money parsing and display formatting live in `src/utils/format.ts`.

Styles are Sass partials under `src/styles`, imported by `src/styles/main.scss`. Responsive rules are centralized mostly in `src/styles/_responsive.scss`.

## Plan of Work

First, fix data safety. Update money inputs so they can be fully cleared while editing. Add stricter number normalization with upper bounds for money, years, months, rates, retirement ages, and scenario names. Harden `localStorage` loading by parsing unknown data, validating scenario shape, filtering invalid records, and avoiding crashes when storage is corrupted. Wrap scenario saving so quota errors do not break the app.

Second, fix code quality and calculation consistency. Correct the goal gap text in `ResultsGrid`. Extract shared compounding/projection helpers so calculator and retirement calculations use one implementation for monthly compounding and indexed contributions. Centralize route metadata and common Russian duration/year formatting where it is safe to do so.

Third, fix responsive UX. Tune the chart for small screens by reducing axis width and margins and shortening money labels. Improve yearly-plan mobile readability with sticky first column or a mobile-friendly alternative. Avoid collapsing all tablet grids to one column too early. Remove nested scenario-list scroll on mobile while keeping the desktop sidebar tidy.

Finally, update `CHANGELOG.md` with a very short top entry and run `npm run build`.

## Concrete Steps

Work in `D:\myproject\New project`.

Implement the fixes locally in small groups: data/input integrity first, navigation and calculation copy second, responsive UX third. Then run:

    cmd /c "npm run build"

Expected successful build shape:

    > yield-calculator-mvp@0.0.2 build
    > tsc -b && vite build
    ✓ built in ...

Existing Sass legacy API and Vite bundle-size warnings may remain unless directly addressed.

Build result from this pass:

    > yield-calculator-mvp@0.0.2 build
    > tsc -b && vite build
    ✓ built in 3.92s

The build also printed the existing Dart Sass legacy JS API deprecation warning and Vite chunk-size warning.

## Validation and Acceptance

The build must pass. Manual acceptance criteria:

Money inputs can be cleared to an empty field while typing and then committed to a safe value on blur. A corrupted `localStorage` scenario entry does not crash the app. Very large values are clamped or safely rejected before calculations can hang the UI. Calculator goal progress labels correctly distinguish surplus from shortfall. The chart and yearly plan are usable at about 360px wide, and tablet layouts do not collapse into unnecessarily long one-column screens.

## Idempotence and Recovery

All changes should be source edits only. Re-running the build is safe. If a worker touches an overlapping file unexpectedly, review the diff before applying further edits. Do not delete user data or reset Git history.

## Artifacts and Notes

Audit findings came from three agents:

    Security: localStorage validation, numeric limits, storage quota handling, money parser ambiguity.
    Code quality: MoneyInput clearability, duplicated compounding logic, reversed goal gap copy, duplicated route/pluralization rules.
    Responsive: chart mobile width, yearly-plan table, tablet grids, scenario-list nested scroll.

## Interfaces and Dependencies

Do not add new runtime dependencies unless necessary. Continue using React 18, TypeScript, Vite, Sass, and Recharts. Any new helper should be plain TypeScript and live under `src/utils` or `src/constants`.
