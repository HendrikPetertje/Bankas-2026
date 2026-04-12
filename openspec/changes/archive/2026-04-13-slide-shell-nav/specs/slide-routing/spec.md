## MODIFIED Requirements

### Requirement: Switch-based rendering

App.tsx SHALL use a `switch` statement (or equivalent exhaustive branch) on the active slide value to render the appropriate component for each slide. The `'front'` case SHALL render the `FrontDoor` component. The `'welcome'` case SHALL render `ForestWelcome`. The `'info'` case SHALL render `MountaintopInfo`. The `'program'` case SHALL render `PlainsProgram`. The `'contact'` case SHALL render `CoastContact`. All slide components for slides 2-5 SHALL receive `activeSlide`, `onNavigate`, and `transitioning` props.

#### Scenario: Front slide renders FrontDoor component

- **WHEN** the active slide is `'front'`
- **THEN** the rendered output is the `FrontDoor` component

#### Scenario: Welcome slide renders ForestWelcome

- **WHEN** the active slide is `'welcome'`
- **THEN** the rendered output is the `ForestWelcome` component with navigation props

#### Scenario: Info slide renders MountaintopInfo

- **WHEN** the active slide is `'info'`
- **THEN** the rendered output is the `MountaintopInfo` component with navigation props

#### Scenario: Program slide renders PlainsProgram

- **WHEN** the active slide is `'program'`
- **THEN** the rendered output is the `PlainsProgram` component with navigation props

#### Scenario: Contact slide renders CoastContact

- **WHEN** the active slide is `'contact'`
- **THEN** the rendered output is the `CoastContact` component with navigation props

#### Scenario: All five cases are handled

- **WHEN** the switch is evaluated for any valid `SlideId` value
- **THEN** a corresponding component is rendered (no runtime error, no fallthrough to a default that hides missing cases)

### Requirement: No navigation controls

App.tsx SHALL NOT include navigation buttons or keyboard handlers. However, App.tsx SHALL manage transition state and provide an `onNavigate` callback that wraps `setSlide` with transition orchestration (dipTo delay → slide swap → dipFrom). `setSlide` and transition state SHALL be passed as props to slide components.

#### Scenario: No global navigation UI

- **WHEN** the app renders
- **THEN** there are no navigation buttons or keyboard handlers in App.tsx itself

#### Scenario: onNavigate wraps setSlide with transitions

- **WHEN** a slide component calls `onNavigate` with a target SlideId
- **THEN** App.tsx triggers the dip-to/swap/dip-from sequence before updating `activeSlide`

#### Scenario: setSlide is available to child components

- **WHEN** any slide case renders its component
- **THEN** the component receives an `onNavigate` callback that can trigger navigation with transitions

## ADDED Requirements

### Requirement: SlideId type is exported

App.tsx SHALL export the `SlideId` type so that other components (Slide, SlideNav, slide pages) can import and use it.

#### Scenario: SlideId importable from App

- **WHEN** another module imports `SlideId` from App.tsx
- **THEN** the type is available as `'front' | 'welcome' | 'info' | 'program' | 'contact'`

### Requirement: Transition state management

App.tsx SHALL maintain a `transitioning` boolean state that is `true` while any slide transition is in progress. This state SHALL be passed to slide components. Navigation calls SHALL be ignored while `transitioning` is `true`.

#### Scenario: Transitioning blocks navigation

- **WHEN** `transitioning` is `true` and `onNavigate` is called
- **THEN** the call is ignored

#### Scenario: Transitioning resets after complete cycle

- **WHEN** a full transition cycle completes (dipTo + slide swap + dipFrom)
- **THEN** `transitioning` is set back to `false`
