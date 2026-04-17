## ADDED Requirements

### Requirement: Main picture image
The picture area SHALL render `main-pic.jpg` as the base layer, displayed at full width of the picture container.

#### Scenario: Base image is visible
- **WHEN** the slide is active
- **THEN** the main plains image is displayed as a block-level image at full container width

### Requirement: Chimney smoke overlay group
Two chimney smoke overlay images (`main-pic-overlay-chimney-smoke-1.png`, `main-pic-overlay-chimney-smoke-2.png`) SHALL be positioned absolutely over the main image and crossfade between each other on a 3-second cycle with a 600ms transition — matching the MountaintopInfo smoke group timing exactly.

#### Scenario: Chimney smoke crossfade timing
- **WHEN** the slide is active
- **THEN** chimney-smoke-1 is visible for 3 seconds, then transitions to chimney-smoke-2 over 600ms, chimney-smoke-2 is visible for 3 seconds, then transitions back to chimney-smoke-1 over 600ms, repeating indefinitely

#### Scenario: Chimney smoke overlay positioning
- **WHEN** the chimney smoke overlays render
- **THEN** each smoke image covers the full width and height of the main image using absolute positioning with `inset-0`

### Requirement: Detail overlay group
Three detail overlay images (`main-pic-overlay-1.png`, `main-pic-overlay-2.png`, `main-pic-overlay-3.png`) SHALL cycle sequentially with 5-second gaps and 2-second visibility — matching the MountaintopInfo detail overlay pattern exactly.

#### Scenario: Detail overlay timing
- **WHEN** the slide is active
- **THEN** after an initial 5-second pause, overlay-1 becomes visible for 2 seconds, then hidden for 5 seconds, then overlay-2 becomes visible for 2 seconds, then hidden for 5 seconds, then overlay-3 becomes visible for 2 seconds, then hidden for 5 seconds, then back to overlay-1, repeating indefinitely

#### Scenario: Detail overlay transition
- **WHEN** an overlay becomes visible or hidden
- **THEN** the opacity transition uses an ease-in-out timing function

### Requirement: Overlay stacking order
The chimney smoke overlays SHALL be below the detail overlays in stacking order.

#### Scenario: Layer order
- **WHEN** all overlays are rendering
- **THEN** the stacking order from bottom to top is: main image, chimney smoke overlays, detail overlays

### Requirement: Overlays are non-interactive
All overlay images SHALL have `pointer-events: none` so they do not interfere with any future interactive elements.

#### Scenario: Overlays do not capture clicks
- **WHEN** a user clicks on the picture area
- **THEN** the click passes through all overlay images to underlying content
