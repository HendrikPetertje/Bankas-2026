## ADDED Requirements

### Requirement: Virtual d-pad for touch devices
The game SHALL display a virtual d-pad (directional stick over directional background) in the bottom-left of the screen using sprites from the asset sheet.

#### Scenario: Player drags d-pad left
- **WHEN** the player touches and drags the d-pad knob to the left
- **THEN** the character moves left

#### Scenario: Player drags d-pad up on rope
- **WHEN** the player is on a rope and drags the d-pad up
- **THEN** the character climbs up the rope

### Requirement: Jump button for touch devices
The game SHALL display a jump button in the bottom-right of the screen using the jumpButton sprite.

#### Scenario: Player taps jump while stationary
- **WHEN** the player taps the jump button while not moving horizontally
- **THEN** the character jumps straight up

#### Scenario: Player taps jump while moving right
- **WHEN** the player taps the jump button while moving right
- **THEN** the character jumps diagonally up-right

### Requirement: Keyboard controls
The game SHALL accept arrow keys for movement and spacebar for jumping on keyboard devices.

#### Scenario: Player presses right arrow
- **WHEN** the player presses the right arrow key
- **THEN** the character moves right

#### Scenario: Player presses spacebar
- **WHEN** the player presses the spacebar
- **THEN** the character jumps (direction depends on current horizontal movement)

### Requirement: Rope climbing input
The game SHALL use up/down input to climb ropes. The player MUST climb the full length of the rope (to the top platform or bottom platform) before leaving the rope.

#### Scenario: Player climbs to top of rope
- **WHEN** the player presses up repeatedly while on a rope
- **THEN** the character climbs up and stands on the platform at the top when reaching the end

#### Scenario: Player tries to leave rope mid-climb
- **WHEN** the player presses left or right while climbing a rope
- **THEN** the input is ignored and the character stays on the rope
