## 1. Project Structure & Assets

- [x] 1.1 Create `src/slides/climbingGame/` directory structure with `assets/`, `components/`, and `engine/` subdirectories
- [x] 1.2 Copy sprite sheets (`assetsprite.png`, `platformsprite.png`) to `public/images/climbing-game/`
- [x] 1.3 Create `src/slides/climbingGame/assets/sprites.ts` — export sprite position data (adapted from `openspec/input/spritePositions.ts`) with proper types
- [x] 1.4 Create `src/slides/climbingGame/assets/Character.ts` — character config type with `kind: "female" | "male"` and `state: "walkingLeft" | "walkingRight" | "jumpingLeft" | "jumpingRight" | "standing" | "climbing-idle" | "climbing"`, plus helper to get sprite frames for a given kind+state

## 2. Level Configuration

- [x] 2.1 Create `src/slides/climbingGame/assets/LevelConfig.ts` — define `LevelConfig` type with basePlatform, level1/2/3 platform arrays (x, y, variant), rope arrays (x, y, length), base platforms per level, and finalPlatform
- [x] 2.2 Create `src/slides/climbingGame/assets/defaultLevel.ts` — export a default `LevelConfig` instance with 1 platform and 1 rope per level section (placeholder for manual tuning)

## 3. Game Engine Core

- [x] 3.1 Create `src/slides/climbingGame/engine/gameLoop.ts` — requestAnimationFrame loop with delta-time accumulator, start/stop/reset controls
- [x] 3.2 Create `src/slides/climbingGame/engine/physics.ts` — gravity, horizontal movement, jumping, ice sliding (friction multiplier for level 3), rope slipping in ice zone
- [x] 3.3 Create `src/slides/climbingGame/engine/collision.ts` — platform landing detection (feet hitbox vs ground line), rope overlap detection, screen boundary clamping
- [x] 3.4 Create `src/slides/climbingGame/engine/camera.ts` — vertical camera with 25% deadzone above/below center, no horizontal scrolling
- [x] 3.5 Create `src/slides/climbingGame/engine/playerState.ts` — player state machine (position, velocity, current state, isOnRope, currentLevel), state transitions

## 4. Rendering

- [x] 4.1 Create `src/slides/climbingGame/engine/renderer.ts` — canvas sprite drawing from sprite sheets at 60% scale, platform rendering, rope rendering (top + repeatable middle + bottom segments), cloud rendering
- [x] 4.2 Add character rendering with animation frame cycling (10ms intervals), horizontal mirroring for left-facing states
- [x] 4.3 Add cloud animation in level 2 — two clouds scrolling left-to-right at different vertical positions

## 5. Input Controls

- [x] 5.1 Create `src/slides/climbingGame/engine/input.ts` — keyboard handler (arrow keys + spacebar), touch d-pad handler, jump button handler
- [x] 5.2 Create `src/slides/climbingGame/components/TouchControls.tsx` — render d-pad (directional stick + background) and jump button as canvas overlay or absolute-positioned elements, handle touch events

## 6. Game Screens (React)

- [x] 6.1 Create `src/slides/climbingGame/components/IntroScreen.tsx` — intro story in Swedish (drake, mountain, rope), continue button
- [x] 6.2 Create `src/slides/climbingGame/components/SelectionScreen.tsx` — male and female characters standing on forestLong platform, clickable to select
- [x] 6.3 Create `src/slides/climbingGame/components/VictoryScreen.tsx` — both characters on finish platform, elapsed time in mm:ss, "Spela igen" button
- [x] 6.4 Create `src/slides/climbingGame/components/GameCanvas.tsx` — canvas element, useEffect for game loop lifecycle, game state management (intro → selection → fade → playing → victory)

## 7. Integration

- [x] 7.1 Create `src/slides/climbingGame/ClimbingGame.tsx` — top-level component orchestrating screens and canvas, timer tracking
- [x] 7.2 Add game trigger to MountaintopInfo slide (hidden interaction to open game modal)
- [x] 7.3 Build and lint: run `pnpm build && pnpm lint:fix` and fix all errors
