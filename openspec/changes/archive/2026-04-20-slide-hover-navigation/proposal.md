## Why

The front-door slide already rewards curious kids who discover the hidden clickable door — this same mechanic should exist on every content slide so the site feels playful and consistent throughout. The last slide (contact) has no next destination, so it is excluded.

## What Changes

- Add a hover overlay image to the ForestWelcome picture area: hovering a defined region (5%–30% top, 30%–55% left) reveals `forest-mouse-over-overlay.png`; clicking navigates to `info`.
- Add a hover overlay image to the MountaintopInfo picture area: hovering a defined region (45%–65% top, 47%–62% left) reveals `mountain-mouse-over-overlay.png`; clicking navigates to `program`.
- Add a hover overlay image to the PlainsProgram picture area: hovering a defined region (6%–34% top, 22%–44% left) reveals `plains-mouse-over-overlay.png`; clicking navigates to `contact`.
- Each of the three slides gains a delayed tooltip below its picture using the same pattern as the front-door tooltip: hidden on mount, fading in after 3 seconds.
  - ForestWelcome tooltip: "Klicka på berget för att fortsätta"
  - MountaintopInfo tooltip: "Klicka på gräsängarna för att fortsätta."
  - PlainsProgram tooltip: "Klicka på stadsslottet för att fortsätta."
- The click triggers the slide's existing dip-out transition (using the slide shell's `onNavigate` callback), same as the nav bar.
- Three new overlay image assets are added to each slide's `images/` folder from `openspec/input/`.

## Capabilities

### New Capabilities

- `slide-picture-hover-nav`: Invisible click-target regions on slide picture areas that reveal a hover overlay image and navigate to the next slide on click, with a delayed tooltip below the picture.

### Modified Capabilities

- `forest-welcome-content`: Picture slot gains a hover overlay image, click target region, and tooltip.
- `mountaintop-info-picture`: Picture slot gains a hover overlay image, click target region, and tooltip.
- `plains-program-picture`: Picture slot gains a hover overlay image, click target region, and tooltip.

## Impact

- `src/slides/ForestWelcome/` — new image asset, updated picture component
- `src/slides/MountaintopInfo/` — new image asset, updated picture component
- `src/slides/PlainsProgram/` — new image asset, updated picture component
- No new dependencies, no routing changes, no shared component changes
- The `onNavigate` prop already exists on all slide picture components via the slide shell
