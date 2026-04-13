## ADDED Requirements

### Requirement: Content slot has sky gradient background

The content slot in the `Slide` component SHALL render with a linear-gradient background: `#add5f0` at the top fading to `#add5f000` (transparent) at approximately 60% height, at an angle of `170deg`. The gradient SHALL be applied via an inline `style` prop on the content `<div>`. The underlying `bg-edge-light` background of the slide container SHALL remain visible beneath the gradient.

#### Scenario: Gradient visible at top of content area

- **WHEN** any slide renders using the `Slide` shell
- **THEN** the top of the content area shows a sky-blue (`#add5f0`) tint that fades smoothly to transparent by ~60% of the content height

#### Scenario: Gradient does not affect layout

- **WHEN** the gradient background is applied
- **THEN** no layout shifts occur — content position, scroll behaviour, and picture slot position are unchanged

#### Scenario: Gradient angle is not perfectly vertical

- **WHEN** the gradient is rendered
- **THEN** the gradient direction is `170deg` (slightly angled from vertical), not `180deg`

#### Scenario: Transparent stop uses same hue

- **WHEN** the gradient is rendered
- **THEN** the transparent stop uses `#add5f000` (sky blue at alpha 0) rather than CSS `transparent`, avoiding grey interpolation artefacts
