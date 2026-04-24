# Refactor React Component Architecture

This ExecPlan is a living document. It follows the requirements in `PLANS.md` and must stay current while the refactor proceeds.

## Purpose / Big Picture

The project currently works, but most React components live as flat files and share global Sass partials. After this refactor, each component will have a predictable folder with its component, props type, local Sass module, and re-export. The calculator and retirement pages must look and behave the same through `#calculator` and `#retirement`; the visible proof of success is a clean `npm run build` and unchanged hash navigation.

## Progress

- [x] (2026-04-24) Inspected the current project structure, aliases, component files, global Sass partials, and major multi-component files.
- [x] (2026-04-24) Created this ExecPlan before mutating source files.
- [x] (2026-04-24) Move components, layouts, and pages into one-component folders with `Component.tsx`, `Component.types.ts`, `Component.module.scss`, and `index.ts`.
- [x] (2026-04-24) Split files that currently export multiple React components, especially shared UI primitives and `GrowthChart` internals.
- [x] (2026-04-24) Convert imports in `src` to `@/` aliases while keeping only local same-folder imports relative.
- [x] (2026-04-24) Keep or migrate Sass so the app compiles, interactive states remain accessible, and component class names stay BEM-shaped.
- [x] (2026-04-24) Update `CHANGELOG.md`.
- [x] (2026-04-24) Run build-equivalent checks and fix TypeScript or Sass errors.

## Surprises & Discoveries

- Observation: `@/*` is already configured in both Vite and TypeScript, but most source imports still use relative paths.
  Evidence: `vite.config.ts` and `tsconfig.app.json` define the alias; `rg "from '\\." src` shows many relative imports.
- Observation: Several UI primitive files export multiple React components from one file.
  Evidence: `src/components/ui/card.tsx` exports `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`; `src/components/ui/alert.tsx` exports three components.
- Observation: `git` is not available in this PowerShell environment.
  Evidence: `git status --short` failed with "Имя \"git\" не распознано".
- Observation: `npm` and normal `node` are not available in PATH, but a node executable exists inside Adobe Creative Cloud.
  Evidence: `npm run build` and `cmd /c node -v` failed; `C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe` successfully ran TypeScript and Vite.
- Observation: Vite needed elevated execution because esbuild child-process spawn was blocked by the sandbox.
  Evidence: direct Vite build failed with `spawn EPERM`; rerun with escalation completed successfully.

## Decision Log

- Decision: Preserve `src/App.tsx` as the entry router, but move theme type and theme initialization to `src/utils/theme.ts` and `src/types/theme.ts`.
  Rationale: `AGENTS.md` names `src/App.tsx` as the app entry router, while the requested plan asks to keep it thin.
  Date/Author: 2026-04-24 / Codex.
- Decision: Use narrow direct imports from component folders instead of creating one broad `src/components/index.ts`.
  Rationale: The requested architecture limits wide barrels and the React best-practices guidance favors avoiding broad barrel imports for bundle clarity.
  Date/Author: 2026-04-24 / Codex.
- Decision: Move global design primitives and Sass mixins only when doing so is necessary for compilation or component isolation.
  Rationale: This refactor must not change behavior or visual design; a staged Sass migration reduces risk while still giving every component an owned module file.
  Date/Author: 2026-04-24 / Codex.
- Decision: Place retirement components as top-level folders in `src/components` instead of nesting them under the old `src/components/retirement` folder.
  Rationale: The sandbox denied creating nested folders inside `src/components/retirement`; top-level folders still satisfy the maximum depth rule and keep imports simple.
  Date/Author: 2026-04-24 / Codex.
- Decision: Keep shared `Card` and `Alert` primitive folders as narrow compatibility barrels for their related subcomponents.
  Rationale: Existing call sites import related primitives together, and each actual React component still lives in its own folder and `.tsx` file.
  Date/Author: 2026-04-24 / Codex.

## Outcomes & Retrospective

Completed. The source tree now follows component folders for app components, pages, layout, and UI primitives. TypeScript and Vite build-equivalent checks pass; Vite still reports the pre-existing large chunk warning after minification.

## Context and Orientation

This is a React 18 + TypeScript + Vite app. `src/main.tsx` mounts `src/App.tsx`, and `src/App.tsx` chooses between `CalculatorPage` and `RetirementPage` using URL hashes. Components are currently mostly flat under `src/components`, retirement-specific components are under `src/components/retirement`, shared primitives are under `src/components/ui`, pages are under `src/pages`, and one layout shell is under `src/layouts`.

The goal is structural. Calculations in `src/utils`, hooks in `src/hooks`, constants in `src/constants`, and domain types in `src/types` should keep their behavior. A BEM block is the root CSS class for one component, such as `growth-chart`; elements use `growth-chart__legend`; modifiers use `growth-chart__toggle--active`.

## Plan of Work

First, create component folders and keep public component names stable. Move each existing `.tsx` into a same-named folder as `Component.tsx`, add `Component.types.ts`, `Component.module.scss`, and `index.ts`, then update imports to point at the folder via `@/`.

Second, split multi-component files. `Card` and its named subcomponents must each live in their own folder under `src/components/ui`. `Alert` and its named subcomponents must do the same. `GrowthChart` must keep the chart shell in `GrowthChart.tsx` and move `ChartTooltip` and `CrosshairCursor` into `GrowthChart/components`.

Third, move public prop types out of component files into `*.types.ts`. Local non-React helpers can live in `*.utils.ts` or `*.constants.ts` beside the component. Reusable hooks belong in `src/hooks`.

Fourth, convert source imports to `@/`. Relative imports should remain only for files in the same component folder, such as `./GrowthChart.types` and `./GrowthChart.module.scss`.

Fifth, update Sass modules and compile. Keep BEM class names and pseudo states. If a style migration risks visual regressions, preserve the existing global Sass partial until the component module is safely wired, but every component folder must still own a module file.

## Concrete Steps

Run all commands from `d:\myproject\New project`.

Use `rg --files src` to confirm the resulting source layout. Use `rg "from '\\.\\./|from \"\\.\\./" src` to find disallowed parent-relative imports. Run `npm run build` and expect TypeScript plus Vite to finish without errors.

## Validation and Acceptance

The refactor is accepted when `npm run build` succeeds, `src/App.tsx` still routes to both pages by hash, component folders exist with the required four files, and the UI behavior is preserved for editable inputs, saved scenarios, chart controls, theme toggle, and retirement calculations. No financial projection copy should be changed into a guarantee.

## Idempotence and Recovery

The work is structural and can be repeated by checking for existing folders before creating new ones. Because `git` is unavailable, avoid destructive resets and preserve unknown files. If a mechanical move creates a build error, fix imports and exports rather than reverting unrelated files.

## Artifacts and Notes

Validation evidence:

    & 'C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe' node_modules\typescript\bin\tsc -b
    # exited 0

    & 'C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe' node_modules\vite\bin\vite.js build
    # 835 modules transformed
    # built in 2.93s
    # warning: Some chunks are larger than 500 kB after minification

## Interfaces and Dependencies

Keep React 18, TypeScript strict mode, Vite, Sass, and Recharts. Do not add new runtime dependencies. Public component imports should remain semantically stable, for example `import { GrowthChart } from '@/components/GrowthChart';`, even though the physical implementation moves into a folder.
