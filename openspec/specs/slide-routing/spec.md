### Requirement: SlideId type definition and export

App.tsx SHALL define and export a type alias `SlideId` with the union `'front' | 'welcome' | 'info' | 'program' | 'contact'`.

#### Scenario: Type exists with all five values

- **WHEN** the source of App.tsx is inspected
- **THEN** a `type SlideId` alias is declared containing exactly the literals `'front'`, `'welcome'`, `'info'`, `'program'`, and `'contact'`

#### Scenario: SlideId importable from App

- **WHEN** another module imports `SlideId` from App.tsx
- **THEN** the type is available as `'front' | 'welcome' | 'info' | 'program' | 'contact'`

### Requirement: Active slide state

App.tsx SHALL maintain a `useState<SlideId>` hook initialized to `'front'`.

#### Scenario: Initial state is front

- **WHEN** the app mounts
- **THEN** the active slide value is `'front'`

### Requirement: Transition state management

App.tsx SHALL maintain:
- A `transitioning` boolean state (true while any transition is in progress)
- A `transitionDirection` state (`'forward' | 'backward' | null`) indicating the direction of the current transition
- A `dipToActive` boolean state that is explicitly set to `true` on the current slide before the swap and `false` before mounting the new slide
- A `transitioningRef` (useRef) to avoid stale closure issues in the transition callback

Navigation calls SHALL be ignored while `transitioningRef.current` is `true`.

#### Scenario: Transitioning blocks navigation

- **WHEN** `transitioningRef.current` is `true` and `onNavigate` is called
- **THEN** the call is ignored

#### Scenario: Transitioning resets after complete cycle

- **WHEN** a full transition cycle completes (dipTo + slide swap + dipFrom)
- **THEN** `transitioning` and `transitioningRef.current` are set back to `false`

### Requirement: Switch-based rendering

App.tsx SHALL use a `switch` statement (or equivalent exhaustive branch) on the active slide value to render the appropriate component for each slide. The `'front'` case SHALL render the `FrontDoor` component with only `onNavigate`. The `'welcome'` case SHALL render `ForestWelcome`. The `'info'` case SHALL render `MountaintopInfo`. The `'program'` case SHALL render `PlainsProgram`. The `'contact'` case SHALL render `CoastContact`. All slide components for slides 2-5 SHALL receive `activeSlide`, `onNavigate`, `transitioning`, `transitionDirection`, and `dipToActive` props.

#### Scenario: Front slide renders FrontDoor component

- **WHEN** the active slide is `'front'`
- **THEN** the rendered output is the `FrontDoor` component with only `onNavigate`

#### Scenario: Welcome slide renders ForestWelcome

- **WHEN** the active slide is `'welcome'`
- **THEN** the rendered output is the `ForestWelcome` component with full navigation/transition props

#### Scenario: All five cases are handled

- **WHEN** the switch is evaluated for any valid `SlideId` value
- **THEN** a corresponding component is rendered (no runtime error, no fallthrough to a default that hides missing cases)

### Requirement: No navigation controls in App

App.tsx SHALL NOT include navigation buttons or keyboard handlers. However, App.tsx SHALL manage transition state and provide an `onNavigate` callback that wraps `setSlide` with transition orchestration. The orchestration sequence is:

1. Set `dipToActive = true` and `transitionDirection` on the current slide
2. After 2s: set `dipToActive = false`, swap to the new slide, clear `transitionDirection`
3. After another 2s: set `transitioning = false`

#### Scenario: No global navigation UI

- **WHEN** the app renders
- **THEN** there are no navigation buttons or keyboard handlers in App.tsx itself

#### Scenario: onNavigate wraps setSlide with transitions

- **WHEN** a slide component calls `onNavigate` with a target SlideId
- **THEN** App.tsx triggers the dipTo → swap → dipFrom sequence before finishing the transition
