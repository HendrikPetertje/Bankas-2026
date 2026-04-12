## ADDED Requirements

### Requirement: Slide components use folder-per-slide structure

Each slide component SHALL live in its own folder under `src/slides/`, following the pattern `src/slides/<Name>/<Name>.tsx`. This allows co-locating images, text content, and other assets alongside the component file.

#### Scenario: Folder structure exists for each slide

- **WHEN** the project structure is inspected
- **THEN** each slide component exists at `src/slides/<Name>/<Name>.tsx` (e.g., `src/slides/ForestWelcome/ForestWelcome.tsx`)

### Requirement: ForestWelcome placeholder component

A `ForestWelcome` component SHALL exist at `src/slides/ForestWelcome/ForestWelcome.tsx`. It SHALL use the `Slide` shell component and render `<div>TODO: Forest Welcome content</div>` as children and `<div>TODO: Forest Welcome image content</div>` as the picture prop.

#### Scenario: ForestWelcome renders with Slide shell

- **WHEN** the active slide is 'welcome'
- **THEN** the ForestWelcome component renders inside a Slide shell with placeholder content

### Requirement: MountaintopInfo placeholder component

A `MountaintopInfo` component SHALL exist at `src/slides/MountaintopInfo/MountaintopInfo.tsx`. It SHALL use the `Slide` shell component and render `<div>TODO: Mountaintop Info content</div>` as children and `<div>TODO: Mountaintop Info image content</div>` as the picture prop.

#### Scenario: MountaintopInfo renders with Slide shell

- **WHEN** the active slide is 'info'
- **THEN** the MountaintopInfo component renders inside a Slide shell with placeholder content

### Requirement: PlainsProgram placeholder component

A `PlainsProgram` component SHALL exist at `src/slides/PlainsProgram/PlainsProgram.tsx`. It SHALL use the `Slide` shell component and render `<div>TODO: Plains Program content</div>` as children and `<div>TODO: Plains Program image content</div>` as the picture prop.

#### Scenario: PlainsProgram renders with Slide shell

- **WHEN** the active slide is 'program'
- **THEN** the PlainsProgram component renders inside a Slide shell with placeholder content

### Requirement: CoastContact placeholder component

A `CoastContact` component SHALL exist at `src/slides/CoastContact/CoastContact.tsx`. It SHALL use the `Slide` shell component and render `<div>TODO: Coast Contact content</div>` as children and `<div>TODO: Coast Contact image content</div>` as the picture prop.

#### Scenario: CoastContact renders with Slide shell

- **WHEN** the active slide is 'contact'
- **THEN** the CoastContact component renders inside a Slide shell with placeholder content

### Requirement: All slide components accept navigation props

Each placeholder slide component SHALL accept `activeSlide`, `onNavigate`, and `transitioning` props so that the Slide shell can wire up navigation and transitions.

#### Scenario: Props passed through to Slide shell

- **WHEN** any slide component receives navigation props from App.tsx
- **THEN** it passes them through to the Slide shell component for nav rendering and transition control
