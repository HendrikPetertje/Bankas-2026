## ADDED Requirements

### Requirement: Vite demo content is removed
The project SHALL NOT contain any default Vite scaffold content. `src/App.css` SHALL be deleted. `src/App.tsx` SHALL export a component that renders only a placeholder string. Default asset files (`src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`) SHALL be removed.

#### Scenario: Clean App component
- **WHEN** the application renders
- **THEN** `App.tsx` exports a default component returning a placeholder element with no demo markup, no counter, and no Vite/React logos

#### Scenario: No leftover demo files
- **WHEN** inspecting the `src/` directory
- **THEN** `App.css` does not exist and `src/assets/` contains no default Vite scaffold images

### Requirement: ESLint is replaced with Biome
All ESLint-related packages SHALL be removed from `devDependencies`: `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`. The file `eslint.config.js` SHALL be deleted. `@biomejs/biome` SHALL be added as a devDependency. A `biome.json` config file SHALL exist at the project root.

#### Scenario: ESLint packages removed
- **WHEN** inspecting `package.json` devDependencies
- **THEN** no package name contains `eslint` and the `globals` package is absent

#### Scenario: Biome installed and configured
- **WHEN** inspecting the project root
- **THEN** `biome.json` exists with formatter, linter, and assist sections enabled
- **AND** `@biomejs/biome` is listed in devDependencies

#### Scenario: ESLint config file removed
- **WHEN** inspecting the project root
- **THEN** `eslint.config.js` does not exist

### Requirement: Lint and format scripts use Biome
`package.json` scripts SHALL include Biome commands for linting and formatting. The old `"lint": "eslint ."` script SHALL be replaced.

#### Scenario: Biome scripts available
- **WHEN** inspecting `package.json` scripts
- **THEN** a `lint` script runs `biome check .`
- **AND** a `format` script runs `biome format . --write`

### Requirement: Tailwind CSS v4 is installed as a Vite plugin
`tailwindcss` and `@tailwindcss/vite` SHALL be installed as dependencies. The Vite config SHALL import and register the Tailwind plugin.

#### Scenario: Tailwind packages present
- **WHEN** inspecting `package.json`
- **THEN** `tailwindcss` and `@tailwindcss/vite` are listed as dependencies

#### Scenario: Vite config includes Tailwind plugin
- **WHEN** inspecting `vite.config.ts`
- **THEN** `@tailwindcss/vite` is imported and added to the `plugins` array alongside the React plugin

### Requirement: CSS entry point imports Tailwind
`src/index.css` SHALL contain `@import "tailwindcss"` as the foundation for all styling. All previous vanilla CSS content in `index.css` SHALL be removed.

#### Scenario: Tailwind import present
- **WHEN** inspecting `src/index.css`
- **THEN** the file contains `@import "tailwindcss"`
- **AND** no legacy CSS custom properties or vanilla design tokens remain

### Requirement: Public directory is cleaned
The default `public/favicon.svg` and `public/icons.svg` files SHALL be removed to avoid shipping Vite branding.

#### Scenario: No default public assets
- **WHEN** inspecting the `public/` directory
- **THEN** `favicon.svg` and `icons.svg` do not exist
