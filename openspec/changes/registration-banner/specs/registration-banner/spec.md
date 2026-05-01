## ADDED Requirements

### Requirement: Banner shows pre-registration message before deadline
The `RegistrationBanner` component SHALL display the text "Anmälan öppnar kl 20:00 den 3 maj" when the current date and time is before 3 maj 2026 kl 20:00.

#### Scenario: Visitor arrives before registration opens
- **WHEN** the current date/time is before 2026-05-03T20:00:00 local time
- **THEN** the banner displays "Anmälan öppnar kl 20:00 den 3 maj" as plain text (no link)

### Requirement: Banner shows registration link after deadline
The `RegistrationBanner` component SHALL display "Anmäl dig här nu" as a hyperlink after the deadline has passed.

#### Scenario: Visitor arrives after registration opens
- **WHEN** the current date/time is on or after 2026-05-03T20:00:00 local time
- **THEN** the banner displays "Anmäl dig här nu" as a link to `https://www.ecclisify.com/form/baptistsundsvall/lageranmalan26` opening in a new tab

#### Scenario: Link opens in new tab
- **WHEN** the visitor clicks the "Anmäl dig här nu" link
- **THEN** the registration form opens in a new browser tab/window

### Requirement: Banner has angled visual style
The banner SHALL be visually styled with a white background, a 3–4 degree clockwise rotation, and gold border lines using the Rose Pine Dawn `gold` color token.

#### Scenario: Banner renders with correct visual style
- **WHEN** the banner is rendered
- **THEN** it has a white (`bg-white`) background, is rotated approximately 3–4 degrees, and has visible gold (`border-gold`) top and bottom border lines

### Requirement: Banner uses display font at large size
The banner text SHALL use the display font (`font-display`) at a large size appropriate for a headline element.

#### Scenario: Banner text is visually prominent
- **WHEN** the banner is rendered
- **THEN** the text uses `font-display` and is rendered at a size larger than body text (e.g., `text-2xl` or larger)
