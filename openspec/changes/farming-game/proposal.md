## Why

The PlainsProgram slide needs its hidden mini-game. This is the largest and most interactive game on the site — a multiplayer farming simulator backed by a REST API where visitors grow virtual gardens and harvest crops. It ties into the camp narrative (magical soil near the castle city) and gives kids an ongoing activity they can return to throughout the camp week.

## What Changes

- Add a FarmingGame component under `src/slides/PlainsProgram/FarmingGame/` with three frames: intro story, login/account selection, and the main farming UI
- Integrate the game modal into PlainsProgram using the same `gameContent`/`isGameOpen` pattern as BackpackGame on ForestWelcome
- Implement a full API client for the Bankas 2026 backend (`https://bankas2026-backend.hendrikpeter.net`) covering auth (sign-up, login), garden state polling, and all plot actions (clean, seed, water, harvest)
- Store auth tokens in localStorage with multi-account support
- Render a 3x3 garden grid with layered PNG overlays for plot states, crops at various growth stages, weeds, and dry/watered conditions
- Implement tool-based interaction (seed packets, watering can, cleaning fork, harvesting shears) with cursor state management
- Add a seed selection modal, harvest victory overlay, error bar, and loading states
- Copy all game assets from `openspec/input/` into `src/slides/PlainsProgram/FarmingGame/images/`

## Capabilities

### New Capabilities
- `farming-game-api`: API client for the backend — auth, garden state, plot actions, plant info
- `farming-game-auth`: Login/signup UI, multi-account localStorage management, token state
- `farming-game-garden`: Main garden grid rendering with plot overlays, crop growth stages, weed/water visual states
- `farming-game-tools`: Tool selection bar and interaction logic (seed, water, clean, harvest) with cursor management
- `farming-game-integration`: Modal integration into PlainsProgram slide, intro frame, loading screen, error handling

### Modified Capabilities

_(none — no existing specs change)_

## Impact

- **New files**: ~10-15 components/modules under `src/slides/PlainsProgram/FarmingGame/`
- **Modified files**: `PlainsProgram.tsx` (add game modal wiring)
- **Assets**: ~50 PNG images in `src/slides/PlainsProgram/FarmingGame/images/` (imported via Vite)
- **External dependency**: Live backend API at `https://bankas2026-backend.hendrikpeter.net`
- **No new npm packages** — uses native `fetch` for API calls
