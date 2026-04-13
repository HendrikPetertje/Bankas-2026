## Why

The ForestWelcome slide is currently a placeholder. It needs to become the first real content slide visitors see after stepping through the door. The camp introduction text, logo, content images, animated creatures, and the forest background with cycling overlays all need to be wired up.

## What Changes

- Replace the ForestWelcome placeholder with a fully realized slide containing the camp welcome text, logo, content images, and animated flying creatures
- Add a `slideContent.ts` file co-located in the ForestWelcome folder, holding the welcome markdown text from `openspec/input/valkommen-text.md`
- Render the welcome text via `react-markdown` with custom renderers for headings (display font), blockquotes (indented with left border), and links (no text-decoration, border-bottom instead)
- Copy all input assets (background, 3 overlays, 3 content images, 3 creature PNGs) into the ForestWelcome images folder
- Wire up the picture container with the forest background and a timed overlay cycle (one overlay appears for 2s, then 4s pause before the next, ~500ms ease transitions)
- Animate three small creatures drifting across the page (dragon and bird left-to-right, eagle right-to-left) using the existing `drift`/`drift-reverse` keyframes
- Display 3 content images side-by-side with slight rotation and spacing below the text
- Show the logo at the top of the content area
- Update dipFrom to gold (`#ea9d34`) and dipTo to text color (`#575279`)
- Add `react-markdown` as a project dependency

## Capabilities

### New Capabilities
- `forest-welcome-content`: ForestWelcome slide content layout, markdown rendering, content images, flying creatures, overlay cycling, and asset integration

### Modified Capabilities
- `slide-pages`: ForestWelcome is no longer a placeholder; it becomes a fully realized slide component with real content and assets

## Impact

- **New dependency**: `react-markdown` (npm package)
- **Files added**: `src/slides/ForestWelcome/slideContent.ts`, multiple images in `src/slides/ForestWelcome/images/`
- **Files modified**: `src/slides/ForestWelcome/ForestWelcome.tsx`
- **No API changes**: props remain identical, no changes to App.tsx or Slide.tsx
