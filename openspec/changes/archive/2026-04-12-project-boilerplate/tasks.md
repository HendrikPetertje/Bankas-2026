## 1. Remove Vite scaffold content

- [x] 1.1 Delete `src/App.css`
- [x] 1.2 Delete `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`
- [x] 1.3 Delete `public/favicon.svg` and `public/icons.svg`
- [x] 1.4 Replace `src/App.tsx` with a minimal component that returns a placeholder element

## 2. Replace ESLint with Biome

- [x] 2.1 Remove ESLint packages: `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`
- [x] 2.2 Delete `eslint.config.js`
- [x] 2.3 Install `@biomejs/biome` as a devDependency
- [x] 2.4 Create `biome.json` at project root (copy from Zanina project config)
- [x] 2.5 Update `package.json` scripts: replace `"lint": "eslint ."` with `"lint": "biome check ."` and add `"format": "biome format . --write"`

## 3. Install Tailwind CSS v4

- [x] 3.1 Install `tailwindcss` and `@tailwindcss/vite`
- [x] 3.2 Add the Tailwind Vite plugin to `vite.config.ts` alongside the React plugin
- [x] 3.3 Replace all content in `src/index.css` with `@import "tailwindcss"`

## 4. Configure fonts

- [x] 4.1 Install `@fontsource-variable/nunito` and `@fontsource-variable/playwrite-ie`
- [x] 4.2 Add font imports to `src/index.css`
- [x] 4.3 Define `--font-body` and `--font-display` tokens in the `@theme` block
- [x] 4.4 Add CSS rule for `em, i` elements to swap to Playwrite Ireland with `font-style: normal`

## 5. Configure Rose Pine Dawn theme

- [x] 5.1 Add `@theme` block to `src/index.css` with all 15 Rose Pine Dawn color tokens
- [x] 5.2 Add extra project colors (`earth`, `edge-light`) to the `@theme` block
- [x] 5.3 Set base `body` styles: background `--color-base`, text `--color-text`, font-family `--font-body`

## 6. Verify

- [x] 6.1 Run `pnpm dev` and confirm the app loads with the correct background, text color, and font
- [x] 6.2 Run `pnpm lint` and confirm Biome runs without errors
- [x] 6.3 Run `pnpm build` and confirm a successful production build
