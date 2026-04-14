## Why

When navigating backward between slides, the dip transition uses the wrong colors. Both forward and backward use `dipTo` as the exit overlay and `dipFrom` as the entry overlay. Going backward from slide B to slide A, this means B fades out to B's "forward destination" color and A fades in from A's "forward origin" color -- producing a jarring color mismatch. The colors should reverse when the direction reverses: B should exit using its `dipFrom` color (the color it arrived with) and A should enter using its `dipTo` color (the color it left with).

## What Changes

- When navigating backward, the `Slide` component swaps which color it uses for the exit and entry overlays: `dipFrom` becomes the exit color and `dipTo` becomes the entry color.
- `App.tsx` keeps `transitionDirection` set through the full transition (not cleared on slide swap) so the new slide knows it arrived via a backward navigation.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `slide-shell`: The dip overlay requirements change to be direction-aware. The exit overlay uses `dipTo` when going forward and `dipFrom` when going backward. The entry overlay uses `dipFrom` when going forward and `dipTo` when going backward.

## Impact

- `src/App.tsx` -- minor change to when `transitionDirection` is cleared.
- `src/components/Slide.tsx` -- overlay color selection becomes direction-aware.
- No changes to individual slide components. No new dependencies.
