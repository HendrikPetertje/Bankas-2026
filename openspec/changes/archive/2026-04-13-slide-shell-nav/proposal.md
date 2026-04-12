## Why

Slides 2-5 are currently empty placeholders. They need a shared layout shell with scroll support, image/content slots, transition animations, and a navigation system. Without this foundation, no slide content can be built.

## What Changes

- New `Slide` layout component with `children` (content), `picture` (ReactNode), `dipFrom`/`dipTo` color props, and sticky bottom navigation
- Desktop dock-style navigation bar (macOS-style with liquid glass backdrop) showing back/next arrows and 5 slide buttons with hover-grow effect
- Mobile navigation: a sticky map button that opens a full-screen liquid glass overlay with all navigation buttons and a close button
- Slide transition animations: forward navigation zooms into the picture, backward navigation zooms out; `dipFrom` creates a 2s fade-in overlay on mount, `dipTo` creates a 2s fade-out overlay on navigate-away
- Move and resize navigation assets from `openspec/input/` into `src/components/SlideNav/images/`
- Create placeholder slide components for all 5 slides (`ForestWelcome`, `MountaintopInfo`, `PlainsProgram`, `CoastContact`) using the new `Slide` shell with TODO content
- Update `App.tsx` to render real slide components instead of placeholder `<div>`s, passing `setSlide` and transition state
- Bottom padding on each slide so navigation never obscures content when scrolled to bottom

## Capabilities

### New Capabilities
- `slide-shell`: Shared Slide layout component with content/picture slots, scroll container, dip-from/dip-to color overlays, and bottom navigation placeholder space
- `slide-nav`: Desktop dock bar and mobile map overlay navigation system with slide buttons, back/next arrows, hover effects, liquid glass styling, and transition animations
- `slide-pages`: Placeholder slide components for slides 2-5 wired into App.tsx with the Slide shell

### Modified Capabilities
- `slide-routing`: App.tsx switch now renders real components for all 5 slides instead of placeholder divs; `setSlide` passed to all slides; transition state management added

## Impact

- **New files**: `src/components/Slide.tsx`, `src/components/SlideNav/SlideNav.tsx`, `src/components/SlideNav/MobileMapOverlay.tsx`, `src/components/SlideNav/images/*`, `src/slides/ForestWelcome/ForestWelcome.tsx`, `src/slides/MountaintopInfo/MountaintopInfo.tsx`, `src/slides/PlainsProgram/PlainsProgram.tsx`, `src/slides/CoastContact/CoastContact.tsx`
- **Modified files**: `src/App.tsx` (transition state, real component rendering), `src/index.css` (new keyframes/transitions)
- **Assets**: 9 PNGs moved from `openspec/input/` to component image directory, resized for web use
- **No new dependencies** — uses CSS transitions/animations and existing Tailwind utilities
