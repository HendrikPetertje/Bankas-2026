## Context

The Konungens Rike site has five full-screen slides. The front-door slide already features a hidden clickable region (the door) that triggers a dramatic zoom/dip transition to the next slide. This mechanic is the site's core "discovery" interaction but currently only exists on the first slide. The remaining three content slides (forest, mountain, plains) each have a picture area showing a landscape illustration with animated overlays — these picture areas are the natural home for the same mechanic.

Each of the three picture components already receives an `onNavigate` prop (used by the slide shell). The hover overlays are pre-rendered PNG assets provided in `openspec/input/`.

## Goals / Non-Goals

**Goals:**
- Replicate the front-door hover-and-click discovery mechanic on the forest, mountain, and plains picture areas.
- Use the slide shell's existing dip transition (same as nav bar navigation) — no custom transition code.
- Show a delayed tooltip below the picture on each slide, matching the front-door tooltip pattern.
- Keep each slide self-contained; no shared component needed.

**Non-Goals:**
- Custom zoom/dip animations per slide (reuse existing shell transition).
- Touch-specific hover handling (tap on mobile simply triggers click).
- Any change to the contact/coast slide (it has no next destination).
- Any change to the front-door slide.

## Decisions

### Decision: Percentage-based absolute positioning for click targets

The hover regions are specified as percentages of the picture image dimensions (e.g., forest: top 5%–30%, left 30%–55%). The picture image is always rendered at full container width with a natural aspect ratio, so percentage-based `top`/`left`/`width`/`height` on an `absolute` child of a `relative` image wrapper maps directly to the image coordinates without any JS measurement.

**Alternative considered:** `getBoundingClientRect` + JS mouse tracking. Rejected — unnecessary complexity when CSS percentages suffice for static regions.

### Decision: Overlay image on top of existing animated overlays

Each slide's picture area already renders a stack of overlay images (cycling animations). The hover overlay PNG sits on top of all of them (highest `z-index` within the picture stack), invisible by default (`opacity-0`), transitioning to `opacity-100` on hover. This mirrors exactly how `the-door-cutout-overlay-hover.png` works on the front-door slide.

### Decision: Use the slide shell's `onNavigate` callback directly

The picture components already accept `onNavigate: (target: SlideId) => void`. Clicking the target region calls `onNavigate('info' | 'program' | 'contact')`. `App.tsx`'s `onNavigate` sets `dipToActive = true`, which triggers the `Slide` shell's exit overlay fade-in and picture zoom (`scale(1.8)` forward, `scale(0.6)` backward) automatically. No new props, no custom transition code — calling `onNavigate` is sufficient to get the full zoom + color dip effect.

### Decision: Tooltip below the picture, not inside it

The tooltip ("Klicka på berget för att fortsätta" etc.) is positioned below the picture container in the content flow, not absolutely inside the picture. This avoids z-index conflicts with the overlay stack and matches the front-door implementation where the tooltip is a sibling element below the image.

### Decision: Copy overlay assets into each slide's `images/` folder

Each slide keeps its assets co-located (`src/slides/ForestWelcome/images/`, etc.). The three new PNGs from `openspec/input/` are copied into the respective slide image directories and imported via ES module imports, consistent with all other image usage in the project.

## Risks / Trade-offs

- **Hover region accuracy on different screen sizes** — percentage coordinates work correctly as long as the image maintains its aspect ratio (which it does via responsive width + auto height). No mitigation needed beyond verifying at a few breakpoints.
- **Mobile discoverability** — hover doesn't exist on touch. The tooltip fades in after 3 seconds as a nudge, and tapping the region still fires the click. Acceptable given the target audience (children likely on tablets/phones will tap around naturally).
- **Overlay PNG file size** — the three new overlay images are full-size PNGs. They should be similar in size to the existing overlay assets already in the project (~15–40 kB each) and are already in the `openspec/input/` folder so no external fetch is needed.
