## ADDED Requirements

### Requirement: MountaintopInfo picture area hover overlay

The MountaintopInfo picture slot SHALL render `mountain-mouse-over-overlay.png` as a hover overlay following the `slide-picture-hover-nav` spec. The click-target region SHALL be top 45%, left 47%, width 15%, height 20%. Clicking SHALL call `onNavigate('program')`.

#### Scenario: Hover overlay renders over the mountain picture

- **WHEN** the MountaintopInfo picture area renders
- **THEN** `mountain-mouse-over-overlay.png` is present in the overlay stack, invisible by default, covering the full picture dimensions

#### Scenario: Hovering the plains region reveals the overlay

- **WHEN** the user's cursor enters the region from top 45% to 65%, left 47% to 62% of the picture
- **THEN** the mountain hover overlay transitions to visible

#### Scenario: Clicking the plains region navigates to program

- **WHEN** the user clicks inside the defined region
- **THEN** `onNavigate('program')` is called

### Requirement: MountaintopInfo delayed tooltip

The MountaintopInfo picture area SHALL render a tooltip with the text "Klicka på gräsängarna för att fortsätta." below the picture, following the `slide-picture-hover-nav` delayed tooltip spec.

#### Scenario: Tooltip text is correct

- **WHEN** the tooltip becomes visible
- **THEN** it reads "Klicka på gräsängarna för att fortsätta."
