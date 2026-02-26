# Project Guidelines

## Code Style
- Language stack is React 19 + TypeScript + Tailwind v4; follow existing patterns in `src/components/ui/button.tsx` and `src/index.css`.
- Use `@/` import aliases (`tsconfig.json`), and import Radix primitives from the `radix-ui` barrel.
- Use CVA for component variants (`class-variance-authority`) with typed props (`VariantProps<typeof ...>`).
- Keep `data-slot` on each component root and preserve existing data-attribute selectors (`data-icon`, `in-data-[slot=...]`).
- For registry source files in `src/components/ui/*.tsx`, JSDoc metadata (`@name`, `@description`, `@dependencies`, `@type`) must be before imports.

## Architecture
- This repo is dual-purpose: Vite docs SPA + shadcn-compatible registry JSON published from `public/registry/care-ui/`.
- App shell wiring is in `src/App.tsx` (theme provider + navigation provider + sidebar layout).
- Navigation state is shared via `src/contexts/navigation-context.tsx` and consumed by sidebar, breadcrumb, and dynamic content components.
- Component docs are modular and lazy-loaded via `src/lib/registry/index.ts`.
- Registry JSON is generated from component source by `scripts/generate-registry.ts` (do not hand-edit files under `public/registry/care-ui/**`).

## Build and Test
- Install dependencies: `pnpm install`
- Run docs app: `pnpm dev`
- Build app: `pnpm build`
- Generate registry JSON: `pnpm run build:registry` (or `pnpm run registry:generate`)
- Watch registry generation: `pnpm run registry:watch`
- Add JSDoc headers in bulk: `pnpm run registry:add-jsdoc`
- Quality checks: `pnpm lint` and `pnpm run format:check` (`pnpm format` to rewrite)
- Preview production build locally: `pnpm preview`
- Publishing path runs `prepublishOnly` → `npm run build:registry` before publish.
- Note: there is currently no `test` script in `package.json`.

## Project Conventions
- Three-file component workflow:
  1) `src/components/ui/<name>.tsx` (implementation + JSDoc)
  2) `src/lib/registry/<name>.tsx` (`ComponentDoc`, use `React.createElement`, not JSX)
  3) generated `public/registry/care-ui/<name>/<name>.json`
- Register every new component in `src/lib/registry/index.ts` using the lazy import pattern.
- If you add a new external dependency in a UI component, update `CONFIG.dependencyMap` in `scripts/generate-registry.ts`.
- For user-facing install snippets, keep consistency with current docs patterns (repo uses `pnpm`; public snippets may include multi-manager CLI commands).

## Integration Points
- `src/components/dynamic-main-content.tsx` builds install commands and links to `https://careui.vercel.app`.
- `src/lib/documentation.ts` and `src/lib/registry/*.tsx` define displayed docs and examples.
- `src/lib/component-registry.ts` bridges app-facing docs types to the lazy registry loader.
- Registry metadata for shadcn consumers is exposed through `public/registry.json` and `public/registry/care-ui/index.json`.

## Security
- Treat `scripts/generate-registry.ts` output paths as sensitive build artifacts; only generate from trusted source files.
- `src/components/ui/chart.tsx` injects dynamic CSS via `dangerouslySetInnerHTML`; do not pass untrusted input into chart config values.
- Keep `localStorage` usage (theme/navigation state) non-sensitive; never store secrets or tokens in client storage.
