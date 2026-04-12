### Requirement: Desktop dock bar layout

On desktop viewports (md breakpoint and above), a dock-style navigation bar SHALL be rendered at the bottom of the viewport. The bar SHALL contain, from left to right: back arrow, next arrow, extra spacing (`mr-4`), then 5 slide buttons (door, forest, mountain, field, city). The dock SHALL be centered horizontally.

#### Scenario: Desktop dock is visible on md+ screens

- **WHEN** the viewport is at or above the md breakpoint
- **THEN** the dock bar is visible at the bottom of the viewport

#### Scenario: Dock layout order

- **WHEN** the desktop dock is rendered
- **THEN** the elements appear in order: [back] [next] — gap — [door] [forest] [mountain] [field] [city]

### Requirement: Desktop dock liquid glass backdrop

The desktop dock bar SHALL have a liquid glass visual effect using `backdrop-blur-xl` with `bg-base/25` semi-transparent background and `shadow-lg`. The container SHALL have `rounded-2xl` and `overflow-visible` to allow scaled items to extend beyond the dock bounds.

#### Scenario: Dock has blur backdrop

- **WHEN** the desktop dock is rendered
- **THEN** it has a blurred backdrop effect behind it with subtle semi-transparent tint

### Requirement: Desktop dock proximity scaling

The dock SHALL use JavaScript mouse-position-aware scaling rather than CSS-only `:hover`. Each item's scale SHALL be computed based on the cursor's horizontal distance from the item's center, using a cosine falloff function. Parameters:
- Base scale: 1.0
- Max scale: 1.8
- Influence radius: 80px

Items SHALL grow from their bottom edge using `transformOrigin: 'bottom center'` and a 150ms ease-out transition. No `translateY` SHALL be used (to avoid hover flicker from mouseout events when items move out of the container).

#### Scenario: Item scales based on cursor proximity

- **WHEN** the cursor is within 80px of a dock item's center
- **THEN** the item scales up proportionally using cosine falloff, up to 1.8x

#### Scenario: Items grow upward from bottom edge

- **WHEN** a dock item scales up
- **THEN** it grows upward from its bottom edge (no vertical translation)

#### Scenario: No hover flicker

- **WHEN** an item scales up beyond the dock bounds
- **THEN** the `overflow-visible` container and lack of translateY prevent mouseout flicker loops

#### Scenario: Scale resets on mouse leave

- **WHEN** the cursor leaves the dock area
- **THEN** all items return to base scale (1.0)

### Requirement: Hover darkening effect on all buttons

All navigation buttons (on both desktop and mobile) SHALL become slightly darker on hover using `hover:brightness-90`.

#### Scenario: Button darkens on hover

- **WHEN** the user hovers over any navigation button
- **THEN** the button appears slightly darker than its default state

### Requirement: Active slide indicator

The dock SHALL visually indicate which slide is currently active. The active slide button SHALL use `brightness-110 contrast-110` while inactive buttons use `brightness-95 contrast-95`. The effect SHALL be subtle.

#### Scenario: Current slide highlighted

- **WHEN** the active slide is 'info'
- **THEN** the mountain-button in the dock appears subtly brighter/higher contrast than the other slide buttons

### Requirement: Back and next button logic

The back button SHALL navigate to the previous slide in order. The next button SHALL navigate to the next slide in order. The slide order is: front, welcome, info, program, contact (exported as `SLIDE_ORDER`). The back button SHALL be disabled on the first slide. The next button SHALL be disabled on the last slide. Disabled buttons SHALL have `opacity-40` and `cursor-not-allowed`.

#### Scenario: Back from info goes to welcome

- **WHEN** the active slide is 'info' and the user clicks the back button
- **THEN** navigation is triggered to 'welcome'

#### Scenario: No next on last slide

- **WHEN** the active slide is 'contact'
- **THEN** the next button is disabled

### Requirement: Mobile back/next and map button

On mobile viewports (below md breakpoint), instead of the dock bar, the bottom-right corner SHALL display back/next arrow buttons and a map button grouped together. The arrows use the same back/next logic as the desktop dock. The map button uses the `mobile-map-button.png` asset.

#### Scenario: Mobile controls visible on small screens

- **WHEN** the viewport is below the md breakpoint
- **THEN** back/next arrows and the map button are visible in the bottom-right, and the dock bar is hidden

### Requirement: Mobile map overlay

Tapping the mobile map button SHALL open a full-screen overlay with liquid glass background (`backdrop-blur-2xl bg-base/10 backdrop-saturate-150`). The overlay SHALL contain: a close button (`close-button.png`) at top-right, back and next arrows as a full-width row, then the 5 slide buttons in a 2-column grid with the last button (city) centered (`col-span-2`). The overlay uses large image variants (`lg-*.png`). Navigating from the overlay SHALL close it before triggering the navigation.

#### Scenario: Overlay opens on tap

- **WHEN** the user taps the mobile map button
- **THEN** a full-screen overlay appears with liquid glass backdrop

#### Scenario: Overlay layout

- **WHEN** the mobile overlay is open
- **THEN** the layout shows: close button at top-right, [back] [next] row, [door] [forest] row, [mountain] [field] row, [city] centered

#### Scenario: Navigation from overlay closes it first

- **WHEN** the user taps a slide button in the mobile overlay
- **THEN** the overlay closes and then navigation is triggered to that slide

### Requirement: Navigation sticky positioning

The desktop dock bar and the mobile controls SHALL use `sticky bottom-0` positioning with `z-40` to remain visible at the bottom of the viewport regardless of scroll position. A `pointer-events-none` wrapper with `pointer-events-auto` children SHALL ensure only the interactive elements capture clicks.

#### Scenario: Nav visible while scrolling

- **WHEN** the user scrolls through a long slide
- **THEN** the navigation remains visible at the bottom

### Requirement: Navigation image assets

Navigation images SHALL be co-located with the SlideNav component at `src/components/SlideNav/images/`. Source images from `openspec/input/` SHALL be resized:
- Slide buttons (400x400): 80x80 for dock, 200x200 for mobile overlay (`lg-*.png`)
- Back/next arrows (562x344): ~120x73 for dock, ~240x146 for mobile overlay (`lg-*.png`)
- Mobile map button (250x212): ~60x51
- Close button (250x252): ~60x61

#### Scenario: Images are appropriately sized

- **WHEN** the navigation images are loaded in the browser
- **THEN** each image file is no larger than the specified target dimensions

### Requirement: Dock container uses role="toolbar"

The desktop dock container div SHALL have `role="toolbar"` to satisfy Biome's `noStaticElementInteractions` rule, since it has mouse event handlers for proximity scaling.

#### Scenario: Dock has toolbar role

- **WHEN** the dock container is rendered
- **THEN** it has `role="toolbar"` on the element with mouse event handlers
