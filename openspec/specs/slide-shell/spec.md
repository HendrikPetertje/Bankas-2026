### Requirement: Slide component accepts content and picture slots

The `Slide` component SHALL accept a `children` prop (ReactNode) for page content and a `picture` prop (ReactNode) for the illustration area. Content SHALL render above the picture in the vertical flow.

#### Scenario: Content renders above picture

- **WHEN** a Slide is rendered with both `children` and `picture` props
- **THEN** the children content appears above the picture content in the DOM order

### Requirement: Content and picture layout behavior

The children content slot SHALL use `flex-1` so it expands to fill all available vertical space. The picture slot SHALL use `flex-shrink-0` so it maintains its intrinsic height and anchors at the bottom. This ensures content pushes the picture down, and short content still results in the picture being at the bottom of the viewport.

#### Scenario: Short content pushes picture to bottom

- **WHEN** content is shorter than the viewport minus the picture height
- **THEN** the content area expands and the picture stays at the bottom

#### Scenario: Picture maintains intrinsic size

- **WHEN** the slide renders
- **THEN** the picture area does not shrink below its natural content height

### Requirement: Slide is a vertical scroll container

The `Slide` component SHALL render as a vertically scrollable container with `min-h-[100svh]` and `overflow-y-auto`. The container uses flex column layout. The background color SHALL be `bg-edge-light`.

#### Scenario: Long content scrolls

- **WHEN** slide content exceeds the viewport height
- **THEN** the user can scroll vertically to see all content

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

The overlay SHALL only become opaque when `dipToActive` is `true`. The `dipToActive` prop SHALL be managed exclusively by App.tsx — set to `true` only on the OLD (current) slide before the swap, and set back to `false` before mounting the new slide.

This explicit prop prevents a bug where the new slide also sees `transitioning=true` on mount, which would cause its dipTo overlay to flash opaque and then snap to transparent.

#### Scenario: Forward navigate triggers dipTo overlay

- **WHEN** App.tsx sets `dipToActive=true` on the current slide during a forward navigation
- **THEN** the exit overlay transitions from transparent to the `dipTo` color over 2 seconds

#### Scenario: Backward navigate triggers dipFrom overlay as exit

- **WHEN** App.tsx sets `dipToActive=true` on the current slide during a backward navigation
- **THEN** the exit overlay transitions from transparent to the `dipFrom` color over 2 seconds

#### Scenario: New slide mounts without dipTo flash

- **WHEN** a new slide mounts after a swap
- **THEN** its exit overlay is not active (dipToActive is false), so no flash occurs

### Requirement: Picture zoom on transition

When navigating forward (to a higher slide index), the `picture` area SHALL scale up to 1.8x during the dip-to transition. When navigating backward (to a lower slide index), the `picture` area SHALL scale down to 0.6x. The zoom uses `transformOrigin: 'center center'` and a 2s ease-in-out transition. Zoom is driven by the `transitioning` and `transitionDirection` props.

#### Scenario: Forward navigation zooms picture in

- **WHEN** the user navigates forward from the current slide
- **THEN** the picture area scales up to 1.8x during the 2-second dip-to transition

#### Scenario: Backward navigation zooms picture out

- **WHEN** the user navigates backward from the current slide
- **THEN** the picture area scales down to 0.6x during the 2-second dip-to transition

### Requirement: Navigation blocked during transitions

Navigation actions SHALL be blocked while a transition is in progress. The total transition duration is 4 seconds (2s dip-to on current slide + 2s dip-from on new slide).

#### Scenario: Rapid clicks ignored

- **WHEN** the user clicks a navigation button while a transition is already in progress
- **THEN** the click is ignored and no additional transition starts

### Requirement: Content slot sky gradient background

The content slot `<div>` SHALL render with a `linear-gradient(170deg, #add5f0 0%, #add5f000 60%)` background applied via an inline `style` prop. The gradient transitions from sky blue (`#add5f0`) at the top to fully transparent at ~60% height, at a `170deg` angle (slightly off-vertical). The transparent stop SHALL use `#add5f000` (same hue at alpha 0) rather than CSS `transparent` to avoid grey interpolation artefacts. The underlying `bg-edge-light` background remains visible beneath the gradient.

#### Scenario: Gradient visible at top of content area

- **WHEN** any slide renders using the `Slide` shell
- **THEN** the top of the content area shows a sky-blue tint that fades smoothly to transparent by ~60% of the content height

#### Scenario: Gradient does not affect layout

- **WHEN** the gradient background is applied
- **THEN** no layout shifts occur — content position, scroll behaviour, and picture slot position are unchanged

#### Scenario: Gradient angle is not perfectly vertical

- **WHEN** the gradient is rendered
- **THEN** the gradient direction is `170deg`, not `180deg`

#### Scenario: Transparent stop uses same hue

- **WHEN** the gradient is rendered
- **THEN** the transparent stop uses `#add5f000` rather than CSS `transparent`, avoiding grey interpolation artefacts

### Requirement: SlideNav rendered inside Slide

The `Slide` component SHALL render a `SlideNav` component, passing it `activeSlide`, `onNavigate`, and `transitioning` props. The nav is rendered after the picture slot in the DOM, using sticky positioning to stay at the bottom.

#### Scenario: Navigation appears in every slide

- **WHEN** any slide renders using the Slide shell
- **THEN** the SlideNav component is present and functional
