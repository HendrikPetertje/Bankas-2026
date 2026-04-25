## ADDED Requirements

### Requirement: Intro story screen
The game SHALL display an intro story screen in Swedish before character selection. The story describes the mountain climbing challenge and a friendly drake who helps with ropes.

#### Scenario: Game opens with story
- **WHEN** the player opens the climbing game
- **THEN** the intro story is displayed in Swedish with a prompt to continue

### Requirement: Character selection screen
After the intro story, the game SHALL show male and female characters standing on a forest platform. The player picks one by clicking/tapping.

#### Scenario: Both characters displayed
- **WHEN** the selection screen is shown
- **THEN** both male and female standing sprites are visible side by side on a forestLong platform

### Requirement: Fade transition to gameplay
After character selection, the screen SHALL fade to black then fade in to reveal the game level.

#### Scenario: Selection triggers fade
- **WHEN** the player selects a character
- **THEN** the screen fades to black, then fades in showing the game world with the selected character on the base platform

### Requirement: Victory screen with timer
When the player stands still on the final platform for 1 second, the game SHALL show a victory screen with both characters on the finish platform, congratulatory text in Swedish, the elapsed time in mm:ss format, and a "Spela igen" (play again) button.

#### Scenario: Player reaches final platform
- **WHEN** the player stands still on the final platform for 1 second
- **THEN** the victory screen appears showing climb time and play again option

#### Scenario: Player clicks play again
- **WHEN** the player clicks "Spela igen"
- **THEN** the game returns to the intro story screen

### Requirement: Timer runs during gameplay
The game SHALL track elapsed time from the moment gameplay starts (after fade-in) until the player stands on the final platform.

#### Scenario: Timer displays on victory
- **WHEN** the victory screen shows
- **THEN** the elapsed time is displayed in mm:ss format
