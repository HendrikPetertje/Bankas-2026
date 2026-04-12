## ADDED Requirements

### Requirement: SlideId type definition

App.tsx SHALL define a type alias `SlideId` with the union `'front' | 'welcome' | 'info' | 'program' | 'contact'`.

#### Scenario: Type exists with all five values

- **WHEN** the source of App.tsx is inspected
- **THEN** a `type SlideId` alias is declared containing exactly the literals `'front'`, `'welcome'`, `'info'`, `'program'`, and `'contact'`

### Requirement: Active slide state

App.tsx SHALL maintain a `useState<SlideId>` hook initialized to `'front'`.

#### Scenario: Initial state is front

- **WHEN** the app mounts
- **THEN** the active slide value is `'front'`

### Requirement: Switch-based rendering

App.tsx SHALL use a `switch` statement (or equivalent exhaustive branch) on the active slide value to render a placeholder `<div>` for each slide.

#### Scenario: Each slide value renders its name

- **WHEN** the active slide is `'front'`
- **THEN** the rendered output contains a `<div>` with the text `front`

#### Scenario: All five cases are handled

- **WHEN** the switch is evaluated for any valid `SlideId` value
- **THEN** a corresponding `<div>` placeholder is rendered (no runtime error, no fallthrough to a default that hides missing cases)

### Requirement: No navigation controls

This change SHALL NOT include navigation buttons, keyboard handlers, or any mechanism to change the active slide at runtime.

#### Scenario: No interactive elements

- **WHEN** the app renders
- **THEN** there are no buttons, links, or event handlers that call `setSlide`
