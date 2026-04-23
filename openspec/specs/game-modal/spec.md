## ADDED Requirements

### Requirement: Optional game modal on Slide

The `Slide` component SHALL accept an optional `gameContent` prop of type `ReactNode`. When `gameContent` is provided, the Slide SHALL also accept `isGameOpen` (boolean) and `onGameClose` (callback) props. The modal SHALL render as a full-screen overlay on mobile and a centered container with a reasonable max-width on desktop. The modal SHALL have a `fixed inset-0` position with a high z-index above all other slide content.

#### Scenario: No gameContent means no game UI
- **WHEN** the Slide renders without a `gameContent` prop
- **THEN** no joystick icon and no modal are rendered

#### Scenario: Modal opens when isGameOpen is true
- **WHEN** `gameContent` is provided and `isGameOpen` is `true`
- **THEN** the modal is visible with the game content rendered inside

#### Scenario: Modal is full-screen on mobile
- **WHEN** the game modal is open on a mobile viewport
- **THEN** the modal fills the entire screen

#### Scenario: Modal has max-width on desktop
- **WHEN** the game modal is open on a desktop viewport
- **THEN** the modal is centered with a reasonable max-width

### Requirement: Joystick icon overlay on picture

When `gameContent` is provided, a joystick icon SHALL render overlaying the top-right corner of the main picture area. Clicking the joystick SHALL trigger opening the game (setting `isGameOpen` to `true`).

#### Scenario: Joystick visible when game available
- **WHEN** the Slide has a `gameContent` prop
- **THEN** a joystick icon is displayed over the top-right of the picture

#### Scenario: Joystick click opens game
- **WHEN** the user clicks the joystick icon
- **THEN** the game modal opens

### Requirement: Modal close button matches mobile nav style

The game modal SHALL include a close button positioned at the top-right of the modal, using the same close button PNG asset and styling as the `MobileMapOverlay` close button (absolute positioned, `top-6 right-6`, `h-10 w-10`). Clicking the close button SHALL call `onGameClose`.

#### Scenario: Close button dismisses modal
- **WHEN** the user clicks the close button in the game modal
- **THEN** the modal closes via `onGameClose`

### Requirement: Clicking outside modal does not close it

Clicking on the backdrop area outside the modal content SHALL NOT dismiss the modal. Only the close button SHALL be able to close the modal.

#### Scenario: Backdrop click does not dismiss
- **WHEN** the user clicks on the backdrop area outside the game modal content
- **THEN** the modal remains open
