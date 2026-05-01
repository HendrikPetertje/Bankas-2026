## ADDED Requirements

### Requirement: Modal integration into PlainsProgram
The FarmingGame SHALL be integrated into the PlainsProgram slide using the same `gameContent`/`isGameOpen`/`onGameOpen`/`onGameClose` pattern as BackpackGame on ForestWelcome.

#### Scenario: Game modal opened
- **WHEN** the user triggers the game on the PlainsProgram slide
- **THEN** the modal SHALL open with FarmingGame rendered as the game content

### Requirement: Intro frame with narrative
The first frame SHALL display a Swedish narrative introducing the farming game, with an intro image as background and a "Starta spelet" button.

#### Scenario: Intro displayed on open
- **WHEN** the game modal opens
- **THEN** the intro story text (in Swedish) SHALL be displayed with the intro image and a BlueButton to proceed

#### Scenario: Start button proceeds to login
- **WHEN** the user clicks "Starta spelet"
- **THEN** the frame SHALL transition to the login frame

### Requirement: Asset preloading with LoadingScreen
The system SHALL use the existing `LoadingScreen` component to preload all farming game PNG assets before the game UI renders (including intro frame images).

#### Scenario: Assets preloaded before game starts
- **WHEN** the game modal opens
- **THEN** the `LoadingScreen` SHALL be shown first with all game assets (intro image, grid tiles, plant overlays, button images, score fruits, seed packets) passed as the `assets` prop
- **THEN** the intro frame SHALL only render after `onDone` fires

### Requirement: Login loading overlay
The system SHALL show a custom loading overlay (watering can image from button-images + "Laddar..." text) after the user logs in or creates an account, while the backend authenticates and warms up.

#### Scenario: Auth loading shown after login/signup
- **WHEN** the user submits credentials or selects a saved account
- **THEN** a full-overlay loading screen with the watering can image and "Laddar..." text SHALL appear until the auth response arrives and garden data is loaded

The garden frame SHALL show the farm name and total KG produced at the top.

#### Scenario: Header displays farm info
- **WHEN** the garden is loaded
- **THEN** the header SHALL show the user's farm name and total `produced_g` converted to KG

### Requirement: Auto-refresh on inactivity
The system SHALL poll `/api/farms/me` every ~20 seconds when the user has not performed any action.

#### Scenario: Idle polling
- **WHEN** 20 seconds pass without any user action
- **THEN** the garden state SHALL be refreshed from the backend

#### Scenario: Timer resets on action
- **WHEN** the user performs any action (water, seed, clean, harvest)
- **THEN** the idle timer SHALL reset

#### Scenario: Race condition protection
- **WHEN** a poll response arrives while an action is in-flight
- **THEN** the poll response SHALL be discarded

### Requirement: Error handling with error bar
The system SHALL display a temporary error bar over the garden when a backend request fails.

#### Scenario: Action fails
- **WHEN** a plot action request fails (non-401)
- **THEN** an error bar SHALL appear for a few seconds, then the garden SHALL reload from `/me`

#### Scenario: Auth expired
- **WHEN** any request returns 401
- **THEN** the system SHALL return to the login frame

### Requirement: Loading state during actions
The system SHALL gray out all plots and disable interactions while a POST action is in-flight.

#### Scenario: Action in progress
- **WHEN** a plot action POST is pending
- **THEN** all plots SHALL be visually dimmed and no further actions SHALL be accepted

#### Scenario: Polling does not block interaction
- **WHEN** the background `/me` poll is in-flight
- **THEN** the user SHALL still be able to interact with plots normally
