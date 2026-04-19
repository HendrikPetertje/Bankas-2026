## 1. Asset Setup

- [x] 1.1 Create `src/slides/PlainsProgram/images/` directory and copy all image assets from `openspec/input/` into it (`big-clouds.png`, `clouds.png`, `flock-of-birds.png`, `main-pic.jpg`, `main-pic-overlay-1.png`, `main-pic-overlay-2.png`, `main-pic-overlay-3.png`, `main-pic-overlay-chimney-smoke-1.png`, `main-pic-overlay-chimney-smoke-2.png`)
- [x] 1.2 Create `src/slides/PlainsProgram/slideContent.ts` exporting the daily schedule markdown text as a string constant (content from `openspec/input/page-content.md`)

## 2. Content Area (children prop)

- [x] 2.1 Add image imports for `big-clouds.png`, `clouds.png`, and `flock-of-birds.png` to `PlainsProgram.tsx`
- [x] 2.2 Define the drifting layers array: big clouds (`drift`, fast, top ~10%), small clouds (`drift`, medium, top ~35%), flock of birds (`drift-reverse`, slow, top ~58%) with appropriate durations and delays
- [x] 2.3 Render the heading "Dagsprogram" using the display font (`font-display`)
- [x] 2.4 Render the markdown content using `MarkdownContent` (the shared component) with the `slideContent` string
- [x] 2.5 Assemble the full children prop: `relative overflow-hidden` wrapper containing drifting layers behind a `relative z-20` content div with heading and markdown

## 3. Picture Area (picture prop) — Overlay Groups

- [x] 3.1 Add image imports for `main-pic.jpg` and all overlay PNGs (`chimney-smoke-1`, `chimney-smoke-2`, `overlay-1`, `overlay-2`, `overlay-3`)
- [x] 3.2 Implement chimney smoke timer: `useState<boolean>` toggling every 3 seconds with a 600ms CSS opacity transition, crossfading between smoke-1 and smoke-2
- [x] 3.3 Implement detail overlay timer: `useState<number>` cycling through overlays 0→1→2→0 with 5s initial gap, 2s visible, 5s gap between each (matching MountaintopInfo `scheduleNext` pattern with `cancelled` ref)
- [x] 3.4 Render the picture prop JSX: relative wrapper with main image base, chimney smoke overlays (lower z), detail overlays (higher z), all using `absolute inset-0` and `pointer-events-none`

## 4. Integration and Verification

- [x] 4.1 Wire up the complete `PlainsProgram` component with both children and picture props passed to the `Slide` wrapper, using `dipFrom="#56949f"` and `dipTo="#ea9d34"`
- [x] 4.2 Run `pnpm build` and fix any type or build errors
- [x] 4.3 Run `pnpm lint:fix` and resolve any remaining warnings
- [x] 4.4 Visually verify in dev server
