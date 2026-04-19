## MODIFIED Requirements

### Requirement: PlainsProgram placeholder component

A `PlainsProgram` component SHALL exist at `src/slides/PlainsProgram/PlainsProgram.tsx`. It SHALL use the `Slide` shell component and render the full program slide content: title "Dagsprogram", daily schedule text via `react-markdown`, three animated background layers (big clouds, small clouds, flock of birds) in the children slot, and `main-pic.jpg` with chimney smoke overlays and sequential detail overlays in the picture slot.

#### Scenario: PlainsProgram renders with full content
- **WHEN** the active slide is 'program'
- **THEN** the PlainsProgram component renders inside a Slide shell with the daily schedule heading, markdown content, animated background layers, and the main picture with animated overlays
