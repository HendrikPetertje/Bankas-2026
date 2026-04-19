## 1. Asset Preparation

- [x] 1.1 Copy `openspec/input/clouds.png` → `src/slides/CoastContact/images/clouds.png`
- [x] 1.2 Copy `openspec/input/flock-of-pigeons.png` → `src/slides/CoastContact/images/flock-of-pigeons.png`
- [x] 1.3 Copy `openspec/input/soccer-ball.png` → `src/slides/CoastContact/images/soccer-ball.png`
- [x] 1.4 Copy `openspec/input/bilda.png` → `src/slides/CoastContact/images/bilda.png`
- [x] 1.5 Copy `openspec/input/city.jpg` → `src/slides/CoastContact/images/main-pic.jpg`
- [x] 1.6 Copy `openspec/input/city-overlay-1.png` → `src/slides/CoastContact/images/main-pic-overlay-1.png`
- [x] 1.7 Copy `openspec/input/city-overlay-2.png` → `src/slides/CoastContact/images/main-pic-overlay-2.png`
- [x] 1.8 Copy `openspec/input/city-overlay-3.png` → `src/slides/CoastContact/images/main-pic-overlay-3.png`
- [x] 1.9 Resize `openspec/input/pictures/IMG_7381.jpg` to 600×400 → `src/slides/CoastContact/images/IMG_7381.jpg` (use `sips -z 400 600`)
- [x] 1.10 Resize `openspec/input/pictures/IMG_7552.jpg` to 600×400 → `src/slides/CoastContact/images/IMG_7552.jpg`
- [x] 1.11 Resize `openspec/input/pictures/IMG_8034.jpg` to 600×400 → `src/slides/CoastContact/images/IMG_8034.jpg`

## 2. Soccer Ball CSS Animation

- [x] 2.1 Add `@keyframes soccer-ball-arc` to `src/index.css` that moves the ball from off-screen left to off-screen right, with a translateY curve: start at 0, dip down slightly at 25%, rise at 50%, dip again at 75%, end at 0 (parabolic feel)

## 3. Slide Content

- [x] 3.1 Create `src/slides/CoastContact/slideContent.ts`

## 4. Component Implementation

- [x] 4.1 Implement `src/slides/CoastContact/CoastContact.tsx`:
  - Import all images and `contactContent`
  - Define `driftingLayers` array: clouds (drift, top ~10%), pigeons (drift-reverse, top ~38%)
  - Define `soccerBallLayer` with `soccer-ball-arc` animation at top ~62%
  - Add `useEffect` for cycling overlays (same pattern as PlainsProgram): 3 overlays, 2s visible / 5s gap, initial 5s delay
  - Render content area: heading, MarkdownContent, centered Bilda logo link, 3 content photos
  - Render picture prop: main-pic.jpg base + 3 overlay images with opacity transition

## 5. Verify

- [x] 5.1 Run `pnpm build` and fix any type or build errors
- [x] 5.2 Run `pnpm lint:fix` and fix any lint warnings
