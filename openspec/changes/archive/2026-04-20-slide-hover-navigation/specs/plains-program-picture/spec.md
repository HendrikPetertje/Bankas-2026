## ADDED Requirements

### Requirement: PlainsProgram picture area hover overlay

The PlainsProgram picture slot SHALL render `plains-mouse-over-overlay.png` as a hover overlay following the `slide-picture-hover-nav` spec. The click-target region SHALL be top 6%, left 22%, width 22%, height 28%. Clicking SHALL call `onNavigate('contact')`.

#### Scenario: Hover overlay renders over the plains picture

- **WHEN** the PlainsProgram picture area renders
- **THEN** `plains-mouse-over-overlay.png` is present in the overlay stack, invisible by default, covering the full picture dimensions

#### Scenario: Hovering the city region reveals the overlay

- **WHEN** the user's cursor enters the region from top 6% to 34%, left 22% to 44% of the picture
- **THEN** the plains hover overlay transitions to visible

#### Scenario: Clicking the city region navigates to contact

- **WHEN** the user clicks inside the defined region
- **THEN** `onNavigate('contact')` is called

### Requirement: PlainsProgram delayed tooltip

The PlainsProgram picture area SHALL render a tooltip with the text "Klicka på stadsslottet för att fortsätta." below the picture, following the `slide-picture-hover-nav` delayed tooltip spec.

#### Scenario: Tooltip text is correct

- **WHEN** the tooltip becomes visible
- **THEN** it reads "Klicka på stadsslottet för att fortsätta."
