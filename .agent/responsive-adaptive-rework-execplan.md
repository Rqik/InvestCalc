# Rebuild tablet and mobile adaptive behavior across the calculator workspace

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the repository guidance in `PLANS.md` at the repository root. The project is a React 18, TypeScript, Vite, Sass financial application with a calculator page at `#calculator` and a retirement page at `#retirement`.

## Purpose / Big Picture

The app currently behaves acceptably on full desktop and on very narrow phones, but it breaks down on in-between widths. Around tablet and narrow-laptop sizes, the fixed left sidebar and sticky input column continue to reserve desktop space, so the main content collapses into a thin vertical strip. On phones, some wide sections still try to preserve desktop layouts instead of switching to mobile-native representations.

The goal of this change is to make the layout responsive by design instead of by patchwork overrides. Desktop behavior stays as-is at large widths. Tablet mode becomes a stacked workspace without a fixed sidebar. Phone mode uses single-column content and mobile-specific rendering for wide structures like the yearly plan table.

## Progress

- [x] (2026-04-24 22:45 MSK) Re-read the current layout, responsive, chart, scenario, and yearly-plan styles and compared them against the broken tablet screenshot.
- [x] (2026-04-24 22:50 MSK) Confirmed the main structural problem is the desktop shell staying active too long because `.app` keeps left padding and `.app__sidebar` stays fixed until narrower widths.
- [x] (2026-04-24 23:02 MSK) Reworked the shared layout so tablet widths render navigation inline under the hero and remove the fixed left sidebar.
- [x] (2026-04-24 23:08 MSK) Added a mobile card renderer for the yearly plan and tightened responsive rules for chart controls, scenarios, help cards, summary chips, and action areas.
- [x] (2026-04-24 23:11 MSK) Updated `CHANGELOG.md` and ran `cmd /c "npm run build"`; it passed with the known Vite chunk-size warning.

## Surprises & Discoveries

- Observation: The desktop shell currently starts with `.app { padding-left: 290px; }`, which means the content is permanently offset for the fixed sidebar until a much later breakpoint.
  Evidence: `src/styles/_layout.scss`.

- Observation: The current adaptive rules already collapse some grids, but they do so after the main layout is already too narrow to be useful.
  Evidence: `src/styles/_responsive.scss` moves `results-panel__grid` to one column only at `720px`, while the screenshot failure happens much earlier.

- Observation: The yearly plan still only has a wide table renderer, so phone widths rely on horizontal overflow instead of a mobile-native representation.
  Evidence: `src/components/YearlyPlanTable.tsx` and `src/styles/_yearly-plan.scss`.

## Decision Log

- Decision: Tablet widths will use an inline navigation block inside content instead of the fixed left sidebar.
  Rationale: This preserves access to section jumps without sacrificing a third of the viewport width.
  Date/Author: 2026-04-24 / Codex.

- Decision: The input panel will remain sticky only on full desktop and become a normal flow section below desktop breakpoints.
  Rationale: Sticky form behavior is not worth the width loss on tablets and creates cramped content.
  Date/Author: 2026-04-24 / Codex.

- Decision: The yearly plan will get a separate mobile card view instead of relying only on horizontal scrolling.
  Rationale: The table is too dense for phones and the user explicitly highlighted adaptive usability issues rather than mere overflow.
  Date/Author: 2026-04-24 / Codex.

## Outcomes & Retrospective

The adaptive issue turned out to be primarily structural, not cosmetic. The fixed desktop shell stayed active too long, so the real fix was to move tablet widths onto a stacked layout with inline navigation and a normal-flow input panel. Once that was done, the remaining overflows became manageable with narrower grid rules and safer text wrapping.

The calculator and retirement pages now share one responsive layout strategy: full desktop keeps the fixed left navigation and sticky form, tablet collapses into an inline navigation plus stacked workspace, and phones get a single-column flow with a mobile-native yearly-plan renderer. `cmd /c "npm run build"` passes. The only remaining build note is the pre-existing Vite warning about the large JS chunk.
