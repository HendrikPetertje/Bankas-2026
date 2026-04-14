## Why

The mountaintop info slide (`info`) is the third of five slides and currently a stub with placeholder text. It needs to be built out so users can see the camp's practical information (dates, pricing, packing, location) presented over the mountain-top illustration with animated overlays, following the same patterns established by the front door and forest welcome slides.

## What Changes

- Implement the `MountaintopInfo` slide content area with a heading, markdown-rendered camp info text, drifting background creatures (dragon, clouds, birds), and three angled camp photos.
- Implement the `MountaintopInfo` picture area with the main mountain cutout image and three independent overlay groups (clouds, smoke, detail creatures), each with its own cycling timing.
- Move all input assets from `openspec/input/` into `src/slides/MountaintopInfo/images/` and resize the three camp photos for the angled photo strip.

## Capabilities

### New Capabilities
- `mountaintop-info-content`: The children (content) area of the mountaintop slide, including the heading, markdown text, drifting creatures, and angled photo strip.
- `mountaintop-info-picture`: The picture (info image) area of the mountaintop slide, including the main cutout image and three independently cycling overlay groups (clouds, smoke, detail overlays).

### Modified Capabilities

_(none -- no existing spec requirements change)_

## Impact

- `src/slides/MountaintopInfo/MountaintopInfo.tsx` -- rewritten from stub to full implementation.
- New files: `src/slides/MountaintopInfo/images/*` (moved from `openspec/input/`), `src/slides/MountaintopInfo/slideContent.ts` (markdown string export).
- No new dependencies; uses existing `react-markdown` and CSS keyframe animations already in the project.
- No changes to slide routing, navigation, or other slides.
