## Context

The site has five full-screen slides. Two (`front`, `welcome`) are fully implemented; three are stubs. The `info` (mountaintop) slide is next. The existing `ForestWelcome` slide establishes clear patterns: a `Slide` wrapper with `children` (content area) and `picture` (illustration area) props, CSS keyframe drifting for flying creatures, `react-markdown` for text, opacity-toggled PNG overlays for animated scene details, and inline-rotated photos in a horizontal strip.

The mountaintop slide follows the same architecture but introduces a more complex overlay system: three independent overlay groups cycling at different timings instead of one group.

## Goals / Non-Goals

**Goals:**
- Build a fully functional mountaintop info slide matching the established slide patterns.
- Render the Swedish camp info text (dates, pricing, packing) via `react-markdown`.
- Animate three drifting creatures (dragon left-to-right, clouds right-to-left, birds right-to-left) behind the text.
- Display three angled camp photos below the text.
- Render the main mountain cutout image with three independent overlay groups (clouds, smoke, detail creatures) each cycling on its own timer.

**Non-Goals:**
- The mini-game ("Creature Spotter") is out of scope. It will be added in a future change.
- No new shared components. The overlay logic stays local to this slide (it can be extracted later if a third slide needs it).
- No new CSS keyframes. The existing `drift` / `drift-reverse` keyframes are sufficient.
- No new npm dependencies.

## Decisions

### 1. Three independent `useEffect` timers for overlay groups

Each overlay group (clouds, smoke, detail) has its own timing, transition duration, and cycling pattern. Rather than one complex state machine, use three separate `useState` + `useEffect` pairs, each self-contained.

**Rationale:** The timings are all different (4s/1s crossfade, 3s/600ms crossfade, 5s gap/2s show sequential). A single timer would need complex branching. Separate timers are easier to read and adjust independently.

**Alternative considered:** A single `useReducer` with scheduled dispatches. Rejected because the three groups are truly independent and never need to synchronize.

### 2. Cloud and smoke overlays use opacity crossfade (two images toggling)

For groups with exactly two alternating images (clouds, smoke), toggle a boolean state. Both images are always mounted; one has `opacity: 1`, the other `opacity: 0`, with a CSS transition.

**Rationale:** Matches the existing overlay pattern. Two images crossfading is simpler than unmounting/remounting.

### 3. Detail overlays use the ForestWelcome sequential pattern

The third overlay group (overlay-1, overlay-2, overlay-3) cycles sequentially with gaps, exactly like `ForestWelcome`. Reuse that `scheduleNext` setTimeout chain pattern: 5s gap, 2s visible, 5s gap, next overlay.

### 4. Content stored in a `slideContent.ts` file

The markdown text is exported from `src/slides/MountaintopInfo/slideContent.ts` as a string constant, matching the `ForestWelcome` pattern (`welcomeContent` export).

### 5. Photo resizing

The three camp photos (`IMG_1029.jpg`, `IMG_8492.jpg`, `IMG_7916.jpg`) need to be resized for the angled photo strip. Target: max 600px on the longest edge. This keeps them retina-sharp at `max-w-[180px]` display size (~360 CSS pixels on 2x screens) while avoiding unnecessarily large file sizes.

### 6. Asset file organization

All images move from `openspec/input/` to `src/slides/MountaintopInfo/images/`, mirroring the `ForestWelcome/images/` structure. Vite handles the imports and bundling.

### 7. Dip colors

`dipFrom` uses the Rose Pine "text" color (`#575279`) -- matching `ForestWelcome`'s `dipTo`, so the transition between slides is seamless. `dipTo` uses the Rose Pine "foam" color (`#56949f`), which leads into the next slide.

## Risks / Trade-offs

No significant risks. The overlay PNGs are small (30-50 KB each), and native CSS opacity transitions are well-optimized. Image preloading will be addressed separately later.
