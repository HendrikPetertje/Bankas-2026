## ADDED Requirements

### Requirement: Tool bar with four action buttons
The system SHALL render a row of tool buttons below the garden grid: seed packets, watering can, cleaning fork, and harvesting shears.

#### Scenario: Tool buttons displayed
- **WHEN** the garden frame is active
- **THEN** four tool buttons SHALL be shown using the images from `button-images/`

#### Scenario: Active tool highlighted
- **WHEN** a tool is selected
- **THEN** its button background SHALL gain a subtle blue tint (Rose Pine foam/iris) to indicate it is active
- **THEN** the cursor SHALL change to that tool's image for the entire modal area (not just over plots)

### Requirement: Seed tool interaction
Selecting the seed tool SHALL change the cursor and allow planting on eligible plots.

#### Scenario: Seed tool activated
- **WHEN** the user clicks the seed packets button
- **THEN** the cursor SHALL change to the seed packet image across the entire modal

#### Scenario: Seeding an eligible plot
- **WHEN** the seed tool is active and the user clicks a CLEANED plot watered less than 30 minutes ago
- **THEN** a seed selection modal SHALL open showing all available plant types with their yield (at 5 stars) and grow time

#### Scenario: Seeding an ineligible plot
- **WHEN** the seed tool is active and the user clicks a plot that is not eligible for seeding
- **THEN** the cursor SHALL show the browser's not-allowed cursor over that plot

#### Scenario: Seed selected from picker
- **WHEN** the user picks a seed type from the selection modal
- **THEN** a seed request SHALL be sent to the backend for that plot and plant kind

### Requirement: Water tool interaction
Selecting the watering can SHALL allow watering any plot.

#### Scenario: Water tool activated
- **WHEN** the user clicks the watering can button
- **THEN** the cursor SHALL change to a watering can image

#### Scenario: Watering a plot
- **WHEN** the water tool is active and the user clicks any plot
- **THEN** a water request SHALL be sent to the backend for that plot

### Requirement: Clean tool interaction
Selecting the cleaning fork SHALL allow removing weeds.

#### Scenario: Clean tool activated
- **WHEN** the user clicks the cleaning fork button
- **THEN** the cursor SHALL change to the fork image

#### Scenario: Cleaning a plot
- **WHEN** the clean tool is active and the user clicks a plot
- **THEN** a clean request SHALL be sent to the backend for that plot

### Requirement: Harvest tool interaction
Selecting the harvesting shears SHALL allow harvesting fully grown crops.

#### Scenario: Harvest tool activated
- **WHEN** the user clicks the harvesting shears button
- **THEN** the cursor SHALL change to the shears image

#### Scenario: Harvesting a ready crop
- **WHEN** the harvest tool is active and the user clicks a plot whose plant has reached full grow time
- **THEN** a harvest request SHALL be sent to the backend

#### Scenario: Harvest victory overlay
- **WHEN** a harvest succeeds
- **THEN** a victory overlay SHALL appear showing the vegetable image from `score-fruits/` (e.g. `tomato.png`), the KG produced, and a short Swedish message that varies based on the star rating (min of water_stars, weed_stars)
- **THEN** the user SHALL confirm/dismiss the overlay to continue playing
- **THEN** the garden state SHALL update with the new `produced_g` value from the harvest response
