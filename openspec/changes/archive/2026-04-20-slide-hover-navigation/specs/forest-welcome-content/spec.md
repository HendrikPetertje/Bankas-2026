## ADDED Requirements

### Requirement: ForestWelcome picture area hover overlay

The ForestWelcome picture slot SHALL render `forest-mouse-over-overlay.png` as a hover overlay following the `slide-picture-hover-nav` spec. The click-target region SHALL be top 5%, left 30%, width 25%, height 25%. Clicking SHALL call `onNavigate('info')`.

#### Scenario: Hover overlay renders over the forest picture

- **WHEN** the ForestWelcome picture area renders
- **THEN** `forest-mouse-over-overlay.png` is present in the overlay stack, invisible by default, covering the full picture dimensions

#### Scenario: Hovering the mountain region reveals the overlay

- **WHEN** the user's cursor enters the region from top 5% to 30%, left 30% to 55% of the picture
- **THEN** the forest hover overlay transitions to visible

#### Scenario: Clicking the mountain region navigates to info

- **WHEN** the user clicks inside the defined region
- **THEN** `onNavigate('info')` is called

### Requirement: ForestWelcome delayed tooltip

The ForestWelcome picture area SHALL render a tooltip with the text "Klicka på berget för att fortsätta" below the picture, following the `slide-picture-hover-nav` delayed tooltip spec.

#### Scenario: Tooltip text is correct

- **WHEN** the tooltip becomes visible
- **THEN** it reads "Klicka på berget för att fortsätta"
