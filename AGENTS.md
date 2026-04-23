# AGENTS.md

## Project Stack
- React 18 + TypeScript + Vite.
- Styling: Sass partials imported from `src/styles/main.scss`; Tailwind is not used.
- Charts: Recharts.
- State is local React state; saved scenarios use `localStorage`.
- Navigation uses URL hash values: `#calculator` and `#retirement`.

## Project Structure
- `src/App.tsx` is the app entry router between pages.
- `src/pages/` contains page-level modules: calculator and retirement.
- `src/layouts/` contains reusable layout shells.
- `src/components/` contains shared UI components.
- `src/components/retirement/` contains retirement-page-specific UI.
- `src/hooks/` contains reusable state and calculation hooks.
- `src/utils/` contains pure calculations, formatting, normalization, and storage helpers.
- `src/types/` contains shared TypeScript types.
- `src/constants/` contains defaults and app constants.

## Commands
- `npm run dev` starts the local Vite dev server.
- `npm run build` runs TypeScript build and production Vite build.
- `npm run preview` previews the production build locally.
- `npm run build:pages` builds the app for GitHub Pages.

## Code Rules
- For complex features or significant refactors, write and follow an ExecPlan from design through implementation, using the format described in `PLANS.md`.
- Keep page composition in `src/pages/`; avoid growing `App.tsx` with feature logic.
- Put reusable layout structure in `src/layouts/`.
- Put reusable visual blocks in `src/components/`; page-specific blocks can live in nested component folders.
- Put calculations in `src/utils/` and keep them pure where possible.
- Put shared React state/calculation orchestration in `src/hooks/`.
- Keep TypeScript types explicit for public component props and domain objects.
- Preserve the current warm, encouraging UX tone, especially for retirement and long-term finance guidance.
- Do not present financial projections as guarantees; describe them as estimates based on assumptions.
- Prefer small, focused components over large mixed UI/business-logic files.
- Keep styles in Sass partials and import new partials from `src/styles/main.scss`.

## Changelog
- Update `CHANGELOG.md` for every meaningful change.
- Add new entries at the top of the file.
- Keep each entry very short: 1-2 sentences or compact bullets.

## Self-Check
- Run `npm run build` before finishing code changes.
- Verify both pages still open through hash navigation: `#calculator` and `#retirement`.
- Check mobile layout mentally or in browser for 360px width when changing UI.
- Confirm inputs can be cleared and edited without fighting the form.
- For finance changes, check edge cases: zero duration, already-retirement age, very small or very large values.
- Mention any remaining warnings or skipped checks in the final response.
