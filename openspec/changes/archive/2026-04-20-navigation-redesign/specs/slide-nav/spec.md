## REMOVED Requirements

### Requirement: Desktop dock bar layout
**Reason**: Replaced by the new sticky top bar (`TopNavBar`). The bottom dock pattern is removed entirely.
**Migration**: Use `TopNavBar` component with horizontal text links at the top of the viewport.

### Requirement: Desktop dock liquid glass backdrop
**Reason**: Superseded by the top bar liquid-glass styling defined in the `top-nav-bar` spec.
**Migration**: Apply `backdrop-blur-xl bg-base/25 shadow-lg` to the `TopNavBar` container.

### Requirement: Desktop dock proximity scaling
**Reason**: The dock no longer exists. Proximity scaling is now applied to text links in `TopNavBar` with `transformOrigin: 'top center'` (downward genie effect) instead of `transformOrigin: 'bottom center'`.
**Migration**: Reuse the cosine-falloff algorithm in `TopNavBar` with inverted transform origin.

### Requirement: Back and next button logic
**Reason**: Back/next arrow buttons are removed. Navigation is exclusively through named text links (desktop) and the mobile overlay tiles.
**Migration**: Remove back/next buttons and their associated disabled/opacity logic. The `SLIDE_ORDER` export is retained for potential future use.

### Requirement: Mobile back/next and map button
**Reason**: Mobile back/next arrows are removed. The map button moves to the new top-right sticky bar defined in `mobile-top-nav` spec.
**Migration**: Replace bottom-right back/next + map cluster with the `MobileTopNav` component at top-right.

### Requirement: Navigation sticky positioning
**Reason**: The `sticky bottom-0` rule no longer applies. Navigation is now `sticky top-0` (desktop) and `fixed top-2 right-2` (mobile) as specified in `top-nav-bar` and `mobile-top-nav` specs.
**Migration**: Update wrapper positioning classes accordingly.

## MODIFIED Requirements

### Requirement: Hover darkening effect on all buttons
All navigation buttons in the mobile overlay SHALL become slightly darker on hover/focus using `hover:brightness-90`. The desktop top bar text links use the genie scale effect instead of brightness darkening.

#### Scenario: Mobile overlay button darkens on hover

- **WHEN** the user hovers over a tile button in the mobile overlay
- **THEN** the button appears slightly darker than its default state

### Requirement: Active slide indicator
The active slide SHALL be indicated differently per context:
- In `TopNavBar`: the active link uses `text-pine font-semibold`
- In `MobileMapOverlay`: the active tile renders the dedicated active-state image (`activeSrc`), same as before

#### Scenario: Active link is highlighted in top bar

- **WHEN** a slide is the active slide on desktop
- **THEN** its text link in the top bar uses the highlighted style (`text-pine font-semibold`)

#### Scenario: Active image used in mobile overlay

- **WHEN** the mobile map overlay is open and a slide is active
- **THEN** its tile renders the dedicated active image

### Requirement: Mobile map overlay
Tapping the mobile map button SHALL open a full-screen overlay with liquid glass background (`backdrop-blur-2xl bg-base/10 backdrop-saturate-150`). The overlay SHALL contain: a close button (`close-button.png`) at top-right, then the 5 slide tiles in a 2-column grid with the last button (city/contact) centered (`col-span-2`). Each tile SHALL render at ~160×160 px with its Swedish page-name label below it. The back/next row is removed. Navigating from the overlay SHALL close it before triggering navigation.

#### Scenario: Overlay opens on tap

- **WHEN** the user taps the mobile map button in the top-right bar
- **THEN** a full-screen overlay appears with liquid glass backdrop

#### Scenario: Overlay layout (no back/next row)

- **WHEN** the mobile overlay is open
- **THEN** the layout shows: close button at top-right, [Start] [Välkommen] row, [Lägerinfo] [Program] row, [Kontakt] centered — each with a label below the tile

#### Scenario: Navigation from overlay closes it first

- **WHEN** the user taps a slide tile in the mobile overlay
- **THEN** the overlay closes and then navigation is triggered to that slide

### Requirement: Navigation image assets
Tile images continue to be co-located with the `SlideNav` component at `src/components/SlideNav/images/`. Back/next arrow images (`back.png`, `next.png`, `lg-back.png`, `lg-next.png`) and the close button remain in place but back/next are no longer imported. `mobile-map-button.png` and `close-button.png` are retained.

#### Scenario: Tile images are loaded correctly

- **WHEN** the navigation renders on desktop or mobile
- **THEN** all slide tile images load from `src/components/SlideNav/images/` without 404 errors

### Requirement: Dock container uses role="toolbar"
The `TopNavBar` `<nav>` element has implicit `role="navigation"` and SHALL additionally carry `aria-label="Huvudnavigation"` to satisfy accessibility requirements. Mouse event handlers for proximity scaling SHALL be placed on the `<nav>` element.

#### Scenario: Nav has accessible label

- **WHEN** the top bar is rendered
- **THEN** it has `aria-label="Huvudnavigation"` on the nav element
