## ADDED Requirements

### Requirement: Slide heading
The content area SHALL render a heading with the text "For dig som ska resa in i riket" using the display font at a size consistent with the ForestWelcome heading.

#### Scenario: Heading is visible
- **WHEN** the mountaintop info slide is active
- **THEN** the heading "For dig som ska resa in i riket" is displayed at the top of the content area in the display font

### Requirement: Camp info text rendered as markdown
The content area SHALL render the camp information text from `slideContent.ts` using `react-markdown` with the same component overrides as ForestWelcome (styled headings, paragraphs, blockquotes, links).

#### Scenario: Markdown content is displayed
- **WHEN** the slide is active
- **THEN** the camp information (dates, pricing, packing, location, schedule) is rendered below the heading with proper markdown formatting (bold labels, italic payment note, line breaks)

### Requirement: Dragon drifts left to right
A dragon image SHALL drift continuously from the left edge to the right edge of the screen, positioned above and behind the text content.

#### Scenario: Dragon animation
- **WHEN** the slide is active
- **THEN** the dragon image animates using the `drift` keyframe, positioned near the top of the content area, looping infinitely

### Requirement: Fluffy clouds drift right to left
A fluffy clouds image SHALL drift continuously from right to left, positioned below the dragon and behind the text.

#### Scenario: Clouds animation
- **WHEN** the slide is active
- **THEN** the fluffy clouds image animates using the `drift-reverse` keyframe, looping infinitely, positioned below the dragon layer

### Requirement: Flock of birds drifts right to left
A flock of birds image SHALL drift continuously from right to left, positioned below the clouds and behind the text.

#### Scenario: Birds animation
- **WHEN** the slide is active
- **THEN** the flock of birds image animates using the `drift-reverse` keyframe, looping infinitely, positioned below the clouds layer

### Requirement: Three angled camp photos
Three camp photographs SHALL be displayed below the text content in a horizontal row, each rotated at a slight angle, matching the ForestWelcome photo strip pattern.

#### Scenario: Photos are visible below text
- **WHEN** the slide is active
- **THEN** three camp photos are displayed in a centered horizontal row with slight rotation transforms, rounded corners, and shadows

#### Scenario: Photos are resized for web
- **WHEN** the photos are included in the build
- **THEN** each photo's longest edge is no larger than 600px to keep file sizes reasonable while remaining sharp on retina displays at their display size
