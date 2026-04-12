## Context

The project is a fresh `create vite` scaffold (React 19, TypeScript 6, Vite 8). It currently ships with default demo components, vanilla CSS with design tokens, and ESLint for linting. None of this matches the target stack defined in `PROJECT_OUTLINE.md`: Tailwind CSS v4 for styling, Biome for linting/formatting, and a Rose Pine Dawn color palette with custom fonts.

This change establishes the foundation before any feature slides or games are built.

## Goals / Non-Goals

**Goals:**

- Clean slate: remove all Vite demo content so new slides start from zero.
- Single linter/formatter: replace ESLint (6 packages) with Biome (1 package, proven config).
- Tailwind v4 as a Vite plugin: zero-config CSS pipeline, no PostCSS setup needed.
- Rose Pine Dawn color tokens available as Tailwind utilities (`bg-rose`, `text-pine`, etc.).
- Two font families loaded via `@fontsource-variable` and mapped to Tailwind utilities (`font-body`, `font-display`).

**Non-Goals:**

- Building any slide or component UI (that's later changes).
- Dark mode or variant switching (the site uses Dawn only).
- Deployment or CI pipeline setup.
- Adding a CSS reset beyond Tailwind's Preflight.

## Decisions

### Tailwind v4 via `@tailwindcss/vite` (not PostCSS)

Tailwind v4 offers a native Vite plugin that is faster and simpler than the PostCSS route. Since the project already uses Vite, this is the natural choice. No `postcss.config.js` or `tailwind.config.js` file needed — all theme configuration lives in `src/index.css` using `@theme` directives.

**Alternative considered:** PostCSS plugin. Rejected because it adds an extra config file and is slower in dev.

### Biome (not ESLint + Prettier)

Biome handles both linting and formatting in a single tool with a single config file. The config is copied from the Zanina project (`biome.json`), which already covers React, TypeScript, CSS, and import organization. This avoids maintaining 6 ESLint-related packages and their config.

**Alternative considered:** Keeping ESLint and adding Prettier. Rejected — more packages, more config, slower.

### Fonts via `@fontsource-variable` (not Google Fonts CDN)

Self-hosted variable fonts avoid external network requests, improve loading performance, and work offline during development. The two fonts are:

- **Nunito** (`@fontsource-variable/nunito`): body text, readable at small sizes.
- **Playwrite Ireland** (`@fontsource-variable/playwrite-ie`): headings and decorative text, hand-written storybook feel.

Both are imported in `src/index.css` and mapped to Tailwind font-family tokens.

### Theme in CSS `@theme` block (not a JS config file)

Tailwind v4 supports `@theme` in CSS for defining custom tokens. This keeps the entire styling system in one file (`src/index.css`) rather than splitting between a JS config and CSS. Color tokens use the Rose Pine Dawn palette verbatim, plus two project-specific extras (`earth`, `edge-light`).

## Risks / Trade-offs

- **Tailwind v4 is relatively new** → Mitigation: the Vite plugin is stable and the project has no legacy Tailwind code to migrate.
- **Biome config copied from another project may need tweaks** → Mitigation: the Zanina config already handles React + TypeScript + CSS; minor rule adjustments are easy.
- **Playwrite Ireland is a less common font — availability risk** → Mitigation: `@fontsource-variable` packages are built from Google Fonts sources, and Playwrite IE is listed there. Fallback to `cursive` in the font stack.
