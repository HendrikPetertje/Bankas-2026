## Context

Slide transitions use a 4-second "dip" animation: 2 seconds fading to a solid color overlay on the current slide, then 2 seconds fading from a solid color overlay on the new slide. Each slide defines two colors: `dipFrom` (entry color) and `dipTo` (exit color). Currently both forward and backward navigation use `dipTo` for exit and `dipFrom` for entry, which breaks the color chain when going backward.

The color chain is designed so that slide A's `dipTo` matches slide B's `dipFrom`. Going forward (A→B) the colors match. Going backward (B→A), we need B's `dipFrom` as the exit color (matching A's `dipTo` as the entry color).

## Goals / Non-Goals

**Goals:**
- Make backward navigation use reversed dip colors so the color chain is seamless in both directions.

**Non-Goals:**
- No changes to transition timing, picture zoom, or any other transition behavior.
- No changes to individual slide `dipFrom`/`dipTo` values.

## Decisions

### 1. Keep `transitionDirection` set through the full 4-second transition

Currently `App.tsx` clears `transitionDirection` to `null` when swapping slides (at the 2-second mark). This means the new slide doesn't know which direction it arrived from. The fix: move the `setTransitionDirection(null)` call to the end of the full transition (at 4 seconds), alongside `setTransitioning(false)`.

**Rationale:** The new slide needs `transitionDirection` to choose the correct entry overlay color. Keeping it set longer has no side effects because `Slide.tsx` already receives it as a prop and only uses it for picture zoom (which is already done by the time the new slide mounts) and now for overlay color selection.

### 2. Derive overlay colors from `transitionDirection` in `Slide.tsx`

In the Slide component, compute the effective exit and entry colors:
- Forward (or null): exit = `dipTo`, entry = `dipFrom` (current behavior)
- Backward: exit = `dipFrom`, entry = `dipTo`

This is a simple conditional at the top of the component. No new props needed.

## Risks / Trade-offs

No significant risks. The change is two lines in App.tsx and a small conditional in Slide.tsx.
