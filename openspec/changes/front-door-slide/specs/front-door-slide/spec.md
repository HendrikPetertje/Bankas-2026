## ADDED Requirements

### Requirement: Full-viewport layout

The FrontDoor component SHALL render a container with a minimum height of `100svh` and a background of `--color-edge-light`.

#### Scenario: Slide fills the viewport

- **WHEN** the FrontDoor component is rendered
- **THEN** the container has `min-height: 100svh` and displays with `background-color: --color-edge-light`

### Requirement: Centered heading

The component SHALL display the text "Baptistkyrkan Sundsvall & Bilda Presenterar" centered horizontally, using the display font (`font-display`). The text container MUST NOT exceed `768px` in width and MUST have horizontal padding so the text does not touch the viewport edges.

#### Scenario: Heading is visible and constrained

- **WHEN** the FrontDoor component is rendered
- **THEN** a heading with the text "Baptistkyrkan Sundsvall & Bilda Presenterar" is displayed in the display font, centered, with `max-width` no greater than `768px`

### Requirement: Door base image

The component SHALL render `the-door-cutout.png` below the heading. The image MUST scale responsively to fit the viewport width while maintaining its aspect ratio.

#### Scenario: Door image renders below heading

- **WHEN** the component is rendered
- **THEN** `the-door-cutout.png` is visible below the heading text, scaled to the container width

### Requirement: Overlay animation cycle

The component SHALL cycle through 4 animation frames on a 1-second interval: frame 0 (no overlay visible), frame 1 (`the-door-cutout-overlay-1.png`), frame 2 (`the-door-cutout-overlay-2.png`), frame 3 (`the-door-cutout-overlay-3.png`). Each overlay MUST transition its opacity with an ease-in timing function. All overlay images MUST have the same dimensions and position as the base image.

#### Scenario: Overlays cycle continuously

- **WHEN** 4 seconds have elapsed since mount
- **THEN** all 4 frames (including the no-overlay frame) have each been displayed once, and the cycle repeats

#### Scenario: Transitions are smooth

- **WHEN** an overlay becomes visible or hidden
- **THEN** its opacity changes with a CSS ease-in transition (not an instant toggle)

### Requirement: Floating detail images

The component SHALL render floating detail images (`small-bird.png`, `small-cloud-1.png`, `small-cloud-2.png`, `small-flock-of-birds.png`) in the space above the door image. Each detail MUST drift from left to right continuously using CSS animation and repeat infinitely. Different details MUST have different animation durations and delays.

#### Scenario: Details float across the screen

- **WHEN** the component is rendered
- **THEN** the floating detail images animate from left to right and loop continuously

### Requirement: Door click target

On viewports wider than the `md` breakpoint, a clickable region SHALL cover a rectangle from 44% to 56% of the image width and 52% to 75% of the image height, positioned over the door. On viewports at or below the `md` breakpoint, the entire image MUST be clickable.

#### Scenario: Desktop click target is the door area

- **WHEN** the viewport is wider than `md` and the user clicks inside the 44%-56% / 52%-75% rectangle of the image
- **THEN** the door transition begins

#### Scenario: Mobile click target is the full image

- **WHEN** the viewport is at or below `md` and the user clicks anywhere on the image
- **THEN** the door transition begins

### Requirement: Door transition animation

When the door is clicked, the component SHALL display a full-screen overlay that transitions in two phases:
1. Phase 1: the overlay transitions from `rgba(252,226,80,0)` to `rgba(252,226,80,1)` over 1 second.
2. Phase 2: the overlay transitions from `#fce250` to `--color-overlay` over 1 second.
After both phases complete, the component SHALL call the navigation callback to switch to `'welcome'`.

#### Scenario: Two-phase transition plays

- **WHEN** the user clicks the door
- **THEN** a full-screen overlay fades from transparent gold to solid gold in 1 second, then from solid gold to `--color-overlay` in 1 second, then navigation to `'welcome'` occurs

#### Scenario: Overlay blocks interaction

- **WHEN** the transition is in progress
- **THEN** the overlay covers the entire viewport and the user cannot interact with elements beneath it

### Requirement: Delayed tooltip

A tooltip with the text "Tryck på dörren för att fortsätta" SHALL be rendered below the image. The tooltip MUST have `opacity: 0` on mount and transition to visible `opacity: 1` after 3 seconds.

#### Scenario: Tooltip is hidden initially

- **WHEN** the component first mounts
- **THEN** the tooltip is present in the DOM but has `opacity: 0`

#### Scenario: Tooltip appears after 3 seconds

- **WHEN** 3 seconds have elapsed since mount
- **THEN** the tooltip transitions to `opacity: 1`
