# Refactor Sass blocks to match component boundaries

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

## Purpose / Big Picture

The current Sass layer still mixes generic visual blocks across multiple React components. Examples include `metric-card` being used by both calculator and retirement results, `summary-chip` being shared by workspace summary and yearly plan, `wait-card` living outside the `ExtraYearsPanel` namespace, and `help-card` / `comparison-card` splitting one component across multiple block names.

The goal is to align the styling architecture with the user’s rule: one component should own one BEM block. Shared visual patterns can still use Sass mixins, but the rendered class names should remain component-local.

## Progress

- [x] (2026-04-24 23:42 MSK) Audited component markup and mapped cross-component BEM block reuse.
- [x] (2026-04-24 23:50 MSK) Refactored calculator and retirement result cards to component-owned blocks with shared Sass mixins instead of shared rendered block names.
- [x] (2026-04-24 23:56 MSK) Refactored summary cards, extra-years cards, scenario warnings, and help panels to component-owned blocks.
- [x] (2026-04-24 23:58 MSK) Removed the old shared block selectors and verified the build with `cmd /c "npm run build"`.

## Decision Log

- Decision: Keep the React component boundaries as-is and change class names/styles around them instead of splitting components further.
  Rationale: The user asked for BEM ownership, not for a React component split.
  Date/Author: 2026-04-24 / Codex.

- Decision: Shared visual behavior may be kept through Sass mixins, but not through shared rendered block names.
  Rationale: This preserves maintainability while satisfying the “1 component = 1 block” rule.
  Date/Author: 2026-04-24 / Codex.

## Outcomes & Retrospective

The main cleanup was to stop using generic block names as rendered class names across different React components. `ResultsGrid`, `RetirementResultsGrid`, `WorkspaceSummary`, `YearlyPlanTable`, `ExtraYearsPanel`, `ScenarioPanel`, and `HelpPanels` now each use their own block namespace. To avoid a copy-paste explosion, repeated visual patterns were moved into Sass mixins rather than kept as shared BEM blocks.

The build passes after the refactor. The only remaining note is the existing Vite warning about the large bundled JavaScript chunk.
