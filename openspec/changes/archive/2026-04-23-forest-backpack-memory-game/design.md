## Context

The Forest Welcome slide is the first full slide visitors see. PROJECT_OUTLINE.md calls for a "Pack Your Bag" memory game on this slide. All game assets (8 card pairs, card back, backpack, button parts, close button) are provided in `openspec/input/`. The existing `Slide.tsx` shell has no game support — it only handles content, picture, transitions, and nav.

The `LoadingScreen` component already preloads image arrays and shows progress; it can be reused for per-game asset loading. The `MobileMapOverlay` already uses a close button PNG — the same pattern applies to the game modal.

## Goals / Non-Goals

**Goals:**
- Add a generic game modal system to `Slide.tsx` so future slides can also host games with minimal effort
- Implement the backpack memory game as a self-contained component with its own asset loading
- Create a reusable `BlueButton` component from the three-part button assets
- Keep game assets out of the main site preload — each game loads its own assets on demand

**Non-Goals:**
- Other slide games (mountaintop, plains, coast) — those are separate changes
- Scoring persistence or leaderboards
- Sound effects or animations beyond card flips
- Accessibility (screen reader, keyboard nav) beyond basic semantic HTML — can be improved later

## Decisions

### 1. Game modal lives in Slide.tsx as an optional prop

`Slide` gains an optional `gameContent: ReactNode` prop. When provided, a joystick icon renders over the top-right of the picture. The modal itself (backdrop, close button, scrollable content area) is owned by `Slide.tsx` with `isGameOpen` / `onGameClose` managed by the parent slide.

**Why:** Keeps the modal chrome (backdrop, close button) consistent across all future games. Each game only provides its content; it doesn't need to implement modal behavior.

**Alternative considered:** Each slide manages its own modal. Rejected because it duplicates modal logic four times.

### 2. Modal backdrop does not dismiss on click

The modal's backdrop is non-interactive (`pointer-events-none` on backdrop, `pointer-events-auto` on content). This prevents accidental dismissal during gameplay. Only the close button dismisses.

### 3. Game assets loaded via reused LoadingScreen

The `BackpackGame` component wraps its content in a `<LoadingScreen>` that preloads all game images before rendering the game. This reuses the existing component with no modifications — just a different asset array and `onDone` callback.

**Why:** Avoids duplicating loading logic. The existing `LoadingScreen` already handles progress, timeouts, and fade-out.

### 4. BlueButton as a three-part image component

The button uses `display: flex` with a left-cap image, a middle section with `background-image: repeat-x` on the button-background, and a right-cap image. Hover = 15% transparent (`opacity-85`), active = 30% transparent (`opacity-70`).

**Why:** The assets are pre-made PNGs; CSS-only recreation would be fragile.

### 5. Card grid is 4x4 (8 pairs = 16 cards)

There are exactly 8 pairs in the input assets (1-1 through 8-2). A 4x4 grid fits naturally.

### 6. Game state machine: intro → playing → complete

Three phases with a simple `useState<'intro' | 'playing' | 'complete'>`. No reducer needed — the state transitions are linear and simple.

## Risks / Trade-offs

- **Large game images on mobile** → Cards are JPGs provided externally; no control over file size. Mitigation: the per-game `LoadingScreen` ensures they're loaded before play begins.
- **Slide.tsx complexity growth** → Adding game modal props increases the component's surface. Mitigation: modal rendering is a small self-contained block at the end; game logic stays in the game component.
- **Button asset alignment** → Three-part image buttons can misalign at certain zoom levels. Mitigation: use `flex` with `items-stretch` and ensure middle section `flex-1`.
