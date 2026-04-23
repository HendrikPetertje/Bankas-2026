## ADDED Requirements

### Requirement: Three-part image button

The `BlueButton` component SHALL render a button using three image assets: a left-cap PNG, a repeating middle-background PNG, and a right-cap PNG. The button text SHALL be centered over the middle section. The component SHALL accept `children` (ReactNode) and `onClick` (callback) props.

#### Scenario: Button renders with three parts
- **WHEN** the BlueButton is rendered
- **THEN** it displays a left-cap image, a repeating background middle section, and a right-cap image in a horizontal flex layout

#### Scenario: Text displayed over button
- **WHEN** the BlueButton has children text
- **THEN** the text is centered over the button

### Requirement: Button hover and active states

The button SHALL become 15% transparent on hover (`opacity: 0.85`) and 30% transparent when clicked/active (`opacity: 0.7`).

#### Scenario: Hover transparency
- **WHEN** the user hovers over the button
- **THEN** the button opacity changes to 0.85

#### Scenario: Active transparency
- **WHEN** the user clicks and holds the button
- **THEN** the button opacity changes to 0.7

### Requirement: Button component file location

The BlueButton component SHALL live at `src/components/BlueButton/BlueButton.tsx`.

#### Scenario: Component path
- **WHEN** the button component is implemented
- **THEN** the file is located at `src/components/BlueButton/BlueButton.tsx`
