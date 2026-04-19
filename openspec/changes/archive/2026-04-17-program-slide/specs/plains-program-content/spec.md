## ADDED Requirements

### Requirement: Slide heading
The content area SHALL render a heading with the text "Dagsprogram" using the display font, consistent with the MountaintopInfo heading style.

#### Scenario: Heading is visible
- **WHEN** the PlainsProgram slide is active
- **THEN** the heading "Dagsprogram" is displayed at the top of the content area in the display font

### Requirement: Daily schedule rendered as markdown
The content area SHALL render the daily schedule text from `slideContent.ts` using `react-markdown` with the same component overrides as MountaintopInfo (styled headings, paragraphs, blockquotes, links).

#### Scenario: Markdown content is displayed
- **WHEN** the slide is active
- **THEN** the daily schedule text is rendered below the heading with proper markdown formatting

### Requirement: Big clouds drift left to right
A big clouds image (`big-clouds.png`) SHALL drift continuously from the left edge to the right edge of the screen, positioned near the top of the content area behind the text.

#### Scenario: Big clouds animation
- **WHEN** the slide is active
- **THEN** the big clouds image animates using the `drift` keyframe, positioned near the top of the content area, looping infinitely

### Requirement: Small clouds drift left to right
A small clouds image (`clouds.png`) SHALL drift continuously from the left edge to the right edge of the screen, positioned below the big clouds and behind the text.

#### Scenario: Small clouds animation
- **WHEN** the slide is active
- **THEN** the clouds image animates using the `drift` keyframe, positioned below the big clouds layer, looping infinitely

### Requirement: Flock of birds drifts right to left
A flock of birds image (`flock-of-birds.png`) SHALL drift continuously from right to left, positioned below the small clouds and behind the text.

#### Scenario: Birds animation
- **WHEN** the slide is active
- **THEN** the flock of birds image animates using the `drift-reverse` keyframe, looping infinitely, positioned below the small clouds layer

### Requirement: Three angled camp photos
Three camp photographs SHALL be displayed below the markdown content in a horizontal row, each rotated at a slight angle, matching the MountaintopInfo photo strip pattern. Photos SHALL be resized to max 600px on the longest edge before being committed to the repository.

#### Scenario: Photos are visible below text
- **WHEN** the slide is active
- **THEN** three camp photos are displayed in a centered horizontal row with slight rotation transforms, rounded corners, and shadows, below the daily schedule text

#### Scenario: Photos are resized for web
- **WHEN** the photos are included in the build
- **THEN** each photo's longest edge is no larger than 600px to keep file sizes reasonable while remaining sharp on retina displays at their display size
