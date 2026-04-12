## MODIFIED Requirements

### Requirement: Switch-based rendering

App.tsx SHALL use a `switch` statement (or equivalent exhaustive branch) on the active slide value to render the appropriate component for each slide. The `'front'` case SHALL render the `FrontDoor` component. All other cases SHALL render a placeholder `<div>` with the slide name.

#### Scenario: Front slide renders FrontDoor component

- **WHEN** the active slide is `'front'`
- **THEN** the rendered output is the `FrontDoor` component (not a placeholder `<div>`)

#### Scenario: Other slides still render placeholders

- **WHEN** the active slide is any value other than `'front'`
- **THEN** a placeholder `<div>` with the slide name is rendered

#### Scenario: All five cases are handled

- **WHEN** the switch is evaluated for any valid `SlideId` value
- **THEN** a corresponding component or placeholder is rendered (no runtime error, no fallthrough to a default that hides missing cases)

### Requirement: No navigation controls

App.tsx SHALL NOT include navigation buttons or keyboard handlers. However, `setSlide` SHALL be passed as a prop to slide components that need to trigger navigation (e.g., `FrontDoor`).

#### Scenario: No global navigation UI

- **WHEN** the app renders
- **THEN** there are no navigation buttons or keyboard handlers in App.tsx itself

#### Scenario: setSlide is available to child components

- **WHEN** the `'front'` case renders `FrontDoor`
- **THEN** `FrontDoor` receives a callback prop that can set the active slide to `'welcome'`
