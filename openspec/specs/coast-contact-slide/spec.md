## ADDED Requirements

### Requirement: Content area renders title and text
The slide SHALL display the heading "Frågor, information & Bilda" and the markdown content from `slideContent.ts` in the scrollable content pane.

#### Scenario: Title is visible
- **WHEN** the CoastContact slide is active
- **THEN** the heading "Frågor, information & Bilda" is rendered using the display font class

#### Scenario: Text content is rendered
- **WHEN** the CoastContact slide is active
- **THEN** the markdown content (arrangörer, föräldrar/ledare, contact info) is displayed via MarkdownContent

### Requirement: Bilda logo is centered and links externally
The slide SHALL render the Bilda PNG logo centered below the text content, wrapped in an anchor tag pointing to `https://bilda.nu` that opens in a new tab.

#### Scenario: Logo is visible and centered
- **WHEN** the CoastContact slide is active
- **THEN** the Bilda logo image is displayed, horizontally centered

#### Scenario: Logo links to bilda.nu
- **WHEN** the user clicks the Bilda logo
- **THEN** `https://bilda.nu` opens in a new browser tab

### Requirement: Three content photos displayed in rotated strip
The slide SHALL display three photos below the Bilda logo in a horizontal row with slight individual rotations, matching the style of PlainsProgram.

#### Scenario: Photos are rendered
- **WHEN** the CoastContact slide is active
- **THEN** three images are displayed side-by-side with individual rotation transforms and rounded corners

### Requirement: Animated background layers in content area
The slide SHALL render three drifting background layers behind the text: clouds drifting right-to-left, a flock of pigeons drifting left-to-right, and a soccer ball following a curved arc across the sky.

#### Scenario: Clouds drift right-to-left
- **WHEN** the CoastContact slide is active
- **THEN** the clouds image animates using the `drift` keyframe (right-to-left direction), positioned near the top of the content area

#### Scenario: Pigeons drift left-to-right
- **WHEN** the CoastContact slide is active
- **THEN** the flock-of-pigeons image animates using the `drift-reverse` keyframe, positioned below the clouds

#### Scenario: Soccer ball arcs across sky
- **WHEN** the CoastContact slide is active
- **THEN** the soccer ball image moves from left to right following a parabolic arc (slightly down, then up, then down again) using a dedicated CSS animation

### Requirement: Picture panel shows main city image with cycling overlays
The picture prop SHALL display the main city.jpg as base image, with three overlay images that cycle sequentially: one overlay is visible for 2 seconds, then hidden, then the next becomes visible after a 5-second pause, repeating indefinitely.

#### Scenario: Base image is always visible
- **WHEN** the CoastContact slide is active
- **THEN** city.jpg is displayed as the full-width base image in the picture panel

#### Scenario: Overlays cycle one at a time
- **WHEN** the slide has been active for the initial delay
- **THEN** overlay 1 fades in, stays visible ~2s, fades out, waits ~5s, overlay 2 fades in, etc., cycling through all 3 overlays repeatedly

#### Scenario: Only one overlay visible at a time
- **WHEN** an overlay is in its visible phase
- **THEN** the other two overlays have opacity 0
