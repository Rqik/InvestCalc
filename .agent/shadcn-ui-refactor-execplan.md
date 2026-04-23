# Connect shadcn-style UI components and migrate core screens

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `AGENTS.md` and `PLANS.md` in the repository root. The project is a React 18, TypeScript, Vite, Sass financial app with calculator and retirement pages.

## Purpose / Big Picture

The user wants to connect “shandi ui”, which is interpreted as shadcn/ui, and rewrite the app to use its component approach. After this change, reusable UI primitives such as buttons, cards, inputs, labels, badges, alerts, and separators should live under `src/components/ui`, and page components should compose those primitives instead of hardcoding repeated panel/button/input markup everywhere. The app should keep its current visual tone and Sass theme tokens while becoming easier to extend with new pages.

## Progress

- [x] (2026-04-23 00:00 MSK) Read `AGENTS.md`, current package scripts, source structure, and official shadcn/ui Vite guidance.
- [x] (2026-04-23 00:00 MSK) Created this ExecPlan before implementation.
- [x] (2026-04-23 00:10 MSK) Added shadcn-compatible config, utilities, base UI primitives, and Sass styles.
- [x] (2026-04-23 00:18 MSK) Migrated shared controls and navigation to `Button`, `Input`, `Label`, `Card`, `Alert`, and `Badge`.
- [x] (2026-04-23 00:22 MSK) Migrated calculator and retirement panels to UI primitives without changing calculations.
- [x] (2026-04-23 00:25 MSK) Updated Sass imports/styles and added a short top entry to `CHANGELOG.md`.
- [x] (2026-04-23 14:25 MSK) Re-read `PLANS.md`, `package.json`, and the current shadcn setup before continuing the larger migration requested by the user.
- [x] (2026-04-23 14:29 MSK) Installed the real Tailwind and shadcn runtime dependencies required by official `shadcn/ui` components.
- [x] (2026-04-23 14:31 MSK) Fetched the official docs references for `button`, `card`, `input`, `label`, `alert`, `badge`, and `separator`.
- [x] (2026-04-23 14:32 MSK) Replaced the local lookalike `src/components/ui/*` files with official shadcn-generated component sources via the CLI.
- [x] (2026-04-23 14:42 MSK) Added Tailwind v4 integration for Vite, created `src/index.css`, switched `components.json` to the real CSS entry, and updated `cn()` to the official `clsx` + `tailwind-merge` pattern.
- [x] (2026-04-23 14:48 MSK) Added a thin compatibility layer so the current app still works with `Card as="..."`, `Alert variant="warning"`, `Button variant="primary"`, and the footer/mobile styles.
- [x] (2026-04-23 14:51 MSK) Ran `cmd /c npm run build`; fixed the Windows alias path issue in `vite.config.ts`; reran the build successfully.
- [x] (2026-04-23 16:05 MSK) User changed direction and asked to remove Tailwind while preserving the current `ui` component API.
- [x] (2026-04-23 16:14 MSK) Rewrote `src/components/ui/*` away from Tailwind utility classes and restored a Sass-backed `src/styles/_ui.scss` layer.
- [ ] Remove Tailwind-specific dependencies and generated CSS entrypoints, then run `npm run build` and confirm the Sass deprecation warning is gone.

## Surprises & Discoveries

- Observation: Official shadcn/ui Vite docs now center Tailwind v4, but this project already has Sass and shadcn-compatible CSS variables.
  Evidence: `src/styles/_base.scss` defines tokens such as `--background`, `--card`, `--primary`, `--border`, and `--radius`.
- Observation: The earlier "shadcn-style" pass left a compatibility API that the app now depends on, especially `Card as="section"` and custom alert/button variants.
  Evidence: `src/components/InputPanel.tsx`, `src/components/ScenarioPanel.tsx`, and the retirement panels still render `Card` with `as="..."`, `Alert variant="warning"`, and `Button variant="primary"`.
- Observation: The previous Vite alias implementation used `new URL(...).pathname`, which breaks on Windows and produced a duplicated drive prefix during the final bundle step.
  Evidence: The first production build failed with `Could not load /D:/... src/lib/utils` until the alias switched to `fileURLToPath(new URL('./src', import.meta.url))`.
- Observation: Removing Tailwind does not require undoing the page-level refactor because the pages consume the `ui` components by API, not by Tailwind class strings directly.
  Evidence: Tailwind-specific code is concentrated in `src/components/ui/*`, `src/index.css`, `src/lib/utils.ts`, `vite.config.ts`, and package dependencies, while consumers mainly import `Button`, `Card`, `Input`, `Alert`, `Badge`, `Label`, and `Separator`.

## Decision Log

- Decision: Interpret “shandi ui” as shadcn/ui.
  Rationale: There is no obvious common library named “shandi ui”, while shadcn/ui is a widely used React component system with a similar pronunciation.
  Date/Author: 2026-04-23 / Codex.

- Decision: Add shadcn-style local components without migrating the whole project to Tailwind in this pass.
  Rationale: A full Tailwind migration would be a large styling rewrite. The project already uses Sass and compatible CSS variables, so local primitives can deliver the shadcn component model safely while preserving the existing design system.
  Date/Author: 2026-04-23 / Codex.

