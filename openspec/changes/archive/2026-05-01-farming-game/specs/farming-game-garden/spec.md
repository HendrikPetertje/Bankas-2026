## ADDED Requirements

### Requirement: Plot number to grid position mapping
The system SHALL map API plot numbers (1-9) to grid positions (row-col) left-to-right, top-to-bottom: plot 1 = 1-1, plot 2 = 1-2, plot 3 = 1-3, plot 4 = 2-1, plot 5 = 2-2, plot 6 = 2-3, plot 7 = 3-1, plot 8 = 3-2, plot 9 = 3-3.

#### Scenario: Plot number mapped to overlay position
- **WHEN** rendering plot number N from the API
- **THEN** the system SHALL use row = ceil(N/3), col = ((N-1) % 3) + 1 to determine the grid tile and crop offset position

### Requirement: Garden grid renders 3x3 plots as layered PNGs
The system SHALL render the garden as a responsive container matching `base.png` aspect ratio, with plot state overlays and crop overlays absolutely positioned using fixed offset percentages.

#### Scenario: Base grid with plot states
- **WHEN** the garden loads
- **THEN** `base.png` SHALL render as the background, and each plot position (1-1 through 3-3) SHALL show its state overlay (barren/clean, dry/wet variant)

#### Scenario: Dry vs wet plot determination
- **WHEN** a plot's `last_watered_at` is more than 1 hour ago (or null)
- **THEN** the dry variant of the tile overlay SHALL be shown
- **WHEN** `last_watered_at` is within the last hour
- **THEN** the normal (wet) variant SHALL be shown

### Requirement: Crop growth stage rendering
The system SHALL render crop overlays at the correct growth stage based on elapsed time since `planted_at` and the plant's `growing_time_s`.

#### Scenario: Just seeded (0-5 minutes)
- **WHEN** a plot is SEEDED and less than 5 minutes have passed
- **THEN** the `seed-overlay.png` SHALL render at that plot's offset position

#### Scenario: First sprout (5 min to 25% growth)
- **WHEN** elapsed time is between 5 minutes and 25% of `growing_time_s`
- **THEN** `sprout-1-overlay.png` SHALL render

#### Scenario: Second sprout (25% to 50% growth)
- **WHEN** elapsed time is between 25% and 50% of `growing_time_s`
- **THEN** `sprout-2-overlay.png` SHALL render

#### Scenario: Young plant (50% to 100% growth)
- **WHEN** elapsed time is between 50% and 100% of `growing_time_s`
- **THEN** the plant-kind-specific young overlay (e.g. `young-tomato-overlay.png`) SHALL render

#### Scenario: Fully grown (100%+)
- **WHEN** elapsed time exceeds `growing_time_s`
- **THEN** the plant-kind-specific finished overlay (e.g. `finished-tomato-overlay.png`) SHALL render

### Requirement: Weed overlay rendering
The system SHALL render weed overlays based on time since `last_weeds_removed_at`.

#### Scenario: Some weeds (45 min to 2 hours since removal)
- **WHEN** more than 45 minutes have passed since `last_weeds_removed_at`
- **THEN** `some-weeds-overlay.png` SHALL render behind the plant (lower z-index)

#### Scenario: Weed overgrowth (2+ hours since removal)
- **WHEN** more than 2 hours have passed since `last_weeds_removed_at`
- **THEN** `weed-overgrowth-overlay.png` SHALL render instead of `some-weeds-overlay.png`

### Requirement: Damaged plant rendering
The system SHALL show visual damage when star ratings drop to 1.

#### Scenario: Water stars at 1 during growth
- **WHEN** a plot has `water_stars` of 1 and the plant is not yet harvestable
- **THEN** the plant overlay SHALL be rendered with a brown CSS color filter

#### Scenario: Water stars at 1 at harvest time
- **WHEN** a plot has `water_stars` of 1 and the plant IS harvestable
- **THEN** `dried-out-plant-overlay.png` SHALL render instead of the finished plant overlay

#### Scenario: Weed stars at 1
- **WHEN** a plot has `weed_stars` of 1
- **THEN** the plant overlay SHALL be rendered with a brown CSS color filter

### Requirement: Crop overlay positioning
Each crop overlay (285x248px) SHALL be positioned at the correct pixel offset relative to the grid container, scaled proportionally with the container width.

#### Scenario: Offset map applied
- **WHEN** rendering a crop at plot row-col
- **THEN** the overlay SHALL be positioned at the specified offset scaled relative to the base image dimensions:
  - 1-1: 184x73, 1-2: 465x73, 1-3: 741x73
  - 2-1: 176x403, 2-2: 468x403, 2-3: 756x403
  - 3-1: 159x657, 3-2: 464x657, 3-3: 765x657
