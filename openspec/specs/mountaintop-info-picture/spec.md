## ADDED Requirements

### Requirement: Main cutout image
The picture area SHALL render the `main-pic-cutout.png` image as the base layer, displayed at full width of the picture container.

#### Scenario: Base image is visible
- **WHEN** the slide is active
- **THEN** the main mountain cutout image is displayed as a block-level image at full container width

### Requirement: Cloud overlay group
Two cloud overlay images (`main-pic-cutout-clouds-1.png`, `main-pic-cutout-clouds-2.png`) SHALL be positioned absolutely over the main cutout and crossfade between each other on a 4-second cycle with a 1-second transition.

#### Scenario: Cloud crossfade timing
- **WHEN** the slide is active
- **THEN** clouds-1 is visible for 4 seconds, then transitions to clouds-2 over 1 second, clouds-2 is visible for 4 seconds, then transitions back to clouds-1 over 1 second, repeating indefinitely

#### Scenario: Cloud overlay positioning
- **WHEN** the cloud overlays render
- **THEN** each cloud image covers the full width and height of the main cutout image using absolute positioning with `inset-0`

### Requirement: Smoke overlay group
Two smoke overlay images (`main-pic-cutout-smoke-1.png`, `main-pic-cutout-smoke-2.png`) SHALL be positioned absolutely over the main cutout and crossfade between each other on a 3-second cycle with a 600ms transition.

#### Scenario: Smoke crossfade timing
- **WHEN** the slide is active
- **THEN** smoke-1 is visible for 3 seconds, then transitions to smoke-2 over 600ms, smoke-2 is visible for 3 seconds, then transitions back to smoke-1 over 600ms, repeating indefinitely

#### Scenario: Smoke overlay positioning
- **WHEN** the smoke overlays render
- **THEN** each smoke image covers the full width and height of the main cutout image using absolute positioning with `inset-0`

### Requirement: Detail overlay group
Three detail overlay images (`main-pic-cutout-overlay-1.png`, `-overlay-2.png`, `-overlay-3.png`) SHALL cycle sequentially with 5-second gaps and 2-second visibility, using opacity transitions.

#### Scenario: Detail overlay timing
- **WHEN** the slide is active
- **THEN** after an initial 5-second pause, overlay-1 becomes visible for 2 seconds, then hidden for 5 seconds, then overlay-2 becomes visible for 2 seconds, then hidden for 5 seconds, then overlay-3 becomes visible for 2 seconds, then hidden for 5 seconds, then back to overlay-1, repeating indefinitely

#### Scenario: Detail overlay transition
- **WHEN** an overlay becomes visible or hidden
- **THEN** the opacity transition uses an ease-in-out timing function

### Requirement: Overlay stacking order
All overlay groups SHALL stack above the main cutout image. The detail overlays SHALL be the topmost layer, smoke overlays in the middle, cloud overlays closest to the base image.

#### Scenario: Layer order
- **WHEN** all overlays are rendering
- **THEN** the stacking order from bottom to top is: main cutout, cloud overlays, smoke overlays, detail overlays

### Requirement: Overlays are non-interactive
All overlay images SHALL have `pointer-events: none` so they do not interfere with any future interactive elements on the slide.

#### Scenario: Overlays do not capture clicks
- **WHEN** a user clicks on the picture area
- **THEN** the click passes through all overlay images to the underlying content
