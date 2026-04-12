## ADDED Requirements

### Requirement: Desktop dock bar layout

On desktop viewports (md breakpoint and above), a dock-style navigation bar SHALL be rendered at the bottom of the viewport. The bar SHALL contain, from left to right: back arrow, next arrow, extra spacing, then 5 slide buttons (door, forest, mountain, field, city). All buttons SHALL be centered so the last button appears centered in the available space.

#### Scenario: Desktop dock is visible on md+ screens

- **WHEN** the viewport is at or above the md breakpoint
- **THEN** the dock bar is visible at the bottom of the viewport

#### Scenario: Dock layout order

- **WHEN** the desktop dock is rendered
- **THEN** the elements appear in order: [back] [next] — gap — [door] [forest] [mountain] [field] [city]

### Requirement: Desktop dock liquid glass backdrop

The desktop dock bar SHALL have a liquid glass visual effect using `backdrop-filter: blur()` with a subtle semi-transparent background tint to ensure icons are visible over any slide content.

#### Scenario: Dock has blur backdrop

- **WHEN** the desktop dock is rendered
- **THEN** it has a blurred backdrop effect behind it

### Requirement: Desktop dock hover animation

In the non-hovered state, the dock bar SHALL sit flush with the bottom of the page. When a dock item is hovered, it SHALL grow slightly in size and shift upward, rendering partially above the dock bar area.

#### Scenario: Hover grows and lifts item

- **WHEN** the user hovers over a dock item on desktop
- **THEN** the item scales up slightly and translates upward

#### Scenario: Non-hovered items stay in place

- **WHEN** no dock items are hovered
- **THEN** all items remain at their default size and position

### Requirement: Hover darkening effect on all buttons

All navigation buttons (on both desktop and mobile) SHALL become slightly darker on hover to indicate interactivity.

#### Scenario: Button darkens on hover

- **WHEN** the user hovers over any navigation button
- **THEN** the button appears slightly darker than its default state

### Requirement: Active slide indicator

The dock SHALL visually indicate which slide is currently active. The active slide button SHALL appear slightly brighter and higher contrast than inactive buttons, achieved through a subtle CSS filter (e.g., brightness/contrast). The effect SHALL be subtle — not a bold outline or color change.

#### Scenario: Current slide highlighted

- **WHEN** the active slide is 'info'
- **THEN** the mountain-button in the dock appears subtly brighter/higher contrast than the other slide buttons

### Requirement: Back and next button logic

The back button SHALL navigate to the previous slide in order. The next button SHALL navigate to the next slide in order. The slide order is: front, welcome, info, program, contact. The back button SHALL be hidden or disabled on the first navigable slide. The next button SHALL be hidden or disabled on the last slide.

#### Scenario: Back from info goes to welcome

- **WHEN** the active slide is 'info' and the user clicks the back button
- **THEN** navigation is triggered to 'welcome'

#### Scenario: Next from welcome goes to info

- **WHEN** the active slide is 'welcome' and the user clicks the next button
- **THEN** navigation is triggered to 'info'

#### Scenario: No next on last slide

- **WHEN** the active slide is 'contact'
- **THEN** the next button is hidden or disabled

### Requirement: Mobile map button

On mobile viewports (below md breakpoint), instead of the dock bar, a sticky map button SHALL be displayed at the bottom of the viewport. The button uses the `mobile-map-button.png` asset.

#### Scenario: Map button visible on small screens

- **WHEN** the viewport is below the md breakpoint
- **THEN** the map button is visible and the dock bar is hidden

### Requirement: Mobile map overlay

Tapping the mobile map button SHALL open a full-screen overlay with a liquid glass background (backdrop-filter blur). The overlay SHALL contain: back and next arrows on the first row, then the 5 slide buttons arranged in a 2-column centered grid, with the last button (city) centered. A close button (`close-button.png`) SHALL appear at the top of the overlay.

#### Scenario: Overlay opens on tap

- **WHEN** the user taps the mobile map button
- **THEN** a full-screen overlay appears with liquid glass backdrop

#### Scenario: Overlay layout

- **WHEN** the mobile overlay is open
- **THEN** the layout shows: close button at top, [back] [next] row, [door] [forest] row, [mountain] [field] row, [city] centered

#### Scenario: Overlay close button

- **WHEN** the user taps the close button on the mobile overlay
- **THEN** the overlay closes and returns to the slide view

#### Scenario: Navigation from overlay

- **WHEN** the user taps a slide button in the mobile overlay
- **THEN** navigation is triggered to that slide and the overlay closes

### Requirement: Navigation sticky positioning

The desktop dock bar and the mobile map button SHALL remain visible at the bottom of the viewport regardless of scroll position. They SHALL use sticky or fixed positioning.

#### Scenario: Nav visible while scrolling

- **WHEN** the user scrolls through a long slide
- **THEN** the navigation (dock or map button) remains visible at the bottom

### Requirement: Navigation image assets

All navigation images SHALL be resized from their source sizes for web use and co-located with the SlideNav component. Source images from `openspec/input/` SHALL be copied and resized:
- Slide buttons (400x400): resize to 80x80
- Back/next arrows (562x344): resize to ~120x73
- Mobile map button (250x212): resize to ~60x51
- Close button (250x252): resize to ~60x61

#### Scenario: Images are appropriately sized

- **WHEN** the navigation images are loaded in the browser
- **THEN** each image file is no larger than the specified target dimensions
