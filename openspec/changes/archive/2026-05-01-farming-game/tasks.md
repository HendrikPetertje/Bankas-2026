## 1. Setup and Assets

- [x] 1.1 Copy all assets from `openspec/input/` to `src/slides/PlainsProgram/FarmingGame/images/` (grid/, plant-overlays/, button-images/, seed-packet-choices/, score-fruits/, intro-image.png) — imported via Vite, no public/ usage
- [x] 1.2 Create folder structure `src/slides/PlainsProgram/FarmingGame/` with `types.ts` defining TypeScript types matching the OpenAPI schema (Garden, Plot, Plant, AuthResponse, etc.)
- [x] 1.3 Create `api.ts` with typed fetch functions for all endpoints (signUp, login, getMyFarm, getPlantInfo, cleanPlot, seedPlot, waterPlot, harvestPlot) and error classes (AuthExpiredError, ApiError)

## 2. Auth and Account Management

- [x] 2.1 Create `LoginFrame.tsx` with saved account list from localStorage, username/PIN form, and "Logga in" / "Skapa odling" buttons
- [x] 2.2 Implement localStorage multi-account management (read/write `farming-game-accounts` key, add/update/remove accounts)
- [x] 2.3 Create loading overlay component (watering can image + "Laddar..." text)

## 3. Intro Frame

- [x] 3.1 Create `IntroFrame.tsx` with Swedish narrative text, intro background image, and BlueButton "Starta spelet"

## 4. Garden Grid Rendering

- [x] 4.1 Create `GardenGrid.tsx` — responsive container with `base.png`, plot state overlays positioned per row-col with dry/wet logic
- [x] 4.2 Implement crop growth stage overlay rendering (seed → sprout-1 → sprout-2 → young → finished) based on elapsed time and `growing_time_s`
- [x] 4.3 Implement weed overlay rendering (some-weeds at 45min, overgrowth at 2h since `last_weeds_removed_at`)
- [x] 4.4 Implement damaged plant rendering (brown filter at water_stars=1 or weed_stars=1, dried-out overlay for harvestable + water_stars=1)
- [x] 4.5 Create garden header showing farm name and total KG produced

## 5. Tools and Interactions

- [x] 5.1 Create `ToolBar.tsx` with four tool buttons (seed, water, clean, harvest) with active-state highlighting
- [x] 5.2 Implement cursor state management — custom cursor images per active tool applied to the entire modal container, not-allowed for ineligible plots
- [x] 5.3 Create `SeedPicker.tsx` modal showing all plant types with yield (at 5 stars) and grow time from plant-info endpoint
- [x] 5.4 Create `HarvestOverlay.tsx` victory popup showing vegetable image and KG produced

## 6. Game State Management

- [x] 6.1 Create `useGarden.ts` hook managing garden state, active tool, loading/error states, and dispatching API actions
- [x] 6.2 Implement 20-second idle polling with timer reset on action and race condition protection (discard poll response if action in-flight)
- [x] 6.3 Implement error bar (temporary display on failure, then reload) and 401 detection (return to login frame)
- [x] 6.4 Implement action loading state (gray out plots, disable interactions during POST)

## 7. Integration

- [x] 7.1 Create `FarmingGame.tsx` top-level component routing between intro/login/garden frames, using existing `LoadingScreen` component to preload all assets before showing garden
- [x] 7.2 Wire FarmingGame into `PlainsProgram.tsx` using gameContent/isGameOpen/onGameOpen/onGameClose props on Slide
- [x] 7.3 Build and lint — fix any type errors or lint issues
