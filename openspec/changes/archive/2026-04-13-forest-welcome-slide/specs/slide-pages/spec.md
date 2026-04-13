## MODIFIED Requirements

### Requirement: ForestWelcome placeholder component

A `ForestWelcome` component SHALL exist at `src/slides/ForestWelcome/ForestWelcome.tsx`. It SHALL use the `Slide` shell component and render the full welcome slide content: logo, welcome heading and text (via react-markdown), content images with rotation, flying creature animations, and a forest background with cycling overlays in the picture slot.

#### Scenario: ForestWelcome renders with full content

- **WHEN** the active slide is 'welcome'
- **THEN** the ForestWelcome component renders inside a Slide shell with the camp logo, welcome text, content images, flying creatures, and the forest background with animated overlays
