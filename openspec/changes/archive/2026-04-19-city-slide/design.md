## Context

CoastContact is the fifth and final slide. It serves as the contact/information page with details about organizers and how to reach them, plus a link to study association Bilda. It currently renders a placeholder. The implementation follows the same pattern as PlainsProgram: animated background layers in the content area, text + supplementary images, and a main picture panel with cycling overlays.

## Goals / Non-Goals

**Goals:**
- Implement full CoastContact slide matching the established visual pattern of the site
- Animated sky: drifting clouds (right-to-left), pigeons (left-to-right), and a curved soccer ball arc
- Content area: title, markdown text, centered Bilda logo (external link), 3 rotated photos
- Picture panel: main city image + 3 sequential overlay images (one visible at a time, cycling)

**Non-Goals:**
- Adding any new shared components or abstractions
- Changing routing or slide ordering
- Any backend or form handling for the contact info (it is static text)

## Decisions

**Reuse PlainsProgram drifting layer pattern** — The same `drift` / `drift-reverse` CSS keyframe animations already exist in `index.css`. No new animation primitives needed.

**Soccer ball curved arc via CSS animation** — A single CSS `@keyframes` block using `translateX` + `translateY` to trace a shallow parabolic path. The ball starts off-screen left, arcs slightly down then up then down again as it crosses, and exits off-screen right. This keeps it declarative and consistent with other layer animations.

**Single overlay group, sequential cycling** — PlainsProgram has two overlay groups (chimney smoke + detail overlays). CoastContact has only one group of 3 overlays that cycle: overlay visible for ~2s, then hidden for ~5s, then next overlay, etc. Reuse the same `useEffect` + `setTimeout` pattern from PlainsProgram.

**Image resizing at copy time** — The 3 content photos (6000×4000) are resized to 600×400 using `sips` (macOS) during the asset-copy task step, matching the dimensions of PlainsProgram's content photos.

**slideContent.ts for text** — Keeps the component clean; same pattern as PlainsProgram.

## Risks / Trade-offs

- [Soccer ball arc realism] A CSS parabola is approximate. → Acceptable for decorative purpose; matches the playful tone.
- [Overlay timing] Hard-coded 2s/5s intervals look fine on desktop but may feel rushed on slow connections (images not preloaded). → Images are bundled via Vite imports so they are preloaded; no issue.

