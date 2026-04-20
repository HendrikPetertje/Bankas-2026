### Requirement: ForestWelcome displays the camp logo at the top

The ForestWelcome slide SHALL render the "Konungens Rike" logo image centered at the top of the content area, before any text content. The logo SHALL be sized proportionally (constrained width) and centered horizontally.

#### Scenario: Logo visible on slide load

- **WHEN** the ForestWelcome slide renders
- **THEN** the camp logo is displayed centered at the top of the content area above the welcome heading

### Requirement: ForestWelcome renders welcome text as styled markdown

The ForestWelcome slide SHALL render the camp introduction text using `react-markdown`. The text content SHALL be stored in a co-located `slideContent.ts` file as an exported string constant. The text SHALL include the "Valkommen" heading, introduction paragraphs, and a Bible quote.

#### Scenario: Welcome text renders with markdown formatting

- **WHEN** the ForestWelcome slide renders
- **THEN** the welcome text from `slideContent.ts` appears with proper paragraph breaks, bold text, and blockquote formatting

#### Scenario: Content file is co-located with the component

- **WHEN** the project structure is inspected
- **THEN** `src/slides/ForestWelcome/slideContent.ts` exists and exports a markdown string constant

### Requirement: Custom markdown component overrides for headings

The react-markdown renderer SHALL use custom components for `h1`, `h2`, and `h3` elements. These heading components SHALL use the display font (`font-display` / Playwrite IE) and the `text-text` color. They SHALL have subtle, appropriate sizing that fits the slide design.

#### Scenario: Markdown heading renders with display font

- **WHEN** the welcome text contains a markdown heading (e.g., `## Valkommen`)
- **THEN** the heading renders using the Playwrite IE display font with the text color

### Requirement: Custom markdown component override for blockquotes

The react-markdown renderer SHALL use a custom blockquote component. Blockquotes SHALL be indented with left padding and have a 2px left border using the `rose` color from the Rose Pine Dawn palette.

#### Scenario: Bible quote renders as styled blockquote

- **WHEN** the welcome text contains a blockquote (e.g., `> "Himmelriket ar..."`)
- **THEN** the blockquote renders with left padding and a 2px `border-l` in the `rose` color

### Requirement: Custom markdown component override for links

The react-markdown renderer SHALL use a custom link component. Links SHALL NOT have `text-decoration`. Instead, they SHALL have a 2px `border-bottom` as the underline indicator.

#### Scenario: Link renders without text-decoration

- **WHEN** the welcome text contains a markdown link
- **THEN** the link renders without text-decoration and with a 2px bottom border instead

### Requirement: ForestWelcome displays three content images with rotation

The ForestWelcome slide SHALL display 3 content images (photos from the camp) in a horizontal row below the welcome text. Each image SHALL have a slight CSS rotation (varying per image) and spacing between them. The images SHALL be sized proportionally and centered as a group.

#### Scenario: Content images appear below text

- **WHEN** the ForestWelcome slide renders
- **THEN** three content images are displayed in a row below the welcome text with slight rotation applied to each

#### Scenario: Images have varied rotation

- **WHEN** the content images render
- **THEN** each image has a different rotation angle giving a "scattered photos" appearance

### Requirement: ForestWelcome animates three flying creatures

The ForestWelcome slide SHALL animate three small creature images across the page:
- `small-dragon.png` SHALL drift from left to right using the `drift` keyframe
- `small-bird.png` SHALL drift from left to right using the `drift` keyframe
- `small-eagle.png` SHALL drift from right to left using the `drift-reverse` keyframe

Each creature SHALL have different animation durations and delays. Creatures SHALL be absolutely positioned, use `pointer-events-none`, and loop infinitely.

#### Scenario: Dragon flies left to right

- **WHEN** the ForestWelcome slide is visible
- **THEN** a small dragon image drifts from the left edge to the right edge of the screen and loops

#### Scenario: Eagle flies right to left

- **WHEN** the ForestWelcome slide is visible
- **THEN** a small eagle image drifts from the right edge to the left edge of the screen and loops

#### Scenario: Creatures do not block interaction

- **WHEN** a creature image passes over interactive elements
- **THEN** the creature does not intercept click or touch events (pointer-events-none)

### Requirement: ForestWelcome picture container renders background with overlays

The ForestWelcome picture slot SHALL render `background.png` as the main forest illustration. Three overlay images SHALL cycle on a timed schedule:
- Each overlay appears for 2 seconds
- After disappearing, a 4-second pause occurs before the next overlay appears
- Overlays transition opacity with a ~500ms ease timing function
- The cycle repeats infinitely: overlay1 → gap → overlay2 → gap → overlay3 → gap → overlay1...

The background image SHALL scale with the page width (full-width, responsive).

#### Scenario: Background image fills the picture container

- **WHEN** the ForestWelcome slide renders
- **THEN** the forest background image is displayed at full width in the picture slot

#### Scenario: Overlays cycle with correct timing

- **WHEN** the slide has been visible for sufficient time
- **THEN** overlays appear one at a time in sequence, each visible for 2s with 4s gaps between them

#### Scenario: Overlay transitions are smooth

- **WHEN** an overlay appears or disappears
- **THEN** the opacity transition takes approximately 500ms with an ease timing function

#### Scenario: Overlays are the same size as the background

- **WHEN** an overlay is visible
- **THEN** it covers the same area as the background image (same dimensions, positioned identically)

### Requirement: ForestWelcome dip colors

The ForestWelcome slide SHALL use `dipFrom="#ea9d34"` (gold) and `dipTo="#575279"` (text) when rendered inside the Slide shell.

#### Scenario: Entering ForestWelcome fades from gold

- **WHEN** the user navigates to the ForestWelcome slide
- **THEN** the slide appears with a gold overlay that fades to transparent over 2 seconds

#### Scenario: Leaving ForestWelcome fades to text color

- **WHEN** the user navigates away from the ForestWelcome slide
- **THEN** a text-colored overlay fades in over 2 seconds before the slide swap

### Requirement: ForestWelcome assets are co-located in component folder

All image assets used by the ForestWelcome slide SHALL be stored in `src/slides/ForestWelcome/images/`. This includes the background, 3 overlays, 3 content images, 3 creature PNGs, and the logo. All images SHALL be imported via ES module imports (Vite static asset handling).

#### Scenario: Image folder contains all required assets

- **WHEN** the ForestWelcome images directory is inspected
- **THEN** it contains: background.png, overlay-1.png, overlay-2.png, overlay-3.png, content-1.jpg, content-2.jpg, content-3.jpg, small-dragon.png, small-bird.png, small-eagle.png, and a logo image

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
