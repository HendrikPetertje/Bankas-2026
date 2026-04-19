## Why

The CoastContact slide is the last of the five slides and currently renders only placeholder content. It needs its full implementation to complete the website.

## What Changes

- Replace CoastContact placeholder with full slide implementation: title "Frågor, information & Bilda", markdown text content, centered Bilda logo (linked), 3 content photos (scaled), and animated sky background (clouds, pigeons, soccer ball)
- Add picture panel: main city image with 3 sequential overlay images cycling one at a time
- Copy and resize input assets into `src/slides/CoastContact/images/`

## Capabilities

### New Capabilities

- `coast-contact-slide`: Full CoastContact slide implementation with animated background layers, content area (text + Bilda logo + 3 photos), and picture panel with cycling overlays

### Modified Capabilities

_(none)_

## Impact

- `src/slides/CoastContact/CoastContact.tsx` — replaced placeholder with full implementation
- `src/slides/CoastContact/images/` — new image assets added
- `src/slides/CoastContact/slideContent.ts` — new file for text content
- No routing, API, or dependency changes
