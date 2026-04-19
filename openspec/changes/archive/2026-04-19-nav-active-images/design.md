## Context

The nav dock and mobile map overlay each have a `SLIDE_BUTTONS` array mapping `SlideId` → image src. Both components check `activeSlide === btn.id` to apply a CSS filter class. The new approach replaces that check with a different image source; the CSS active styling is removed entirely.

## Goals / Non-Goals

**Goals:**
- Each slide button renders a dedicated `activeSrc` image when it is the active slide
- Hover `brightness-90` effect is preserved for all buttons (active and inactive)
- The `brightness-110 contrast-110` / `brightness-95 contrast-95` CSS toggle is removed

**Non-Goals:**
- Changing the dock layout, animation, or proximity scaling
- Adding active images for the back/next arrows

## Decisions

**Add `activeSrc` field to `SLIDE_BUTTONS`** — minimal change, co-locates the two image sources per button. At render time: `src={item.isActive ? item.activeSrc : item.src}`.

**Resize at copy time** — input images are 400×400. Small variants (desktop dock) → 80×80 via `sips`. Large variants (mobile overlay) → 200×200 via `sips`. This matches the existing non-active image dimensions exactly.

**Same pattern in both components** — `SlideNav.tsx` (desktop dock) and `MobileMapOverlay.tsx` (mobile overlay) are updated identically.

## Risks / Trade-offs

- [No active image for `front` on mobile overlay] The input provides `door-button-active.png` — this is included, so `front` is covered.
- [File naming] Input filename `forest button-active.png` has a space. Destination will be `forest-button-active.png` (hyphen, consistent with existing convention).
