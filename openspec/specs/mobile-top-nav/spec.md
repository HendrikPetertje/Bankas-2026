## ADDED Requirements

### Requirement: Mobile top-right sticky nav bar

On mobile viewports (below md breakpoint), a compact sticky bar SHALL be rendered at the top-right of the viewport (`fixed top-2 right-2 z-50`). The bar SHALL have liquid-glass styling (`backdrop-blur-xl bg-base/25 rounded-2xl shadow-lg`) and contain only the map icon. The bar height SHALL be approximately 36 px. The desktop top bar (`TopNavBar`) SHALL be hidden on mobile.

#### Scenario: Mobile nav visible on small screens

- **WHEN** the viewport is below the md breakpoint
- **THEN** the compact top-right bar with map icon is visible and the desktop text bar is hidden

#### Scenario: Mobile nav is sticky at top-right

- **WHEN** the user scrolls through a long slide on mobile
- **THEN** the top-right bar remains fixed in the top-right corner

### Requirement: Map icon minimal zoom on tap

The map icon inside the mobile top-right bar SHALL apply a minimal scale animation on tap/press (scale to 1.1× and back). The animation SHALL be 120 ms ease-out. The zoom SHALL not exceed 1.1× to avoid triggering browser drag/scroll gesture detection.

#### Scenario: Map icon zooms minimally on tap

- **WHEN** the user taps the map icon
- **THEN** the icon briefly scales to 1.1× then returns to 1.0×

#### Scenario: Tap does not trigger drag

- **WHEN** the user taps the map icon without moving the finger
- **THEN** no drag or scroll event is fired

### Requirement: Mobile overlay tiles with page-name labels

The `MobileMapOverlay` component SHALL render each slide tile slightly smaller than the current `lg-*` dimensions (target: ~160×160 px vs current 200×200 px for slide buttons). Below each tile, a text label SHALL appear with the Swedish page name: **Start**, **Välkommen**, **Lägerinfo**, **Program**, **Kontakt**. The label SHALL use `text-sm font-body text-text text-center`.

#### Scenario: Overlay tiles are smaller than before

- **WHEN** the mobile overlay is open
- **THEN** slide button tiles render at ~160×160 px (not the current 200×200 px)

#### Scenario: Page-name labels appear below tiles

- **WHEN** the mobile overlay is open
- **THEN** each tile has its Swedish page name displayed below it

#### Scenario: Labels use correct Swedish names

- **WHEN** the mobile overlay is open
- **THEN** the labels are: Start (front), Välkommen (welcome), Lägerinfo (info), Program (program), Kontakt (contact)
