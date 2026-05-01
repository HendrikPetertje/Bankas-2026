## Context

The PlainsProgram slide currently has no mini-game. The site pattern is: each slide has a hidden game triggered via the `Slide` component's `gameContent`/`isGameOpen` props (see BackpackGame on ForestWelcome). This game is unique because it requires a live backend API for persistence — players grow crops over real time across multiple sessions.

The backend is already built and deployed at `https://bankas2026-backend.hendrikpeter.net`. It provides JWT auth, a 3x3 garden grid, and plot actions (clean/seed/water/harvest). All visual assets (grid tiles, plant overlays, buttons, seed packets) are provided as PNGs in `openspec/input/`.

## Goals / Non-Goals

**Goals:**
- Integrate the farming game into PlainsProgram using the existing game modal pattern
- Three-frame flow: narrative intro → login/account select → main garden UI
- Full API integration with multi-account localStorage token management
- Visual garden grid rendered as layered PNGs with growth/weed/water state logic
- Tool-based interaction (cursor changes) for seed/water/clean/harvest actions
- Auto-refresh garden state every ~20s of inactivity
- Graceful error handling with error bar + reload, auth expiry detection

**Non-Goals:**
- No real-time multiplayer/websockets — polling only
- No leaderboard or cross-player interaction
- No offline mode or service worker caching
- No unit tests in this change (none configured in project)
- No new npm dependencies

## Decisions

### 1. Component structure: folder per concern
`src/slides/PlainsProgram/FarmingGame/` with submodules:
- `api.ts` — typed fetch wrapper for all endpoints
- `types.ts` — shared TypeScript types matching the OpenAPI schema
- `FarmingGame.tsx` — top-level frame router (intro/login/garden)
- `IntroFrame.tsx` — story text + start button
- `LoginFrame.tsx` — account list + login/signup form
- `GardenFrame.tsx` — main game UI
- `GardenGrid.tsx` — the 3x3 layered PNG renderer
- `ToolBar.tsx` — bottom action buttons
- `SeedPicker.tsx` — seed selection modal
- `HarvestOverlay.tsx` — victory popup
- `useGarden.ts` — custom hook managing garden state, polling, and action dispatch

**Why:** Matches BackpackGame's self-contained folder pattern. Keeps the game isolated from the rest of the app.

### 2. State management: local hook, no global store
A single `useGarden` hook owns all game state (garden data, active tool, loading, error). No Redux/Zustand needed — the game is self-contained within its modal.

**Why:** The game has no interaction with other slides. A hook keeps things simple and testable.

### 3. Multi-account tokens in localStorage
Key: `farming-game-accounts` → `Array<{ username: string, token: string }>`. The active token is component state, not localStorage (allows switching without page reload).

**Why:** Users (kids sharing devices) need to switch between accounts easily. Storing tokens lets them resume without re-entering PINs every time.

### 4. Garden rendering: absolute-positioned PNG layers
The grid is a container sized to `base.png`'s aspect ratio. Plot state overlays, crop overlays, and weed overlays are absolutely positioned using the offset map from the spec. CSS `object-fit: contain` + percentage-based positioning ensures responsive scaling.

**Why:** All assets are pre-rendered at fixed pixel offsets. Absolute positioning with percentage-based container sizing is the simplest approach that preserves the artist's layout at any modal width.

### 5. Tool interaction via cursor state
Active tool stored in state. The active tool button gets a highlighted background (Rose Pine foam/iris tint) to indicate selection. The cursor changes to the tool image (`cursor: url(...)`) and stays that way for the entire modal area (not just over plots). Clicking a plot dispatches the appropriate API action based on active tool + plot state.

**Why:** Simple state machine. Cursor applies to the full modal so users don't lose context when moving between plots and toolbar.

### 6. Polling with race condition protection
A `useEffect` sets a 20s idle timer (reset on any action). When it fires, fetch `/me` but discard the response if an action is in-flight (tracked by a ref).

**Why:** Prevents stale server responses from overwriting optimistic UI updates after user actions.

## Risks / Trade-offs

- **Backend availability**: If the backend goes down, the game is unplayable → Show a friendly error message and let users retry. No offline fallback.
- **Token expiry**: JWTs may expire mid-session → Detect 401 responses globally in the API client; redirect to login frame.
- **Image loading performance**: ~50 PNGs loaded per garden view → Reuse the existing `LoadingScreen` component (`src/components/LoadingScreen/`) which preloads an array of image URLs with a progress bar. Pass all farming game assets and gate the garden frame behind `onDone`, same pattern as BackpackGame.
- **Mobile usability**: Cursor-based tool selection doesn't work on touch → Use tap-to-select-tool then tap-plot pattern (same state machine, just touch events instead of hover cursors).
