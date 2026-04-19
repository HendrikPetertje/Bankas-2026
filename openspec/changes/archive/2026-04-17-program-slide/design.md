## Context

The site has five full-screen slides. Four (`front`, `welcome`, `info`) are fully implemented; `program` (PlainsProgram) is a stub. The `MountaintopInfo` slide establishes all the patterns this slide needs: three independent overlay timers, drifting background creatures, `react-markdown` for text, and the `Slide` wrapper with `children` / `picture` props.

This slide sets the scene at the wide open plains. The content area shows the daily schedule under the title "Dagsprogram". The picture area shows the main plains image with two animations: chimney smoke (two alternating images) and sequential detail overlays.

## Goals / Non-Goals

**Goals:**
- Build a fully functional PlainsProgram slide following MountaintopInfo patterns exactly.
- Render the daily schedule from `slideContent.ts` via `react-markdown`.
- Animate three drifting layers behind the text: big clouds (left-to-right), smaller clouds (left-to-right), flock of birds (right-to-left).
- Render `main-pic.jpg` with two chimney smoke overlays crossfading (same timing as MountaintopInfo smoke group: 3s/600ms) and three sequential detail overlays (5s gap, 2s visible).
- Set `dipFrom="#56949f"` and `dipTo="#ea9d34"` (Rose Pine gold).

**Non-Goals:**
- Mini-game is out of scope for this change.
- No new shared components — overlay and drift logic stays local.
- No new npm dependencies.
- No new CSS keyframes — existing `drift` / `drift-reverse` are sufficient.

## Decisions

### 1. Chimney smoke uses the same crossfade pattern as MountaintopInfo smoke

`useState<boolean>` toggling on a 3-second interval, 600ms CSS opacity transition. Both images always mounted; one at `opacity: 1`, the other at `opacity: 0`.

**Rationale:** Identical to smoke overlays in MountaintopInfo. Two alternating images is the simplest pattern and matches what the user requested ("alternate between each other exactly like the mountain slide").

**Alternative considered:** A single image swapped via `src`. Rejected — causes a flash on swap; crossfade is smoother.

### 2. Detail overlays use the MountaintopInfo `scheduleNext` sequential pattern

`useState<number>` cycling 0→1→2→0, with `setTimeout` chain: 5s initial gap, show for 2s, 5s gap, next. A `cancelled` ref prevents state updates after unmount.

**Rationale:** Exact same behavior as MountaintopInfo detail overlays. The user explicitly requested the same timers.

### 3. Big clouds and small clouds both drift left-to-right (`drift` keyframe)

The user specified big clouds at the top drifting left-to-right, then smaller clouds in the same direction below, then birds right-to-left below that. `drift` handles left-to-right; `drift-reverse` handles right-to-left.

**Alternative considered:** Separate CSS keyframes for different speeds. Not needed — speed is controlled by `animation-duration`.

### 4. No photo strip on this slide

The MountaintopInfo slide includes three angled camp photos. The user did not request a photo strip for PlainsProgram. Omitted.

### 5. Asset organization mirrors MountaintopInfo

All images go to `src/slides/PlainsProgram/images/`. `slideContent.ts` lives alongside the component. Matches the established pattern.

### 6. Dip colors

`dipFrom="#56949f"` (Rose Pine foam) — seamless continuation from MountaintopInfo's `dipTo`. `dipTo="#ea9d34"` (Rose Pine gold) — as specified.

## Risks / Trade-offs

No significant risks. PNG overlays are small. CSS opacity transitions are GPU-accelerated. The `setTimeout` chain is the same pattern proven in MountaintopInfo.
