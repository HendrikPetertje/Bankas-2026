## 1. Asset Setup

- [x] 1.1 Create directory `src/slides/ForestWelcome/BackpackGame/images/` and copy all game assets from `openspec/input/` (card pairs 1-1 through 8-2, card-back, backpack-start, backpack-end, close-button)
- [x] 1.2 Create directory `src/components/BlueButton/` and copy button assets (button-left, button-background, button-right) from `openspec/input/`

## 2. BlueButton Component

- [x] 2.1 Create `src/components/BlueButton/BlueButton.tsx`
 — three-part image button with left-cap, repeating background, right-cap; hover opacity 0.85, active opacity 0.7; accepts children and onClick props

## 3. Game Modal in Slide Shell

- [x] 3.1 Add optional `gameContent`, `isGameOpen`, and `onGameClose` props to `Slide.tsx`
- [x] 3.2 Render joystick icon overlay on top-right of picture area when `gameContent` is present
- [x] 3.3 Render game modal (fixed overlay, full-screen mobile, max-width desktop, close button matching MobileMapOverlay style, backdrop click does not dismiss)

## 4. BackpackGame Component

- [x] 4.1 Create `src/slides/ForestWelcome/BackpackGame/BackpackGame.tsx` with game asset loading via `LoadingScreen`
- [x] 4.2 Implement intro screen — backpack-start image, Swedish narrative text, "Starta spelet" BlueButton
- [x] 4.3 Implement card grid (4x4) — shuffle logic, card flip on click, match detection, attempt counting
- [x] 4.4 Implement completion screen — backpack-end image, attempt count display, "Försök igen" BlueButton that resets to intro

## 5. Integration

- [x] 5.1 Wire BackpackGame into ForestWelcome.tsx as `gameContent` prop on Slide, with open/close state management
- [x] 5.2 Run `pnpm build && pnpm lint:fix` and fix any errors
