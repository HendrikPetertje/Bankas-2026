## Why

The site loads 34+ bundled image assets totalling several megabytes (the two largest cutouts alone are 1.4 MB and 2.7 MB). Without a loading screen, visitors on slower connections see the first slide render with broken or partially loaded images before the assets arrive. As more slides are built, this will only get worse.

## What Changes

- Add a new `<LoadingScreen>` component that renders as a full-screen overlay above the rest of the app.
- The loading screen displays the camp logo image (`loading-screen-image.jpg`, 73 KB) centred on the page, with a progress bar beneath it that fills as images load.
- The loading screen preloads all known heavy image assets by creating `Image` objects in JS and tracking their `onload` events. Progress is derived from the ratio of loaded images to total images.
- Once all images are loaded (or a safety timeout elapses), the overlay fades out and unmounts, revealing the first slide.
- `App.tsx` is updated to wrap the slide render in the loading screen.
- The loading screen image is moved from `openspec/input/` to `src/components/LoadingScreen/images/`.

## Capabilities

### New Capabilities

- `loading-screen`: A full-screen loading overlay that preloads all heavy image assets, shows a branded image and progress bar, and fades out once loading is complete (or times out).

### Modified Capabilities

<!-- No existing spec-level requirements change. -->

## Impact

- `src/components/LoadingScreen/LoadingScreen.tsx` — new component
- `src/components/LoadingScreen/images/loading-screen-image.jpg` — image moved from `openspec/input/`
- `src/App.tsx` — renders `<LoadingScreen>` wrapping the slide output
- No changes to any slide components
