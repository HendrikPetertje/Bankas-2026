## ADDED Requirements

### Requirement: Top bar layout and sticky positioning

The `TopNavBar` component SHALL render as a sticky bar at the very top of the viewport (`sticky top-0 z-50`). It SHALL span the full viewport width and be approximately 36 px tall in its closed (non-hovered) state. It SHALL contain five horizontal text links: **Start**, **Välkommen**, **Lägerinfo**, **Program**, **Kontakt** — displayed left-to-right, centered in the bar. The bar SHALL use liquid-glass styling (`backdrop-blur-xl bg-base/25 shadow-lg`).

#### Scenario: Top bar is visible at the top

- **WHEN** the page loads on a desktop viewport (md breakpoint and above)
- **THEN** the navigation bar is rendered at the very top of the viewport, touching the top edge

#### Scenario: Top bar stays visible while scrolling

- **WHEN** the user scrolls down through a long slide
- **THEN** the top bar remains fixed at the top of the viewport

#### Scenario: Five links rendered in order

- **WHEN** the top bar is rendered
- **THEN** links appear in order: Start → Välkommen → Lägerinfo → Program → Kontakt

### Requirement: Top bar text link active state

The link corresponding to the currently active slide SHALL be visually distinguished from inactive links. The active link SHALL use `text-pine font-semibold` (or equivalent highlighted token) while inactive links use `text-text`.

#### Scenario: Active slide link is highlighted

- **WHEN** the active slide is 'info'
- **THEN** the "Lägerinfo" link appears highlighted and other links appear in default style

### Requirement: Top bar genie hover effect on links

Each text link SHALL use JavaScript mouse-position-aware scaling with a cosine falloff — reusing the same algorithm as the existing dock — but with `transformOrigin: 'top center'` so links push downward and zoom. Parameters:
- Base scale: 1.0
- Max scale: 1.6
- Influence radius: 80 px
- Transition: 150 ms ease-out

#### Scenario: Link scales down on cursor proximity

- **WHEN** the cursor is within 80 px of a link's horizontal center
- **THEN** the link scales up (pushes downward) proportionally, up to 1.6×

#### Scenario: Links return to base scale on mouse leave

- **WHEN** the cursor leaves the top bar area
- **THEN** all links return to scale 1.0

### Requirement: Top bar tile reveal on hover

When the top bar is hovered, image tiles SHALL appear below each text link by scaling from `scale(0)` to `scale(1)` with an opacity fade-in (0 → 1). The bar wrapper SHALL expand downward using a `max-height` CSS transition to cover the full height of the zoomed link text plus 50 % of the tile height. The tile images are the same slide button images used in the dock (one per slide, using active variant if that slide is active). The transition SHALL be smooth with no layout reflow.

#### Scenario: Tiles appear on bar hover

- **WHEN** the user moves the cursor onto the top bar
- **THEN** tiles scale in below each link simultaneously with the bar expanding downward

#### Scenario: Tiles disappear on mouse leave

- **WHEN** the cursor leaves the top bar
- **THEN** tiles scale back to 0, fade out, and the bar contracts back to its closed height

#### Scenario: Active slide uses active tile image

- **WHEN** the tile reveal is visible and the active slide is 'welcome'
- **THEN** the tile for "Välkommen" renders the active-state image

#### Scenario: No layout reflow during expansion

- **WHEN** the bar expands downward to reveal tiles
- **THEN** slide content below the bar is not pushed down (the expanded portion overlays content)

### Requirement: App layout padding for top bar

`App.tsx` SHALL add `pt-9` (or equivalent Tailwind class matching the closed bar height) to the main content wrapper so slide content does not start hidden beneath the top bar.

#### Scenario: Content starts below the top bar

- **WHEN** the first slide is rendered
- **THEN** the slide content is fully visible below the top bar, not obscured by it
