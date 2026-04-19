## MODIFIED Requirements

### Requirement: Active slide button uses dedicated image
The nav SHALL display a dedicated active-state image for the currently active slide button, instead of applying a CSS filter to the default image. The `activeSrc` image is shown when `activeSlide === btn.id`; the default `src` is shown otherwise. Hover effects (brightness-90) SHALL apply to both active and inactive buttons.

#### Scenario: Active button shows active image
- **WHEN** a slide is the active slide
- **THEN** its nav button renders the dedicated active image source, not the default image

#### Scenario: Inactive buttons show default image
- **WHEN** a slide is not the active slide
- **THEN** its nav button renders the default image source

#### Scenario: Hover effect applies to active button
- **WHEN** the user hovers over the active slide button
- **THEN** `hover:brightness-90` is applied, same as any other button

#### Scenario: Active image used in mobile overlay
- **WHEN** the mobile map overlay is open and a slide is active
- **THEN** its large (lg-) button also renders the dedicated active image