- Decision: Upgrade the repository to real shadcn/ui by installing the official dependencies and generating source files through the shadcn CLI, then add a thin compatibility layer where the app still relies on the older API.
  Rationale: The user explicitly asked for actual shadcn/ui rather than shadcn-like stand-ins. Preserving only the small compatibility surface avoids a risky full-page rewrite while still making the UI layer genuine shadcn source.
  Date/Author: 2026-04-23 / Codex.

- Decision: Remove Tailwind from the build and keep the existing `ui` component API, implementing those components with Sass classes instead.
  Rationale: The user wants Tailwind gone, but keeping the component API avoids unnecessary churn in the calculator and retirement pages. This narrows the refactor to the UI primitive layer and build configuration.
  Date/Author: 2026-04-23 / Codex.

## Outcomes & Retrospective

This section will be updated after the real shadcn/ui migration is integrated and validated. At this checkpoint, the project now has the official shadcn dependencies installed and generated component source files in place, but the app still needs a compatibility pass and a build verification before the work can be considered complete.
The migration is now functionally complete. The repository uses real shadcn-generated source files, Tailwind v4 is integrated into Vite, the existing financial pages still render through the compatibility layer, and `npm run build` passes. Remaining follow-up is optional: if the team wants a purer shadcn codebase later, they can gradually remove the compatibility surface (`Card as`, custom alert/button aliases, and old Sass assumptions) page by page.

This plan has now shifted again: the active objective is to preserve the `ui` abstraction while removing Tailwind from the pipeline entirely. The codebase is partway through that reversal: the Sass-backed primitives and config edits are in place, while dependency cleanup and final validation remain.

Revision note (2026-04-23 / Codex): Updated this plan because the user asked to replace the earlier shadcn-like layer with real shadcn/ui. The plan now records the completed official dependency installation, generated component replacement, compatibility adjustments, and successful build validation.
Revision note (2026-04-23 / Codex): Updated this plan again because the user then asked to remove Tailwind but keep the component API. The plan now tracks the Sass-based UI rewrite and pending dependency cleanup/validation.

## Context and Orientation

The app entry point is `src/App.tsx`. Page composition lives in `src/pages/CalculatorPage.tsx` and `src/pages/RetirementPage.tsx`. Shared components live in `src/components`, retirement-only components live in `src/components/retirement`, and Sass partials are imported by `src/styles/main.scss`.

Current UI markup uses CSS classes directly, for example `panel`, `button`, `form-field`, and `metric-card`. This refactor introduces reusable UI primitives under `src/components/ui` and gradually uses them from existing components. A UI primitive is a small reusable component such as `Button` or `Card` that owns consistent structure and class names.

## Plan of Work

First, add a `components.json` file and local helpers under `src/lib/utils.ts`. Add UI primitives under `src/components/ui`: `Button`, `Card`, `Input`, `Label`, `Badge`, `Alert`, and `Separator`. Add `src/styles/_ui.scss` to style those primitives with the existing CSS variables.

Second, migrate low-level shared controls: `MoneyInput`, `NumberInput`, `PageSwitcher`, `ThemeToggle`, and `WorkspaceNav`. These components should keep their behavior but render through UI primitives where practical.

Third, migrate major panels and cards: `AppLayout`, `InputPanel`, `ScenarioPanel`, `ResultsGrid`, `WorkspaceSummary`, `YearlyPlanTable`, `ExtraYearsPanel`, `HelpPanels`, and retirement panels. Keep existing domain logic and copy.

Finally, update `CHANGELOG.md` with a short top entry and run `cmd /c "npm run build"`.

## Concrete Steps

Work in `D:\myproject\New project`.

Add files:

    components.json
    src/lib/utils.ts
    src/components/ui/button.tsx
    src/components/ui/card.tsx
    src/components/ui/input.tsx
    src/components/ui/label.tsx
    src/components/ui/badge.tsx
    src/components/ui/alert.tsx
    src/components/ui/separator.tsx
    src/styles/_ui.scss

Run validation:

    cmd /c "npm run build"

Expected successful build shape:

    > yield-calculator-mvp@0.0.2 build
    > tsc -b && vite build
    ✓ built in ...

## Validation and Acceptance

The build must pass. The calculator page and retirement page must still render through `#calculator` and `#retirement`. Money and number inputs must remain clearable. Saved scenarios, theme switching, sidebar navigation, graphs, tables, and retirement recommendations must keep working. Visual styling should remain consistent but components should now use the `src/components/ui` primitives.

## Idempotence and Recovery

All edits are source changes and can be repeated safely. Do not reset Git history or delete user data. If build fails, fix TypeScript or import errors before stopping.

## Artifacts and Notes

Official shadcn/ui docs for Vite describe `components.json`, aliases, generated components, and Tailwind configuration. This project uses the copy/local component model because it is already Sass-based and has matching CSS variables.

## Interfaces and Dependencies

Avoid adding runtime dependencies unless a primitive needs them. Components should accept normal React HTML attributes and optional `className`. Use relative imports to avoid requiring a TypeScript alias migration in this pass.
