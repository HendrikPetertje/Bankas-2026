## Context

App.tsx currently renders `<div>front</div>` for the `'front'` slide. The front door slide is the first real component — a "book cover" with an illustrated door, animated overlays, floating sky details, and a click-to-enter transition. All image assets exist in `openspec/input/`.

## Goals / Non-Goals

**Goals:**

- Build `FrontDoor` as a self-contained component with co-located images.
- Centered heading in display font, max-width capped at ~768px (iPad portrait).
- Door image with 4-frame overlay animation cycle (base + 3 overlays, 1s per frame, ease-in transitions).
- Floating detail images drifting above the door illustration.
- Clickable door area that triggers a two-phase color overlay transition, then navigates to `'welcome'`.
- On mobile, the entire image is clickable (small door target is impractical on phones).
- Delayed tooltip ("Klicka på dörren!") fading in 3 seconds after mount.
- Wire into App.tsx switch, exposing `setSlide`.

**Non-Goals:**

- Building a reusable `Slide` container component (FrontDoor is intentionally unique).
- Slide 2 content (out of scope).
- Keyboard navigation or accessibility beyond clickable regions.
- Preloading or lazy-loading optimizations.

## Decisions

### Component location and image co-location

`src/slides/FrontDoor/FrontDoor.tsx` with images in `src/slides/FrontDoor/images/`. Images imported via Vite's static asset handling (`import doorImg from './images/the-door-cutout.png'`) so they get hashed filenames in production. This keeps assets close to the component that uses them rather than dumping everything in `public/`.

Alternative: put images in `public/images/`. Rejected because co-location is easier to maintain and Vite gives cache-busting filenames.

### Overlay animation approach — CSS opacity + `useEffect` timer

Cycle through 4 states (0 = no overlay, 1-3 = overlay N) on a 1-second `setInterval`. All three overlay `<img>` elements are always mounted; their opacity toggles between 0 and 1 with a CSS `transition: opacity` (ease-in). This avoids mounting/unmounting images and keeps the browser's decoded image cache warm.

Alternative: CSS `@keyframes` animation on a single stacked element. Rejected because controlling 4 discrete frames with smooth inter-frame transitions maps more naturally to state-driven opacity than a single keyframe timeline.

### Floating details — CSS `@keyframes` animation

Each `small-*.png` gets a CSS `@keyframes` that translates it from off-screen left to off-screen right, with `animation-iteration-count: infinite`. Different durations and delays per element create visual variety. Pure CSS, no React state needed.

Alternative: JS `requestAnimationFrame` loop. Rejected — unnecessary complexity for a simple horizontal drift.

### Click target — percentage-based positioned `<button>` overlay

A transparent `<button>` is absolutely positioned over the door image using percentage-based `top`/`left`/`width`/`height` (44%–56% horizontal, 52%–75% vertical). On mobile (`md` breakpoint and below), the button expands to cover the full image via Tailwind responsive classes.

### Door transition — two-phase overlay with `setTimeout` chain

On click:
1. A full-screen `<div>` overlay transitions from `rgba(252,226,80,0)` to `rgba(252,226,80,1)` (`#fce250`) over 1 second via CSS transition.
2. After 1s, the overlay color transitions to `--color-overlay` (`#f2e9e1`) over 1 second.
3. After the 2nd second completes, call `setSlide('welcome')`.

The overlay uses `position: fixed; inset: 0; z-index: 50` and `pointer-events: none` (so the user can't accidentally click things during the transition). State machine: `'idle' | 'phase1' | 'phase2'`.

### Passing `setSlide` to FrontDoor

`App.tsx` destructures `[activeSlide, setSlide]` and passes `setSlide` as a prop (`onNavigate`) to `FrontDoor`. The `SlideId` type stays in App.tsx for now.

## Risks / Trade-offs

- **Risk**: Overlay images might flash on first cycle if not yet decoded.
  Mitigation: All overlays are mounted (opacity 0) from the start, so the browser can decode them before they're first shown.
- **Risk**: `setInterval` drift could cause slight timing inconsistency over long periods.
  Mitigation: Acceptable for a cosmetic animation; users don't stay on slide 1 for minutes.
- **Trade-off**: Co-locating images in `src/` means they go through Vite's asset pipeline (hashed names, base64 inlining for small files). This is a benefit for production but means images aren't directly addressable by path. Acceptable.
