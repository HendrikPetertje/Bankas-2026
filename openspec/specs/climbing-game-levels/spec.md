## ADDED Requirements

### Requirement: Data-driven level configuration
All platform and rope positions SHALL be defined in a TypeScript configuration object (`LevelConfig`), not hardcoded in game logic.

#### Scenario: Level loads from config
- **WHEN** the game starts a level
- **THEN** all platforms and ropes are placed according to the `LevelConfig` object

### Requirement: Three themed zones
The game world SHALL consist of three zones stacked vertically, each ~2000px tall: forest (bottom), stone (middle), ice/snow (top).

#### Scenario: Forest zone uses forest platforms
- **WHEN** rendering platforms in level 1 (0-2000px)
- **THEN** forest and forestLong sprite variants are used

#### Scenario: Stone zone uses stone platforms
- **WHEN** rendering platforms in level 2 (2000-4000px)
- **THEN** stone and longStone sprite variants are used

#### Scenario: Ice zone uses snow platforms
- **WHEN** rendering platforms in level 3 (4000-6000px)
- **THEN** snow and longSnow sprite variants are used

### Requirement: Full-width base platforms between zones
Each zone SHALL begin with a full-width platform (forestLong, longStone, or longSnow) that spans the entire playable screen width, connected by a rope from the zone below.

#### Scenario: Transition from forest to stone
- **WHEN** the player climbs the rope at the top of level 1
- **THEN** they arrive on a full-width longStone platform at the start of level 2

### Requirement: Ice physics in level 3
In the snow/ice zone, the player SHALL slide extra pixels after stopping movement. On ropes in level 3, the player SHALL slowly slip downward unless actively climbing.

#### Scenario: Player stops on ice
- **WHEN** the player releases movement input while on a snow platform
- **THEN** the character slides a few extra pixels in the last movement direction before stopping

#### Scenario: Player idles on rope in ice zone
- **WHEN** the player stops climbing on a rope in level 3
- **THEN** the character slowly slides down the rope

### Requirement: Clouds in level 2
In the stone zone, clouds SHALL scroll horizontally across the screen at two vertical positions. Clouds have transparency so the player remains visible behind them.

#### Scenario: Cloud crosses screen
- **WHEN** the camera is showing level 2
- **THEN** cloud sprites scroll from left to right across the viewport at a steady pace

### Requirement: Platform variant selection
Each platform in the config SHALL specify a variant (0, 1, or 2) that maps to the corresponding sprite in the platform arrays (forest[0-2], stone[0-2], snow[0-2]).

#### Scenario: Variant 1 stone platform
- **WHEN** a level 2 platform has variant 1
- **THEN** it renders using `stone[1]` from the sprite sheet
