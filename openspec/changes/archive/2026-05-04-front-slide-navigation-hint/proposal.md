## Why

Visitors landing on the front slide see the signup banner ("Anmäl dig här nu") but miss the rest of the website — the door below it is the entry point to the other slides and games, yet most users don't realise they can click it. Adding a short navigation hint beneath the call-to-action text, and removing the redundant caption under the door image, will make the path forward obvious without cluttering the design.

## What Changes

- Add a short hint line below "Anmäl dig här nu" in slightly smaller text, in Swedish, telling users they can click the glowing door for more info and games.
- Remove the existing text beneath the door illustration on the front slide (it is being missed and is now redundant given the new hint).

## Capabilities

### New Capabilities

- `front-slide-nav-hint`: A navigation hint subtitle beneath the signup call-to-action, guiding users to click the glowing door.

### Modified Capabilities

<!-- none -->

## Impact

- `src/slides/FrontSlide.tsx` (or equivalent component) — text additions/removals.
- No new dependencies, routes, or APIs.
