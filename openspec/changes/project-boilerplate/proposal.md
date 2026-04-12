## Why

The project was scaffolded with `create vite` and still contains default demo code, vanilla CSS, and ESLint. Before any feature work can begin, the tooling and styling foundation must match the project's actual tech choices: Tailwind CSS v4 with a Rose Pine Dawn theme, Biome for linting/formatting, and custom fonts for the storybook aesthetic.

## What Changes

- Remove all default Vite scaffold content (App.css, demo markup in App.tsx, index.css design tokens).
- Replace ESLint + related packages with Biome (config copied from the Zanina project).
- Install Tailwind CSS v4 as a Vite plugin (`tailwindcss`, `@tailwindcss/vite`).
- Configure the Rose Pine Dawn color palette as Tailwind theme tokens.
- Add extra project colors (`earth`, `edge-light`) to the Tailwind theme.
- Install and configure two fonts via `@fontsource-variable`: Nunito (body text) and Playwrite Ireland (headings, italics, decorative text).
- Define font-family mappings in Tailwind (`font-body`, `font-display`).
- Stub out `App.tsx` with a minimal placeholder (`return "todo"`).

## Capabilities

### New Capabilities

- `boilerplate`: Scaffold cleanup, dependency swap (ESLint → Biome), Tailwind + Vite plugin installation, and minimal App.tsx stub.
- `styling`: Tailwind theme configuration — Rose Pine Dawn palette, extra colors, font families (Nunito, Playwrite Ireland), and base CSS setup.

### Modified Capabilities

(none — greenfield project)

## Impact

- **Dependencies**: Remove `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`. Add `@biomejs/biome`, `tailwindcss`, `@tailwindcss/vite`, `@fontsource-variable/nunito`, `@fontsource-variable/playwrite-ie`.
- **Config files**: Delete `eslint.config.js`. Add `biome.json`. Modify `vite.config.ts` (add Tailwind plugin). Rewrite `src/index.css` (Tailwind directives + theme).
- **Source files**: Gut `src/App.tsx` and delete `src/App.css`.
- **Scripts**: Replace `"lint": "eslint ."` with Biome equivalents in `package.json`.
