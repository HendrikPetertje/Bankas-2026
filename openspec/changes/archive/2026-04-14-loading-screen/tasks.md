## 1. Set up assets

- [x] 1.1 Create `src/components/LoadingScreen/images/` directory and copy `openspec/input/loading-screen-image.jpg` into it

## 2. Create LoadingScreen component

- [x] 2.1 Create `src/components/LoadingScreen/LoadingScreen.tsx` with a `assets: string[]` prop
- [x] 2.2 On mount, create a `new Image()` for each URL in `assets`, increment a `loadedCount` state on each `onload` (and `onerror`), and derive `progress = loadedCount / assets.length`
- [x] 2.3 Set an 8-second `setTimeout` on mount that calls `setDone(true)` as the safety timeout; clear it on unmount
- [x] 2.4 When `loadedCount === assets.length` (and `assets.length > 0`), set `done = true`; when `assets` is empty, set `done = true` immediately
- [x] 2.5 When `done` transitions to `true`, trigger a 600 ms CSS opacity fade-out (transition from `opacity-100` to `opacity-0`), then after 600 ms call the `onDone` callback prop to unmount the overlay
- [x] 2.6 Render the overlay: `fixed inset-0 z-[100] bg-base flex flex-col items-center justify-center gap-6`
- [x] 2.7 Inside the overlay, render the loading image centred with `max-w-[320px] md:max-w-[400px] w-full object-contain`
- [x] 2.8 Below the image, render the progress bar: a `bg-surface rounded-full` track (e.g. `w-64 h-2`) containing a `bg-pine rounded-full h-full` fill whose width is set via an inline `style={{ width: \`${progress * 100}%\` }}`

## 3. Wire up App.tsx

- [x] 3.1 In `App.tsx`, import all image assets from FrontDoor, ForestWelcome, MountaintopInfo, SlideNav, and MobileMapOverlay that are currently bundled in those components (copy the import paths; use the same Vite-resolved URLs)
- [x] 3.2 Add a `showLoader` boolean state (initially `true`) to `App`; pass `onDone={() => setShowLoader(false)}` and the assembled `assets` array to `<LoadingScreen>`
- [x] 3.3 Wrap the return of `App` so that when `showLoader` is `true`, `<LoadingScreen>` is rendered on top of (or instead of) the slide — per the design, keep the slide unmounted while loading and only render it after `showLoader` becomes `false`

## 4. Verification

- [x] 4.1 Run `pnpm build` and fix any type or build errors
- [x] 4.2 Run `pnpm lint:fix` and resolve any remaining warnings
- [x] 4.3 Verify in the browser (with network throttling) that the loading screen appears, the progress bar fills, and it fades out before the first slide renders
