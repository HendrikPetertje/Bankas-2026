## Why

The site's `program` slide is a stub. Kids arriving at the wide open plains before the city need a full slide with a daily schedule ("Dagsprogram"), animated background layers, and a picture area with chimney smoke animation — matching the established slide patterns.

## What Changes

- Replace `PlainsProgram` stub with a fully implemented slide
- Add title "Dagsprogram" and render daily schedule content from markdown
- Animate three background layers in the content area: big clouds (left-to-right), smaller clouds (left-to-right), and flock of birds (right-to-left)
- Render `main-pic.jpg` as the base picture with two alternating chimney smoke overlays (crossfade pattern, same timings as MountaintopInfo smoke group)
- Add three sequential detail overlays (`overlay-1`, `overlay-2`, `overlay-3`) cycling with 5s gap / 2s visible (same pattern as MountaintopInfo detail overlays)
- Move all assets from `openspec/input/` to `src/slides/PlainsProgram/images/`
- Set `dipFrom="#56949f"` (foam — matching MountaintopInfo's `dipTo`) and `dipTo` to Rose Pine gold (`#ea9d34`)

## Capabilities

### New Capabilities

- `plains-program-content`: Content area with title, markdown schedule text, and three animated background layers (big clouds, small clouds, birds)
- `plains-program-picture`: Picture area with main image, two alternating chimney smoke overlays, and three sequential detail overlays

### Modified Capabilities

- `slide-pages`: Add `'program'` to the slide routing order (if not already present)

## Impact

- New component: `src/slides/PlainsProgram/PlainsProgram.tsx` (replaces stub)
- New file: `src/slides/PlainsProgram/slideContent.ts`
- New directory: `src/slides/PlainsProgram/images/` (9 image files)
- `App.tsx` / slide routing: wire up the updated `PlainsProgram` component (already wired as stub)
