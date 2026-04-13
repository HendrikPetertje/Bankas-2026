## Context

`Slide.tsx` renders a flex-column container. The content slot is a plain `<div className="flex-1">` with no background — it inherits the parent's `bg-edge-light` (near-white). The request is to overlay a sky-blue-to-transparent gradient at the top of this slot so the illustrated scene bleeds atmospherically into the text area.

The gradient color `#add5f0` is not part of the Rose Pine Dawn token set; it is a one-off visual treatment specific to this effect.

## Goals / Non-Goals

**Goals:**
- Apply a `#add5f0` → transparent gradient (slightly angled, ~170°) as a background on the content slot in `Slide.tsx`.
- Keep the base background (`bg-edge-light`) intact underneath — the gradient sits on top of it.
- No new Tailwind token; no layout shifts; no changes to props or the Slide API.

**Non-Goals:**
- Per-slide customisation of the gradient color (all slides share the same sky blue).
- Animating the gradient.
- Changing the gradient on mobile vs desktop.

## Decisions

### 1. Inline `style` on the content `<div>` vs a CSS utility class

**Decision**: Inline `style` prop.

The gradient uses a specific hex color (`#add5f0`) that is not a Tailwind token. Expressing it as a Tailwind utility would require either an arbitrary value (`bg-[linear-gradient(...)]`) or a new `@theme` entry. The arbitrary-value approach produces a long, noisy class string. An inline style is cleaner for a one-off visual treatment and keeps the intent explicit in the component.

**Alternative considered**: Adding `--sky-gradient` as a CSS custom property in `@theme` and using a Tailwind utility. Rejected — overkill for a single gradient that has no semantic reuse.

### 2. Gradient angle

**Decision**: `170deg` (nearly top-to-bottom, tilted 10° clockwise).

A perfectly vertical `180deg` reads as mechanical. `170deg` gives a natural, subtle sky tilt without looking deliberately styled.

### 3. Gradient stops

**Decision**: `#add5f0` at 0% → `#add5f000` (same color, alpha 0) at 60%.

Fading to the same hue at zero opacity (rather than to `transparent`) avoids the "grey band" artefact that browsers render when interpolating between a colour and `transparent` (which is `rgba(0,0,0,0)` in CSS). Stopping at 60% keeps the fade compact so it doesn't visually compete with content further down the page.

## Risks / Trade-offs

- **Slight color cast on text**: If the content has light-colored text, the blue tint at the top could reduce contrast. Acceptable risk — content uses `text-text` (near-black) tokens.
- **Stacking with dipFrom overlay**: The dipFrom overlay is `fixed inset-0 z-50`, so it covers everything including the gradient during mount. No conflict.
