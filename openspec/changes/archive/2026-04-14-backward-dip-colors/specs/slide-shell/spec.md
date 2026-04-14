## MODIFIED Requirements

### Requirement: Dip-from overlay on mount

The `Slide` component SHALL accept a `dipFrom` prop (CSS color string). The entry overlay color SHALL be direction-aware:

- **Forward navigation (or initial mount):** The entry overlay uses the `dipFrom` color.
- **Backward navigation:** The entry overlay uses the `dipTo` color.

On initial render, a full-screen overlay (`fixed inset-0 z-50 pointer-events-none`) with the effective entry color SHALL be visible and SHALL fade to transparent over 2 seconds.

The fade SHALL use a **double-rAF** technique: two nested `requestAnimationFrame` calls ensure the browser paints the opaque frame before transitioning to transparent. A single rAF is insufficient because React can batch the mount and state update into the same frame, causing the overlay to appear already transparent.

#### Scenario: Slide mounts with dipFrom color (forward)

- **WHEN** a Slide mounts after a forward navigation with `dipFrom="#575279"`
- **THEN** a full-screen overlay starts at `#575279` and transitions to transparent over 2 seconds

#### Scenario: Slide mounts with dipTo color (backward)

- **WHEN** a Slide mounts after a backward navigation with `dipTo="#575279"`
- **THEN** a full-screen overlay starts at `#575279` and transitions to transparent over 2 seconds

#### Scenario: No dipFrom means no mount overlay

- **WHEN** a Slide mounts without a `dipFrom` prop
- **THEN** no mount overlay is displayed

### Requirement: Dip-to overlay with explicit activation

The `Slide` component SHALL accept a `dipTo` prop (CSS color string) and a `dipToActive` boolean prop. The exit overlay color SHALL be direction-aware:

- **Forward navigation:** The exit overlay uses the `dipTo` color.
- **Backward navigation:** The exit overlay uses the `dipFrom` color.

The overlay SHALL only become opaque when `dipToActive` is `true`. The `dipToActive` prop SHALL be managed exclusively by App.tsx -- set to `true` only on the OLD (current) slide before the swap, and set back to `false` before mounting the new slide.

This explicit prop prevents a bug where the new slide also sees `transitioning=true` on mount, which would cause its exit overlay to flash opaque and then snap to transparent.

#### Scenario: Forward navigate triggers dipTo overlay

- **WHEN** App.tsx sets `dipToActive=true` on the current slide during a forward navigation
- **THEN** the exit overlay transitions from transparent to the `dipTo` color over 2 seconds

#### Scenario: Backward navigate triggers dipFrom overlay as exit

- **WHEN** App.tsx sets `dipToActive=true` on the current slide during a backward navigation
- **THEN** the exit overlay transitions from transparent to the `dipFrom` color over 2 seconds

#### Scenario: New slide mounts without dipTo flash

- **WHEN** a new slide mounts after a swap
- **THEN** its exit overlay is not active (dipToActive is false), so no flash occurs
