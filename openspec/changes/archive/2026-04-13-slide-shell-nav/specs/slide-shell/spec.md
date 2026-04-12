## ADDED Requirements

### Requirement: Slide component accepts content and picture slots

The `Slide` component SHALL accept a `children` prop (ReactNode) for page content and a `picture` prop (ReactNode) for the illustration area. Content SHALL render above the picture in the vertical flow.

#### Scenario: Content renders above picture

- **WHEN** a Slide is rendered with both `children` and `picture` props
- **THEN** the children content appears above the picture content in the DOM order

### Requirement: Slide is a vertical scroll container

The `Slide` component SHALL render as a vertically scrollable container. The container SHALL allow content to exceed the viewport height and scroll naturally.

#### Scenario: Long content scrolls

- **WHEN** slide content exceeds the viewport height
- **THEN** the user can scroll vertically to see all content

### Requirement: Slide bottom padding for navigation

The `Slide` component SHALL include padding at the bottom of its scroll content so that the sticky navigation bar does not obscure the last content when scrolled to the bottom.

#### Scenario: Last content visible above nav

- **WHEN** the user scrolls to the very bottom of a slide
- **THEN** the bottom-most content is fully visible above the navigation bar

### Requirement: Dip-from overlay on mount

The `Slide` component SHALL accept a `dipFrom` prop (CSS color string). On initial render, a full-screen overlay with that color SHALL be visible and SHALL fade to transparent over 2 seconds.

#### Scenario: Slide mounts with dipFrom color

- **WHEN** a Slide mounts with `dipFrom="#ea9d34"`
- **THEN** a full-screen overlay starts at `#ea9d34` and transitions to transparent over 2 seconds

#### Scenario: No dipFrom means no mount overlay

- **WHEN** a Slide mounts without a `dipFrom` prop
- **THEN** no mount overlay is displayed

### Requirement: Dip-to overlay on navigate-away

The `Slide` component SHALL accept a `dipTo` prop (CSS color string). When a navigation action is triggered, a full-screen overlay SHALL transition from transparent to the `dipTo` color over 2 seconds before the slide is unmounted.

#### Scenario: Navigate triggers dipTo overlay

- **WHEN** the user clicks a navigation button on a slide with `dipTo="#f2e9e1"`
- **THEN** a full-screen overlay transitions from transparent to `#f2e9e1` over 2 seconds
- **AND** the slide is unmounted after the overlay is fully opaque

### Requirement: Picture zoom on transition

When navigating forward (to a higher slide index), the `picture` area SHALL scale up (zoom in) during the dip-to transition. When navigating backward (to a lower slide index), the `picture` area SHALL scale down (zoom out) during the dip-to transition.

#### Scenario: Forward navigation zooms picture in

- **WHEN** the user navigates forward from the current slide
- **THEN** the picture area scales up during the 2-second dip-to transition

#### Scenario: Backward navigation zooms picture out

- **WHEN** the user navigates backward from the current slide
- **THEN** the picture area scales down during the 2-second dip-to transition

### Requirement: Navigation blocked during transitions

Navigation actions SHALL be blocked while a transition is in progress. The total transition duration is 4 seconds (2s dip-to on current slide + 2s dip-from on new slide).

#### Scenario: Rapid clicks ignored

- **WHEN** the user clicks a navigation button while a transition is already in progress
- **THEN** the click is ignored and no additional transition starts
