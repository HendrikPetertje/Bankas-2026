## ADDED Requirements

### Requirement: Navigation hint subtitle in registration banner
When registration is open, the banner SHALL display a hint subtitle beneath "Anmäl dig här nu" that instructs the user to click the glowing door for more information and games. The hint text SHALL be in Swedish, slightly smaller than the CTA text, and visually subordinate (muted colour).

#### Scenario: Hint is visible when registration is open
- **WHEN** the current date is on or after the registration opening date
- **THEN** the banner shows the hint subtitle below the "Anmäl dig här nu" link

#### Scenario: Hint is not shown when registration is closed
- **WHEN** the current date is before the registration opening date
- **THEN** the countdown text is shown and no hint subtitle is rendered

### Requirement: Tooltip paragraph removed from front slide
The delayed tooltip paragraph ("Tryck på dörren för att fortsätta") and its associated state/effect SHALL be removed from `FrontDoor.tsx`. The navigation hint in the banner serves this purpose instead.

#### Scenario: No tooltip appears below the door
- **WHEN** the front slide has been visible for more than 3 seconds
- **THEN** no tooltip text appears beneath the door image
