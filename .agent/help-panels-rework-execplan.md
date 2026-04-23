# Rebuild methodology and examples into live guidance and scenario comparison

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the repository guidance in `PLANS.md` at the repository root. The project is a React 18, TypeScript, Vite, Sass financial application with a calculator page at `#calculator` and a retirement page at `#retirement`.

## Purpose / Big Picture

The calculator currently ends with three help cards: `Методика`, `Примеры`, and `FAQ`. They explain the app, but they do not do much useful work for someone trying to decide what to change in their plan. After this change, the first help block will explain the current plan in plain Russian using the user’s real numbers, and the second block will compare three computed plan variants based on the current inputs. The user will be able to apply a comparison variant to the form with one click and immediately see the graph and results update.

The goal is not to change financial formulas. The goal is to make the existing formulas easier to understand and easier to act on.

## Progress

- [x] (2026-04-24 21:05 MSK) Re-read `PLANS.md`, existing ExecPlans, and the calculator page structure before implementation.
- [x] (2026-04-24 21:10 MSK) Inspected `HelpPanels`, `useFinanceModel`, `calculations`, `format`, and responsive styles to confirm the current help blocks are static.
- [x] (2026-04-24 21:22 MSK) Added a shared pure finance snapshot helper and new finance/help types so the page and comparison cards now use one calculation source.
- [x] (2026-04-24 21:28 MSK) Rebuilt `HelpPanels` into a data-driven component with live methodology copy, comparison cards, invalid-duration warnings, and unchanged FAQ behavior.
- [x] (2026-04-24 21:30 MSK) Wired the calculator page and sidebar labels to the new behavior and updated `CHANGELOG.md`.
- [x] (2026-04-24 21:33 MSK) Ran `cmd /c "npm run build"`; it passed with the existing Vite chunk-size warning.

## Surprises & Discoveries

- Observation: The current `Примеры` block is purely decorative text and does not compare any real scenario values.
  Evidence: `src/components/HelpPanels.tsx` renders three plain `<span>` items under `help-card__example-grid`.

- Observation: The calculator already exposes all values needed for a live explanation, but they are computed piecemeal inside `useFinanceModel`.
  Evidence: `src/hooks/useFinanceModel.ts` separately computes projected capital, real value, required contribution, required return, invested total, and yearly plan from the same `inputs`.

- Observation: `PLANS.md` is stored at the repository root, not under `.agent/PLANS.md`.
  Evidence: `cmd /c dir /a /b` shows `PLANS.md` at the root and `.agent` only contains prior ExecPlans.

- Observation: Refactoring `useFinanceModel` around a single pure snapshot helper simplified the help-block implementation without forcing changes to existing result/grid/chart consumers.
  Evidence: The calculator page still passes the same named properties (`projectedCapital`, `goalGap`, `requiredContribution`, `requiredReturn`, `yearlyPlan`) after the hook rewrite, and the build passed.

## Decision Log

- Decision: Keep `FAQ` read-only and only make `Методика` and `Примеры` data-driven.
  Rationale: The user specifically asked whether the help blocks should affect graphs and calculations. The best balance is explanation plus explicit comparison actions, not hidden behavior inside all help sections.
  Date/Author: 2026-04-24 / Codex.

- Decision: Introduce a pure shared finance snapshot helper rather than reusing the React hook from inside the comparison cards.
  Rationale: The user explicitly asked that comparison cards should not re-run the hook inside a list. A pure helper also keeps the calculation source of truth aligned between the main page and the comparison block.
  Date/Author: 2026-04-24 / Codex.

- Decision: Comparison scenarios will be derived from the current inputs rather than from hardcoded example values.
  Rationale: A comparison block is only useful if it answers “what would change for my plan right now?”
  Date/Author: 2026-04-24 / Codex.

- Decision: Keep the existing section ids `methodology` and `examples`, but rename the visible labels to clearer Russian copy (`Как читать` and `Сравнение`).
  Rationale: This improves the UX language without disturbing sidebar scrolling behavior or anchor wiring.
  Date/Author: 2026-04-24 / Codex.

## Outcomes & Retrospective

The change is complete. The help area at the bottom of the calculator is no longer decorative: the first card now explains the current plan in plain language from live data, and the second card now compares cautious, current, and accelerated variants derived from the current inputs. Only explicit `Применить к форме` actions change the graph and page calculations, which keeps the UI understandable and avoids hidden side effects.

The implementation reused existing formulas through a shared pure snapshot helper instead of duplicating finance logic in the help UI. `cmd /c "npm run build"` passes. The remaining follow-up, if desired later, is purely product polish: tuning the wording or visual emphasis of the comparison cards after real user feedback.

## Context and Orientation

The calculator page is assembled in `src/pages/CalculatorPage.tsx`. The page owns `inputs` state, calls `useFinanceModel(inputs)`, and passes the results into panels like `ResultsGrid`, `GrowthChart`, `ExtraYearsPanel`, `ScenarioPanel`, and `YearlyPlanTable`.

