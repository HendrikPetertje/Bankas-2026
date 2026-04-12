## Why

The front door slide is the first thing users see — the "book cover" of the site. It needs to land before any other slides can be built, since it contains the entry animation that transitions into slide 2. All image assets are ready in `openspec/input/`.

## What Changes

- Create a `FrontDoor` component at `src/slides/FrontDoor/FrontDoor.tsx` with its images co-located in `src/slides/FrontDoor/images/`.
- The slide fills at least 100svh, displaying a centered heading ("Baptistkyrkan Sundsvall & Bilda Presenterar") in the display font, capped at iPad-portrait width.
- Below the heading, render the door illustration (`the-door-cutout.png`) as a base layer with three overlay PNGs that cycle every 1 second (including a "no overlay" frame), creating a subtle animation loop.
- Above the image, floating detail PNGs (`small-*.png`) drift slowly left-to-right and repeat.
- Clicking the door area (a rectangle from 44%/52% to 56%/75% of the image on desktop, or anywhere on the image on mobile) triggers a two-phase color overlay transition (transparent gold to solid gold, then to `--color-overlay`), after which `activeSlide` switches to `'welcome'`.
- A tooltip below the image ("Klicka på dörren!") fades in 3 seconds after page load.
- Wire the `FrontDoor` component into App.tsx's switch for the `'front'` case, passing `setSlide` so the door transition can navigate.

## Capabilities

### New Capabilities

- `front-door-slide`: The FrontDoor component — layout, heading, door image with overlay animation, floating details, click-to-enter transition, and delayed tooltip.

### Modified Capabilities

- `slide-routing`: App.tsx switch for `'front'` now renders `<FrontDoor>` instead of a placeholder `<div>`, and `setSlide` is exposed to enable navigation.

## Impact

- New directory: `src/slides/FrontDoor/` (component + images).
- `src/App.tsx` — `'front'` case updated, `setSlide` destructured from `useState`.
- Image assets moved from `openspec/input/` to `src/slides/FrontDoor/images/`.
- No new npm dependencies.
