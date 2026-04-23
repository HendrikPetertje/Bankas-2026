## ADDED Requirements

### Requirement: Game intro screen with narrative and backpack

The BackpackGame component SHALL render an intro screen as the initial view. The intro screen SHALL display the backpack-start image centered at the bottom, with Swedish narrative text above it. The narrative text SHALL describe arriving in a new world, meeting a goblin, and needing to find paired items in the forest. A "Starta spelet" button (BlueButton) SHALL appear below the text.

#### Scenario: Intro screen renders on game open
- **WHEN** the game modal opens for the first time
- **THEN** the intro screen is displayed with backpack image, narrative text, and start button

#### Scenario: Start button transitions to playing state
- **WHEN** the user clicks the "Starta spelet" button
- **THEN** the game transitions from intro to the card grid (playing state)

### Requirement: Memory card grid layout

The playing screen SHALL display a 4x4 grid of 16 cards (8 pairs). Cards SHALL be shuffled randomly on each game start. Each card SHALL display `card-back.jpg` when face-down and its unique illustration when face-up. Card elements SHALL have rounded corners.

#### Scenario: Cards render in 4x4 grid
- **WHEN** the game enters playing state
- **THEN** 16 cards are displayed in a 4-column grid, all face-down

#### Scenario: Cards are shuffled
- **WHEN** a new game starts (initial or retry)
- **THEN** card positions are randomized

### Requirement: Card flip and matching logic

The player SHALL be able to flip cards by clicking them. Only two cards may be face-up at a time (excluding already-matched cards). When two face-up cards are a matching pair (e.g., 1-1 and 1-2), they SHALL remain face-up permanently. When two face-up cards do not match, they SHALL flip back face-down after a brief delay. Each pair of two card flips SHALL count as one attempt.

#### Scenario: First card flip
- **WHEN** the player clicks a face-down card
- **THEN** the card flips to reveal its illustration

#### Scenario: Matching pair found
- **WHEN** the player flips a second card that matches the first flipped card
- **THEN** both cards remain face-up and the attempt counter increments by 1

#### Scenario: Non-matching pair
- **WHEN** the player flips a second card that does not match the first
- **THEN** both cards flip back face-down after a short delay and the attempt counter increments by 1

#### Scenario: Already matched cards are not interactive
- **WHEN** the player clicks a card that is already matched
- **THEN** nothing happens — the card stays face-up

#### Scenario: Cannot flip third card while two are revealed
- **WHEN** two unmatched cards are face-up and the player clicks a third card
- **THEN** the click is ignored until the two cards flip back

### Requirement: Game completion screen

When all 8 pairs are matched, the game SHALL transition to a completion screen. The screen SHALL show the backpack-end image, a congratulatory message in Swedish, the number of attempts in bold larger text, an encouragement message about climbing the mountain, and a "Försök igen" (Try Again) BlueButton.

#### Scenario: All pairs matched triggers completion
- **WHEN** the player matches the final (8th) pair
- **THEN** the game transitions to the completion screen

#### Scenario: Attempt count displayed
- **WHEN** the completion screen renders
- **THEN** it displays "Du hittade alla kombinationer på XX försök" where XX is the attempt count in bold, slightly larger font

#### Scenario: Try again resets the game
- **WHEN** the player clicks "Försök igen"
- **THEN** the game resets to the intro screen with shuffled cards and zero attempts

### Requirement: Game asset loading screen

The BackpackGame component SHALL preload all game images (card fronts, card back, backpack images, button assets) using the existing LoadingScreen component before rendering any game content. Game assets SHALL NOT be included in the main site's asset preload array.

#### Scenario: Loading screen shown before game
- **WHEN** the game modal opens
- **THEN** a LoadingScreen is displayed while game assets load

#### Scenario: Game renders after loading complete
- **WHEN** all game assets have finished loading
- **THEN** the LoadingScreen fades out and the game intro screen appears

#### Scenario: Game assets not in main preload
- **WHEN** the main site loads
- **THEN** backpack game images are not included in the main LoadingScreen asset list

### Requirement: Game component file location

The BackpackGame component SHALL live at `src/slides/ForestWelcome/BackpackGame/BackpackGame.tsx`. All game image assets SHALL be stored in `src/slides/ForestWelcome/BackpackGame/images/`.

#### Scenario: Component path
- **WHEN** the game is implemented
- **THEN** the main component file is `src/slides/ForestWelcome/BackpackGame/BackpackGame.tsx`

#### Scenario: Asset path
- **WHEN** game images are referenced
- **THEN** they are imported from `src/slides/ForestWelcome/BackpackGame/images/`
