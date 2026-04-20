### Requirement: Hover overlay reveals on cursor enter

Each participating slide's picture area SHALL render its hover overlay image (`*-mouse-over-overlay.png`) absolutely positioned over the picture, matching the picture's dimensions exactly. The overlay SHALL be `opacity-0` by default and transition to `opacity-100` when the user's cursor enters the defined click-target region. The transition SHALL use a CSS ease timing function over approximately 300ms. The overlay SHALL return to `opacity-0` when the cursor leaves the region, unless a navigation transition has begun.

#### Scenario: Overlay appears on hover

- **WHEN** the user moves the cursor into the defined click-target region
- **THEN** the hover overlay image transitions from invisible to fully visible over ~300ms

#### Scenario: Overlay hides on cursor leave

- **WHEN** the user moves the cursor out of the click-target region without clicking
- **THEN** the hover overlay image transitions back to invisible

#### Scenario: Overlay persists once navigation begins

- **WHEN** the user has clicked the region and the navigation transition is in progress
- **THEN** the hover overlay remains at `opacity-1` regardless of cursor position

### Requirement: Dual click target — mobile full-image, desktop precise region

On viewports below the `md` breakpoint, the entire picture SHALL be a single transparent click target (`inset-0`), allowing fat-finger taps anywhere on the image to trigger navigation. The full-image button SHALL also respond to `onMouseEnter` / `onMouseLeave` to reveal the hover overlay.

On viewports at or above the `md` breakpoint, the click target SHALL be a smaller absolutely-positioned button covering only the percentage-based region specific to that slide:

- **ForestWelcome**: top 5%, left 30%, width 25%, height 25%
- **MountaintopInfo**: top 45%, left 47%, width 15%, height 20%
- **PlainsProgram**: top 6%, left 22%, width 22%, height 28%

Both targets SHALL be transparent (`bg-transparent`, `border-0`, `p-0`) with `cursor-pointer`.

#### Scenario: Mobile tap anywhere navigates

- **WHEN** the viewport is below `md` and the user taps anywhere on the picture
- **THEN** navigation is triggered to the next slide

#### Scenario: Mobile hover anywhere reveals overlay

- **WHEN** the viewport is below `md` and the user hovers anywhere on the picture
- **THEN** the hover overlay becomes visible

#### Scenario: Desktop click target covers the precise region

- **WHEN** the viewport is at or above `md` and the user clicks inside the percentage-specified region
- **THEN** navigation is triggered to the next slide

#### Scenario: Desktop click target is invisible

- **WHEN** the picture renders on desktop
- **THEN** the click-target button has no visible background or border

### Requirement: Click triggers navigation via onNavigate callback

Clicking the click-target (mobile full-image or desktop precise region) SHALL call `onNavigate` with the next slide's ID:

- ForestWelcome → `'info'`
- MountaintopInfo → `'program'`
- PlainsProgram → `'contact'`

The slide shell handles the dip animation. No custom transition logic is needed inside the picture component.

#### Scenario: Click navigates to the next slide

- **WHEN** the user clicks or taps the click-target region
- **THEN** `onNavigate` is called with the correct next slide ID

### Requirement: Delayed tooltip below the picture

Each participating slide SHALL render a tooltip text element as a sibling below the picture container (not inside it). The tooltip SHALL be `opacity-0` on mount and transition to `opacity-1` after 3 seconds using a CSS transition, matching the front-door tooltip pattern. The text SHALL use the body font (`font-body`) and `text-text` color, centered horizontally. No top margin SHALL be applied — the tooltip sits flush against the picture's natural bottom edge, with bottom padding (`pb-8`) for breathing room.

Tooltip texts:
- ForestWelcome: "Klicka på berget för att fortsätta"
- MountaintopInfo: "Klicka på gräsängarna för att fortsätta."
- PlainsProgram: "Klicka på stadsslottet för att fortsätta."

#### Scenario: Tooltip is hidden on mount

- **WHEN** the slide first renders
- **THEN** the tooltip text is present in the DOM but invisible (`opacity-0`)

#### Scenario: Tooltip fades in after 3 seconds

- **WHEN** 3 seconds have elapsed since the slide mounted
- **THEN** the tooltip transitions to `opacity-1`

### Requirement: Hover overlay asset co-location

Each slide's hover overlay image SHALL be stored in the slide's own `images/` directory and imported via ES module import:

- `src/slides/ForestWelcome/images/forest-mouse-over-overlay.png`
- `src/slides/MountaintopInfo/images/mountain-mouse-over-overlay.png`
- `src/slides/PlainsProgram/images/plains-mouse-over-overlay.png`

Source files are available at `openspec/input/`.

#### Scenario: Overlay image loads without 404

- **WHEN** the slide renders
- **THEN** the hover overlay image loads successfully from the co-located images directory

### Requirement: Click triggers navigation via onNavigate callback

Clicking inside the click-target region SHALL call `onNavigate` with the next slide's ID:

- ForestWelcome → `'info'`
- MountaintopInfo → `'program'`
- PlainsProgram → `'contact'`

The slide shell handles the dip animation. No custom transition logic is needed inside the picture component.

#### Scenario: Click navigates to the next slide

- **WHEN** the user clicks inside the click-target region
- **THEN** `onNavigate` is called with the correct next slide ID

### Requirement: Delayed tooltip below the picture

Each participating slide SHALL render a tooltip text element as a sibling below the picture container (not inside it). The tooltip SHALL be `opacity-0` on mount and transition to `opacity-1` after 3 seconds using a CSS transition, matching the front-door tooltip pattern. The text SHALL use the body font (`font-body`) and `text-text` color, centered horizontally.

Tooltip texts:
- ForestWelcome: "Klicka på berget för att fortsätta"
- MountaintopInfo: "Klicka på gräsängarna för att fortsätta."
- PlainsProgram: "Klicka på stadsslottet för att fortsätta."

#### Scenario: Tooltip is hidden on mount

- **WHEN** the slide first renders
- **THEN** the tooltip text is present in the DOM but invisible (`opacity-0`)

#### Scenario: Tooltip fades in after 3 seconds

- **WHEN** 3 seconds have elapsed since the slide mounted
- **THEN** the tooltip transitions to `opacity-1`

### Requirement: Hover overlay asset co-location

Each slide's hover overlay image SHALL be stored in the slide's own `images/` directory and imported via ES module import:

- `src/slides/ForestWelcome/images/forest-mouse-over-overlay.png`
- `src/slides/MountaintopInfo/images/mountain-mouse-over-overlay.png`
- `src/slides/PlainsProgram/images/plains-mouse-over-overlay.png`

Source files are available at `openspec/input/`.

#### Scenario: Overlay image loads without 404

- **WHEN** the slide renders
- **THEN** the hover overlay image loads successfully from the co-located images directory
