## ADDED Requirements

### Requirement: Loading screen blocks first slide until assets are ready

A `<LoadingScreen>` component SHALL render as a `fixed inset-0 z-[100]` overlay with `bg-base` background, covering the entire viewport and sitting above all slide content. The overlay SHALL remain visible until all preloaded images have fired their `onload` event, or until an 8-second safety timeout elapses — whichever comes first.

The first slide SHALL NOT be visible to the user while the loading screen is present.

#### Scenario: Overlay covers the full viewport

- **WHEN** the app first loads
- **THEN** the loading screen overlay fills the entire viewport and no slide content is visible beneath it

#### Scenario: Loading completes before timeout

- **WHEN** all preloaded images have loaded
- **THEN** the loading screen begins its fade-out transition

#### Scenario: Safety timeout fires

- **WHEN** 8 seconds have elapsed and not all images have loaded
- **THEN** the loading screen begins its fade-out transition regardless

### Requirement: Loading screen displays branded image and progress bar

The loading screen SHALL display the camp loading image (`loading-screen-image.jpg`) centred horizontally and vertically on the screen. Below the image SHALL be a progress bar that fills left-to-right from `0%` to `100%` as images load.

The progress bar track SHALL use `bg-surface` and the fill SHALL use `bg-pine`. The bar SHALL have rounded ends (`rounded-full`). The image SHALL have a fixed maximum width (no larger than 320px on mobile, no larger than 400px on desktop).

#### Scenario: Image is centred

- **WHEN** the loading screen is visible
- **THEN** the branded image is centred horizontally and vertically in the viewport

#### Scenario: Progress bar reflects load progress

- **WHEN** half of the images have loaded
- **THEN** the progress bar fill is approximately 50% wide

#### Scenario: Progress bar is full when loading completes

- **WHEN** all images have loaded
- **THEN** the progress bar fill reaches 100% width before the fade-out begins

### Requirement: Loading screen fades out on completion

When loading is done (all images loaded or timeout), the overlay SHALL transition its `opacity` from `1` to `0` over 600 ms using a CSS transition. After the transition completes, the overlay SHALL be fully removed from the DOM (unmounted).

#### Scenario: Fade-out is smooth

- **WHEN** loading completes
- **THEN** the overlay fades to transparent over 600 ms rather than disappearing instantly

#### Scenario: Overlay is removed after fade

- **WHEN** the 600 ms fade-out transition finishes
- **THEN** the loading screen is no longer present in the DOM

### Requirement: App assembles and passes the asset list to LoadingScreen

`App.tsx` SHALL import all heavy image assets from all currently-implemented slides (FrontDoor, ForestWelcome, MountaintopInfo) and the navigation components (SlideNav, MobileMapOverlay), and pass them as a `string[]` prop called `assets` to `<LoadingScreen>`.

When new slides with images are implemented, their images SHALL be added to this array.

#### Scenario: All known images are preloaded

- **WHEN** the loading screen mounts
- **THEN** it initiates `new Image()` fetch requests for every URL in the `assets` prop

#### Scenario: Empty assets list skips loading

- **WHEN** the `assets` prop is an empty array
- **THEN** the loading screen completes immediately without waiting
