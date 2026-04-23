## MODIFIED Requirements

### Requirement: Slide component accepts content and picture slots

The `Slide` component SHALL accept a `children` prop (ReactNode) for page content, a `picture` prop (ReactNode) for the illustration area, and optionally a `gameContent` prop (ReactNode) for a game modal. When `gameContent` is provided, `isGameOpen` (boolean) and `onGameClose` (callback) props SHALL also be accepted. Content SHALL render above the picture in the vertical flow. A joystick icon SHALL overlay the top-right of the picture when `gameContent` is present.

#### Scenario: Content renders above picture
- **WHEN** a Slide is rendered with both `children` and `picture` props
- **THEN** the children content appears above the picture content in the DOM order

#### Scenario: Game props are optional
- **WHEN** a Slide is rendered without `gameContent`
- **THEN** no joystick icon or game modal elements are rendered and the Slide behaves exactly as before
