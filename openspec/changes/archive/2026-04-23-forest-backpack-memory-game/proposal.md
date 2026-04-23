## Why

The Forest Welcome slide is the first full slide players see, making it the natural place for the first hidden mini-game. The "Pack Your Bag" memory game introduces the adventure narrative and gives visitors an interactive reason to linger on the page before continuing to the mountain.

## What Changes

- Add a game controller icon overlaying the top-right of the Forest Welcome picture that opens a game modal
- Implement a full-screen (mobile) / max-width (desktop) modal on `Slide.tsx` with a close button matching the mobile nav overlay style — clicking outside does **not** close it
- Build a memory/matching card game (4x4 grid, 8 pairs) with unique paired illustrations (1-1/1-2, 2-1/2-2, etc.), card flip animations, and attempt tracking
- Add an intro screen with narrative text and backpack illustration, plus an end screen showing attempt count and a "Try Again" option
- Create a reusable `BlueButton` component built from three-part button assets (left cap, repeating middle, right cap) with hover/active transparency states
- Add a per-game `LoadingScreen` gate that preloads game assets before rendering the game
- All game assets live alongside the game component, not in the main site asset loader

## Capabilities

### New Capabilities
- `backpack-memory-game`: The memory card matching game component, its intro/end screens, game logic, and asset loading — lives in `slides/ForestWelcome/BackpackGame/`
- `game-modal`: Optional game modal on the Slide shell triggered by a joystick icon overlay, with close button and backdrop that doesn't dismiss on click
- `blue-button`: Reusable three-part image button component (`src/components/BlueButton/`)

### Modified Capabilities
- `slide-shell`: Add optional `gameContent` prop with open/close handling, and conditional joystick icon overlay on the picture

## Impact

- `src/components/Slide.tsx` — new optional props (`gameContent`, game open/close state, joystick overlay)
- `src/slides/ForestWelcome/ForestWelcome.tsx` — integrates `BackpackGame` as `gameContent`
- New directory `src/slides/ForestWelcome/BackpackGame/` with game component and images
- New component `src/components/BlueButton/BlueButton.tsx`
- New image assets copied from `openspec/input/` to game and button directories
