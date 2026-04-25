## ADDED Requirements

### Requirement: Character asset module
A `Character.ts` module SHALL export character configuration with props: `kind` ("female" | "male") and `state` ("walkingLeft" | "walkingRight" | "jumpingLeft" | "jumpingRight" | "standing" | "climbing-idle" | "climbing").

#### Scenario: Character state determines sprite
- **WHEN** the character state is "walkingRight"
- **THEN** the renderer cycles through the walking sprite frames for the selected character kind

### Requirement: Sprite animation at defined intervals
Character sprites SHALL cycle through animation frames at 10ms intervals as specified in the sprite data.

#### Scenario: Walking animation cycles
- **WHEN** the character is in walkingRight state
- **THEN** the 5 walking frames cycle at 10ms intervals

### Requirement: Character mirroring for left-facing
All character sprites face right by default. When the character moves or faces left, the sprite SHALL be horizontally mirrored.

#### Scenario: Character walks left
- **WHEN** the character state is "walkingLeft"
- **THEN** the walking sprites are rendered mirrored horizontally

### Requirement: Character selection
The player SHALL choose between male and female characters before gameplay starts. Both characters are shown standing side by side on a forest platform and are clickable.

#### Scenario: Player clicks female character
- **WHEN** the player clicks/taps the female character on the selection screen
- **THEN** the female character is selected and gameplay begins after a fade transition

### Requirement: Character feet hitbox
Character collision SHALL use a feet hitbox between pixels 71-137 from the left of the 197px-wide sprite (at original scale, adjusted for 60% rendering).

#### Scenario: Feet hitbox used for platform landing
- **WHEN** checking if the character stands on a platform
- **THEN** only the feet hitbox area (not the full sprite width) is checked against the platform
