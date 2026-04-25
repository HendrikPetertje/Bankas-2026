## ADDED Requirements

### Requirement: Game loop runs at consistent frame rate
The game engine SHALL run a `requestAnimationFrame` loop with delta-time accumulator targeting 60fps. Physics updates SHALL use fixed timesteps to prevent instability.

#### Scenario: Stable physics on varying frame rates
- **WHEN** the browser delivers frames at inconsistent intervals
- **THEN** the physics accumulator ensures consistent movement regardless of actual frame rate

### Requirement: Gravity applies to the player when airborne
The game engine SHALL apply downward gravity to the player character when they are not standing on a platform or climbing a rope.

#### Scenario: Player walks off platform edge
- **WHEN** the player moves past the edge of a platform
- **THEN** the player falls downward until landing on another platform below

### Requirement: Platform collision detection
The game engine SHALL detect when the player's feet hitbox intersects with a platform's ground line and stop downward movement.

#### Scenario: Player lands on platform
- **WHEN** the player is falling and their feet hitbox reaches a platform ground line
- **THEN** the player stops falling and stands on that platform

### Requirement: Rope collision detection
The game engine SHALL detect when the player's feet hitbox overlaps with a rope's horizontal bounds.

#### Scenario: Player presses up near a rope
- **WHEN** the player's feet hitbox is within the rope's horizontal bounds and the player presses up
- **THEN** the player enters climbing state on that rope

### Requirement: Camera follows player vertically with deadzone
The camera SHALL keep the player within the center 50% of the viewport (25% above and below center). The camera SHALL NOT scroll horizontally.

#### Scenario: Player moves above deadzone
- **WHEN** the player moves higher than 25% above viewport center
- **THEN** the camera scrolls up to keep the player at the deadzone edge

#### Scenario: Player is within deadzone
- **WHEN** the player moves within the center 50% of the viewport
- **THEN** the camera does not scroll

### Requirement: Canvas renders sprites from sprite sheets
The game engine SHALL render all game elements by drawing regions from the two sprite sheets (`assetsprite.png`, `platformsprite.png`) at 60% scale.

#### Scenario: Platform renders correctly
- **WHEN** a platform is within the camera viewport
- **THEN** the engine draws the correct sprite region at 60% scale at the platform's position

### Requirement: Player cannot fall off the map
The game engine SHALL prevent the player from moving below the base platform or beyond the horizontal screen bounds.

#### Scenario: Player at screen edge
- **WHEN** the player moves to the left or right edge of the playable area
- **THEN** the player is stopped at the boundary
