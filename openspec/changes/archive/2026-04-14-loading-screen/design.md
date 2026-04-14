## Context

The app currently renders slides directly with no loading gate. All images are Vite-bundled (imported via ES modules) — their hashed URLs are known at build time but the browser still needs to fetch and decode them before they can paint. The heaviest assets are the door cutout (798 KB), the logo (1.3 MB), the mountain cutout (1.4 MB), and the forest background (2.7 MB). On a slow connection these arrive late, causing the first slide to paint with missing images.

The asset list at build time is static and fully enumerable: 34 images across FrontDoor, ForestWelcome, MountaintopInfo, SlideNav, and MobileMapOverlay (PlainsProgram and CoastContact are stubs with no images yet).

## Goals / Non-Goals

**Goals:**
- Block the first slide from rendering until all known image assets have loaded (or a timeout fires)
- Show a branded loading image and a smooth progress bar during the wait
- Fade out gracefully when done
- Require zero changes to any slide component

**Non-Goals:**
- Lazy-loading images per slide — all assets are preloaded upfront in one pass
- Automatically discovering new images at runtime — the asset list is maintained manually in `LoadingScreen.tsx`
- Supporting images loaded from the `public/` directory (none exist)
- Retry logic for failed image loads — a safety timeout handles this

## Decisions

### 1. JS `Image` object preloading, not `<link rel="preload">`

Setting `img.src` on `new Image()` objects is the most reliable cross-browser way to force a fetch and get a deterministic `onload` callback. `<link rel="preload">` would require injecting elements into `<head>` from React, and its `onload` semantics are less consistent across browsers.

**Alternative considered:** `<Suspense>` with lazy slide components. Rejected — Vite already bundles everything into a single JS chunk; code-splitting wouldn't help with image fetch latency, and Suspense doesn't track image loads.

### 2. Asset list is a plain array of imported URLs in `LoadingScreen.tsx`

Because all images are Vite imports, their resolved URLs are just strings. `LoadingScreen` receives them as a prop (`assets: string[]`). `App.tsx` assembles the array by importing the same images it passes down to slides, then forwards the array to `<LoadingScreen>`.

**Alternative considered:** Having each slide register its images via context. Rejected — overly complex for a static list, and it would require mounting slides before loading, defeating the purpose.

### 3. Safety timeout of 8 seconds

If any image fails to load or the network stalls, the loading screen would hang forever. An 8-second `setTimeout` calls `setDone(true)` unconditionally. This is generous enough for slow 3G but not annoying on fast connections (where loading completes in under 1 second).

### 4. Fade-out via opacity transition, then unmount

When loading completes, a CSS `transition` fades the overlay to `opacity-0` over 600 ms, then a `setTimeout` removes it from the DOM. This avoids a jarring cut while keeping the overlay out of the accessibility tree after it's gone.

### 5. Progress bar uses `bg-pine` fill on `bg-surface` track

Matches the Rose Pine Dawn palette used throughout the site. The bar fills from left to right as `loadedCount / totalCount`.

### 6. App.tsx wraps the slide render rather than mounting LoadingScreen as a sibling

`App` returns either `<LoadingScreen>` (with the slide output as `children`) or the slide output directly. Once `done`, the loading screen is gone entirely and `App` returns just the slide. This avoids any stacking context or z-index fights after loading.

**Alternative considered:** Rendering both simultaneously with `position: fixed` on the overlay. Rejected — keeping the slide unmounted until loading is done saves unnecessary render work and avoids flashes of slide content behind the overlay.

## Risks / Trade-offs

- **[New images added to future slides won't be preloaded automatically]** → The asset array in `App.tsx` must be updated when PlainsProgram and CoastContact are built. This is a known manual step, documented in tasks.
- **[Loading screen image itself (73 KB) must load before the loading screen renders]** → Imported as a Vite asset, it's bundled and likely cached after first visit. On first load it loads in parallel with the JS bundle — acceptable given its small size.
- **[8-second timeout may be too short on very slow connections]** → The alternative (hanging forever) is worse. Users on extremely slow connections will see an incomplete first slide, which is the status quo today.
