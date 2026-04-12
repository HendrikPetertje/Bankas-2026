## 1. File scaffolding and asset setup

- [ ] 1.1 Create `src/slides/FrontDoor/` directory and `src/slides/FrontDoor/images/` subdirectory
- [ ] 1.2 Move images from `openspec/input/` to `src/slides/FrontDoor/images/` (`the-door-cutout.png`, `the-door-cutout-overlay-1.png`, `the-door-cutout-overlay-2.png`, `the-door-cutout-overlay-3.png`, `small-bird.png`, `small-cloud-1.png`, `small-cloud-2.png`, `small-flock-of-birds.png`)
- [ ] 1.3 Create empty `src/slides/FrontDoor/FrontDoor.tsx` that exports a placeholder component

## 2. Layout and heading

- [ ] 2.1 Implement the full-viewport container (`min-h-[100svh]`, `bg-edge-light`) and centered heading ("Baptistkyrkan Sundsvall & Bilda Presenterar") in display font with `max-w-3xl` and horizontal padding

## 3. Door image and overlay animation

- [ ] 3.1 Import and render the base door image (`the-door-cutout.png`) below the heading, scaled responsively in a `relative` container
- [ ] 3.2 Mount overlay images absolutely positioned over the base image (same size), all starting at `opacity: 0` with CSS `transition: opacity` ease-in
- [ ] 3.3 Add `useEffect` with a 1-second `setInterval` to cycle through frames 0–3, toggling the matching overlay's opacity to 1 (others to 0)

## 4. Floating detail images

- [ ] 4.1 Add CSS `@keyframes` animation for left-to-right drift (from off-screen left to off-screen right) in Tailwind's `@theme` or as inline keyframes
- [ ] 4.2 Render `small-bird.png`, `small-cloud-1.png`, `small-cloud-2.png`, `small-flock-of-birds.png` above the door image with the drift animation, each having a different duration and delay

## 5. Door click target and transition

- [ ] 5.1 Add a transparent `<button>` absolutely positioned over the door image at 44%–56% width / 52%–75% height, expanding to full image on viewports at or below `md`
- [ ] 5.2 Implement the two-phase transition overlay: a `fixed inset-0 z-50` div that transitions from transparent gold to solid gold (1s), then from gold to `--color-overlay` (1s), using a state machine (`'idle' | 'phase1' | 'phase2'`)
- [ ] 5.3 After both phases complete, call `onNavigate('welcome')` via a `setTimeout` chain or `transitionend` listener

## 6. Delayed tooltip

- [ ] 6.1 Render a tooltip below the image ("Tryck på dörren för att fortsätta") with `opacity-0` by default, transitioning to `opacity-100` after a 3-second `setTimeout`

## 7. Wire into App.tsx

- [ ] 7.1 Destructure `[activeSlide, setSlide]` in App.tsx (currently only `[activeSlide]`)
- [ ] 7.2 Update the `'front'` case to render `<FrontDoor onNavigate={setSlide} />` instead of `<div>front</div>`

## 8. Verify

- [ ] 8.1 Run `pnpm build` — confirm no type or build errors
- [ ] 8.2 Run `pnpm lint:fix` — confirm no lint warnings
