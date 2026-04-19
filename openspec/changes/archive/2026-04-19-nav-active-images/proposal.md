## Why

The active slide indicator in the navigation currently relies on CSS `brightness`/`contrast` filters applied to the regular button image. This is subtle and doesn't feel intentional. Dedicated active-state artwork has been provided for all five slide buttons, giving a clearer, more polished active indicator.

## What Changes

- Add 5 active-state images for the desktop dock nav buttons (80×80)
- Add 5 active-state images for the mobile map overlay nav buttons (200×200, resized from same source)
- Update `SlideNav.tsx` to use the active image source when a button's slide is the active slide (hover effects unchanged)
- Update `MobileMapOverlay.tsx` to do the same with lg- variants
- Add all 10 new images to the preloader in `App.tsx`
- Remove the CSS `brightness-110 contrast-110` active hack from both components

## Capabilities

### New Capabilities

_(none — this is a visual polish change to existing nav behavior)_

### Modified Capabilities

- `slide-nav`: Active slide button now uses a dedicated image source instead of a CSS filter

## Impact

- `src/components/SlideNav/images/` — 10 new image files
- `src/components/SlideNav/SlideNav.tsx` — `SLIDE_BUTTONS` gains an `activeSrc` field; render logic swaps `src` when active
- `src/components/SlideNav/MobileMapOverlay.tsx` — same change for lg- buttons
- `src/App.tsx` — 10 new imports and preload entries
