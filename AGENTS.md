# AGENTS.md

## Quick reference

| What       | Command / tool                        |
| ---------- | ------------------------------------- |
| Dev server | `pnpm dev`                            |
| Build      | `pnpm build` (runs `tsc -b` first)   |
| Lint       | `pnpm lint` (Biome, warnings = error) |
| Lint fix   | `pnpm lint:fix`                       |
| Format     | `pnpm format`                         |
| Tests      | None configured yet                   |

There is no separate typecheck script — `pnpm build` runs `tsc -b && vite build`.

**After every file change** (add, edit, or delete), run this sequence:

1. `pnpm build` — fix any type or build errors before proceeding.
2. `pnpm lint:fix` — only after the build succeeds. This auto-formats and fixes lint issues in one pass.

## Stack

React 19, TypeScript 6, Vite 8, Tailwind CSS v4, Biome. Package manager is **pnpm**.

## Things you will get wrong without this file

- **Biome is the only linter and formatter.** No ESLint, no Prettier. Config is `biome.json`. Run `pnpm lint:fix` to auto-fix, not any eslint command.
- **`pnpm lint` uses `--error-on-warnings`.** Biome warnings fail the check. Fix them, don't ignore them.
- **Tailwind v4 config lives in CSS, not JS.** Theme tokens (colors, fonts) are in `src/index.css` inside a `@theme` block. There is no `tailwind.config.js` or `postcss.config.js`. Tailwind runs as a Vite plugin (`@tailwindcss/vite`).
- **No router.** Navigation is a `useState<Slide>` in `App.tsx`. Slides are `'front' | 'welcome' | 'info' | 'program' | 'contact'`. Do not install a router.
- **`verbatimModuleSyntax` is on.** Use `import type { Foo }` for type-only imports, never bare `import { Foo }` for types.
- **`noUnusedLocals` and `noUnusedParameters` are enabled.** The build will fail on unused variables.
- **`noFloatingPromises` is an error in Biome.** Every promise must be awaited or explicitly handled.

## Style / formatting

- 2-space indent, 120-char line width, single quotes, double quotes in JSX.
- Biome organizes imports automatically on fix (`assist.actions.source.organizeImports`).

## Project context

A children's summer camp website ("Konungens Rike") for a Swedish church. Five full-screen slides, each with illustrations and a hidden mini-game. **All user-facing content is in Swedish.**

Read `PROJECT_OUTLINE.md` for the full design: slide descriptions, color palette, game specs, and target file structure.

## Colors and fonts

- **Rose Pine Dawn** palette defined as Tailwind tokens: `base`, `surface`, `overlay`, `muted`, `subtle`, `text`, `love`, `gold`, `rose`, `pine`, `foam`, `iris`, `highlight-low/med/high`. Plus `earth` and `edge-light`.
- Use semantic token names (`bg-base`, `text-pine`), not raw hex values.
- Body font: Nunito (`font-body`). Display font: Playwrite IE (`font-display`). `<em>` and `<i>` are styled to use the display font with `font-style: normal`.

## Images

All illustrations are provided externally. Code renders `<img>` elements pointing to `public/images/` or `src/assets/`. Do not generate image assets.

## OpenSpec workflow

Changes are planned and tracked in `openspec/`. Use the OpenSpec skills/commands (`opsx-propose`, `opsx-apply`, `opsx-explore`, `opsx-archive`) to propose and implement changes rather than making ad-hoc modifications.

## Hosting

GitHub Pages. No server-side rendering, no browser-router.
