## Context

The MountaintopInfo slide is one of five full-screen slides in the Konungens Rike camp website. Each slide has a hidden mini-game. This design covers a vertical-scrolling 2D platformer where the player climbs from forest to snow peak.

Two sprite sheets are provided (`assetsprite.png` for characters/UI/ropes, `platformsprite.png` for platforms) with exact pixel positions defined in `spritePositions.ts`. All sprites render at 60% scale for retina.

The game runs in a modal/overlay triggered from the MountaintopInfo slide. Portrait orientation assumed.

## Goals / Non-Goals

**Goals:**
- Playable vertical platformer with three themed zones (forest, stone, ice)
- Touch and keyboard input
- Data-driven level layout for easy tweaking
- Character selection (male/female) with animated sprites
- Intro story, gameplay, and victory screen flow
- Smooth vertical scrolling with deadzone

**Non-Goals:**
- No enemies or combat
- No death/respawn — falling just means landing on a lower platform
- No sound/music (can be added later)
- No landscape mode support
- No multiplayer

## Decisions

### Canvas rendering over DOM elements
Canvas gives pixel-perfect sprite rendering, simple collision detection, and consistent performance. DOM-based sprites would fight with Tailwind/layout and make physics harder.

**Alternative**: DOM with CSS transforms. Rejected — harder to manage sprite sheets and per-frame physics.

### Game loop with requestAnimationFrame
Standard `requestAnimationFrame` loop with delta-time physics. Fixed timestep (60fps target) with accumulator to avoid physics instability on slow frames.

**Alternative**: setInterval. Rejected — not synced to display refresh, causes jank.

### Data-driven level config as TypeScript objects
Platform positions, rope placements, and level boundaries defined in a typed config object. This lets the designer adjust positions without touching game logic.

Structure:
```typescript
type LevelConfig = {
  basePlatform: { x: number; y: number }
  level1: Array<{ x: number; y: number; variant: 0 | 1 | 2 }>
  level1Ropes: Array<{ x: number; y: number; length: number }>
  level2BasePlatform: { x: number; y: number }
  level2: Array<{ x: number; y: number; variant: 0 | 1 | 2 }>
  level2Ropes: Array<{ x: number; y: number; length: number }>
  level3BasePlatform: { x: number; y: number }
  level3: Array<{ x: number; y: number; variant: 0 | 1 | 2 }>
  level3Ropes: Array<{ x: number; y: number; length: number }>
  finalPlatform: { x: number; y: number }
}
```

Y coordinates measured from bottom (game world), converted to canvas top-down during rendering.

### Character module with state machine
`Character.ts` manages sprite selection based on `kind` (male/female) and `state` (standing, walkingLeft, walkingRight, jumpingLeft, jumpingRight, climbing-idle, climbing). Animation frames cycle at 10ms intervals per the sprite spec.

### Camera system
The camera follows the player vertically. The player can move 25% of viewport height above/below center before the camera starts scrolling. No horizontal scrolling — the playable area fits one screen width.

### Ice physics in level 3
When on snow/ice platforms, the player slides extra pixels after stopping. On ropes in level 3, the character slowly slips down unless actively climbing. Implemented as a friction multiplier in the physics step.

### React integration
The game renders on a `<canvas>` element inside a React component. React manages screen state (intro → selection → playing → victory). The canvas game loop runs outside React's render cycle via refs and useEffect.

## Risks / Trade-offs

- **Touch input accuracy on small screens** → D-pad and jump button sized generously; sprite positions from asset sheet already account for this
- **Performance on low-end mobile** → Canvas 2D should be fine for this scope; sprite sheets are pre-loaded
- **Level balancing** → Data-driven config makes iteration fast; start with minimal platforms, add more by editing the config
- **Sprite scaling at 60%** → All collision boxes must use scaled dimensions consistently
