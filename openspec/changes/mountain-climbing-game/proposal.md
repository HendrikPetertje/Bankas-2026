## Why

The MountaintopInfo slide needs its hidden mini-game. This is a vertical-scrolling 2D platformer where the player climbs from a forest valley to a snowy mountain peak, using platforms and ropes. It fits the mountain theme and gives kids an interactive challenge tied to the camp narrative.

## What Changes

- Add a new `ClimbingGame` component under `src/slides/climbingGame/` with a full canvas-based 2D platformer
- Character selection screen (male/female), intro story in Swedish, and victory screen with elapsed time
- Sprite-based rendering using provided `assetsprite.png` and `platformsprite.png` sprite sheets
- Three themed levels (forest, stone, ice/snow) each ~2000px tall, connected by ropes
- Touch controls (virtual d-pad + jump button) and keyboard controls (arrow keys + space)
- Vertical scrolling camera with 25% deadzone
- Ice physics in level 3 (sliding on platforms, slipping on ropes)
- Data-driven level layout via TypeScript config objects for easy iteration
- Cloud animations crossing the screen in level 2

## Capabilities

### New Capabilities
- `climbing-game-engine`: Core game loop, physics, collision detection, camera, and rendering on canvas
- `climbing-game-controls`: Virtual d-pad, jump button (touch), and keyboard input handling
- `climbing-game-levels`: Data-driven level configuration, platform/rope placement, and level-specific mechanics (ice sliding, clouds)
- `climbing-game-characters`: Character sprite management, animation states, selection screen
- `climbing-game-screens`: Intro story screen, character selection, victory screen with timer

### Modified Capabilities
_(none)_

## Impact

- New directory: `src/slides/climbingGame/` with game components and assets
- New sprite assets referenced from `public/images/` (assetsprite.png, platformsprite.png)
- MountaintopInfo slide will need a trigger to open the game (likely the existing hidden-game pattern)
- No new dependencies expected — canvas API only
