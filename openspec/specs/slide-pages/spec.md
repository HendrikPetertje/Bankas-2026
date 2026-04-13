### Requirement: Slide components use folder-per-slide structure

Each slide component SHALL live in its own folder under `src/slides/`, following the pattern `src/slides/<Name>/<Name>.tsx`. This allows co-locating images, text content, and other assets alongside the component file.

#### Scenario: Folder structure exists for each slide

- **WHEN** the project structure is inspected
- **THEN** each slide component exists at `src/slides/<Name>/<Name>.tsx` (e.g., `src/slides/ForestWelcome/ForestWelcome.tsx`)

### Requirement: ForestWelcome component

A `ForestWelcome` component SHALL exist at `src/slides/ForestWelcome/ForestWelcome.tsx`. It SHALL use the `Slide` shell component and render the full welcome slide content: logo, welcome heading and text (via react-markdown), content images with rotation, flying creature animations, and a forest background with cycling overlays in the picture slot.

#### Scenario: ForestWelcome renders with full content

- **WHEN** the active slide is 'welcome'
- **THEN** the ForestWelcome component renders inside a Slide shell with the camp logo, welcome text, content images, flying creatures, and the forest background with animated overlays

### Requirement: MountaintopInfo placeholder component

A `MountaintopInfo` component SHALL exist at `src/slides/MountaintopInfo/MountaintopInfo.tsx`. It SHALL use the `Slide` shell component and render placeholder content as children and picture props.

#### Scenario: MountaintopInfo renders with Slide shell

- **WHEN** the active slide is 'info'
- **THEN** the MountaintopInfo component renders inside a Slide shell with placeholder content

### Requirement: PlainsProgram placeholder component

A `PlainsProgram` component SHALL exist at `src/slides/PlainsProgram/PlainsProgram.tsx`. It SHALL use the `Slide` shell component and render placeholder content as children and picture props.

#### Scenario: PlainsProgram renders with Slide shell

- **WHEN** the active slide is 'program'
- **THEN** the PlainsProgram component renders inside a Slide shell with placeholder content

### Requirement: CoastContact placeholder component

A `CoastContact` component SHALL exist at `src/slides/CoastContact/CoastContact.tsx`. It SHALL use the `Slide` shell component and render placeholder content as children and picture props.

#### Scenario: CoastContact renders with Slide shell

- **WHEN** the active slide is 'contact'
- **THEN** the CoastContact component renders inside a Slide shell with placeholder content

### Requirement: All slide components accept full navigation and transition props

Each placeholder slide component SHALL accept `activeSlide`, `onNavigate`, `transitioning`, `transitionDirection`, and `dipToActive` props so that the Slide shell can wire up navigation and transitions.

#### Scenario: Props passed through to Slide shell

- **WHEN** any slide component receives navigation and transition props from App.tsx
- **THEN** it passes them through to the Slide shell component for nav rendering and transition control