The current help area lives in `src/components/HelpPanels.tsx`. It renders three cards with fixed copy and no props. The left sidebar navigation lives in `src/components/WorkspaceNav.tsx`, where the labels `Методика`, `Примеры`, and `FAQ` scroll to those cards.

Financial calculations are implemented in `src/utils/calculations.ts`. The current React hook `src/hooks/useFinanceModel.ts` wraps those helpers and memoizes the results for the calculator page.

Shared types for calculator inputs and yearly plan rows live in `src/types/finance.ts`. Shared styles for the help cards and related layout live in `src/styles/_layout.scss` and `src/styles/_responsive.scss`.

## Plan of Work

First, add a shared finance snapshot type and pure helper. The helper will accept `Inputs` and return the same calculated outputs the page currently needs: total duration, projected capital, real projected capital, required contribution, required return, total invested, investment profit, goal gap, and the yearly plan. Then update `useFinanceModel` to consume that helper so there is one source of truth.

Second, add a new pure helper for the help section. It will derive two things from current inputs: a list of live methodology insights and a list of comparison scenarios. The methodology insights will explain the current plan in plain language. The comparison scenarios will represent cautious, current, and accelerated variants. The cautious variant will lower annual return by 3 percentage points and add 24 months. The accelerated variant will keep the same horizon and return but raise monthly contribution by 20 percent. The current variant will reflect the current form unchanged.

Third, rebuild `src/components/HelpPanels.tsx` so it accepts current `inputs`, a finance snapshot, and an apply callback. The component will render a live “how to read this plan” section, a “scenario comparison” grid with apply buttons for non-current variants, and the existing FAQ card. If the current duration is zero months, the live methodology and comparison block will show a calm warning instead of misleading comparisons.

Fourth, wire `src/pages/CalculatorPage.tsx` so applying a comparison scenario updates the form state and therefore refreshes the graph, results, summary, and yearly table. Update the sidebar labels in `src/components/WorkspaceNav.tsx` so the navigation reflects the renamed blocks. Update `CHANGELOG.md` with a short entry under the existing date heading for today.

## Concrete Steps

Work in `D:\myproject\New project`.

Create or update:

    .agent/help-panels-rework-execplan.md
    src/types/finance.ts
    src/utils/calculations.ts
    src/utils/help-panels.ts
    src/hooks/useFinanceModel.ts
    src/components/HelpPanels.tsx
    src/pages/CalculatorPage.tsx
    src/components/WorkspaceNav.tsx
    src/styles/_layout.scss
    src/styles/_responsive.scss
    CHANGELOG.md

Run validation:

    cmd /c "npm run build"

Expected successful build shape:

    > yield-calculator-mvp@0.0.2 build
    > tsc -b && vite build
    ✓ built in ...

The repository may still print the known Vite chunk-size warning. That warning is acceptable if the build otherwise succeeds.

Observed validation result from this implementation:

    > yield-calculator-mvp@0.0.2 build
    > tsc -b && vite build
    ✓ built in 2.48s

The build also printed the existing Vite chunk-size warning for the large bundled JavaScript asset.

## Validation and Acceptance

The build must pass. On the calculator page, editing any input should immediately change the “how to read this plan” content. The comparison section should show three calculated variants based on the current inputs, and the `Текущий план` card should match the current page results. Clicking `Применить к форме` on the cautious or accelerated card should update the input panel and refresh the graph, result cards, extra-years panel, and yearly table without manual reload. If the user sets the duration to `0 лет 0 месяцев`, the methodology block should show a friendly hint and the comparison section should avoid showing misleading scenario outputs.

## Idempotence and Recovery

These changes are source-only and safe to repeat. Re-running the build is safe. If a new helper causes the main page and comparison cards to diverge, revert to the shared helper as the only calculation entry point instead of duplicating logic in components.

## Artifacts and Notes

No external libraries are needed for this change. Reuse the existing UI primitives (`Card`, `Badge`, `Button`, `Alert`) and the existing formatting helpers in `src/utils/format.ts`.

## Interfaces and Dependencies

At the end of this work, `src/types/finance.ts` must define a shared finance snapshot type and a comparison scenario type. `src/components/HelpPanels.tsx` must accept props for current `inputs`, current snapshot, and `onApplyExample`. `src/utils/calculations.ts` must export a pure snapshot builder that uses the existing finance formulas rather than introducing any new formulas.

Revision note (2026-04-24 / Codex): Created this ExecPlan because the user asked to redesign the `Методика` and `Примеры` blocks and the repository requires ExecPlans for significant feature work.
Revision note (2026-04-24 / Codex): Updated the plan after implementation to record the new shared snapshot helper, the data-driven help panels, the renamed sidebar labels, and the successful production build result.
