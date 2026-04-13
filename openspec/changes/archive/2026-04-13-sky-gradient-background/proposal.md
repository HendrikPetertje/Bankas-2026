## Why

The content area of each slide currently has a plain white background, which makes it feel flat and disconnected from the illustrated scenes above. Adding a sky-blue-to-transparent gradient at the top of the content area will create a subtle atmospheric bleed effect — as if the sky from the illustration is washing down into the text — giving the site a more cohesive, immersive feel.

## What Changes

- The content (children) slot in `Slide.tsx` gains a gradient background: `#add5f0` (sky blue) at the top fading to transparent at the bottom, with a slight angle (not perfectly vertical) for a natural feel.
- No new dependencies, no layout changes, no color token additions (the gradient color is applied inline or as a one-off utility, since it is not part of the Rose Pine Dawn palette).

## Capabilities

### New Capabilities

- `slide-content-sky-gradient`: A gradient background on the slide content area that transitions from `#add5f0` at the top to transparent at the bottom with a slight angle, creating a sky atmosphere effect.

### Modified Capabilities

- `slide-shell`: The slide shell layout gains a visual treatment on the content slot; no requirement-level changes, only implementation.

## Impact

- `src/components/Slide.tsx` — the content area wrapper gets a gradient background style.
- `src/index.css` — may need a small Tailwind utility class or CSS custom property if the gradient cannot be expressed cleanly inline.
- No other files affected. No new dependencies.
