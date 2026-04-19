## Context

`index.html` currently has a generic title and no favicon or manifest references. Seven favicon/manifest assets have been exported to `openspec/input/favicon/` and the required `<head>` tags are specified in `openspec/input/header.txt`. The site is hosted on GitHub Pages as a pure static site (no SSR). All assets served from root `/`.

## Goals / Non-Goals

**Goals:**
- Wire the exported favicon assets into the HTML document
- Register the PWA web manifest so browsers can install the site
- Set theme-color meta for mobile browser UI chrome
- Keep `index.html` as the single source of truth for head metadata

**Non-Goals:**
- Generating or editing the favicon image files themselves
- Making the site a full offline-capable PWA (no service worker)
- Dynamic theme-color switching per slide

## Decisions

**Copy assets to `public/` directly**
Vite serves files in `public/` at the root path unchanged. The favicon paths in `header.txt` all reference `/filename` (root-relative), so `public/` is the correct destination. No import or bundler involvement needed.

**Edit `index.html` directly, not via a React component**
Favicon and manifest tags belong in `<head>` and are not part of the React tree. Vite's `index.html` is the right place. No `react-helmet` or similar library is needed for a single-page static site.

**Theme color: `#575279` (Rose Pine Dawn iris)**
The `site.webmanifest` already uses `#575279` as `theme_color`. Using the same value in the `<meta name="theme-color">` tag ensures consistency between the installed PWA experience and the browser chrome on mobile.

**Background color: `#fffaf3` (Rose Pine Dawn base)**
Already set in the manifest. No additional HTML meta needed.

## Risks / Trade-offs

- [Assets not served at root] GitHub Pages serves from the repo root (or `docs/` branch), which matches Vite's `public/` output. Risk is low. → No mitigation needed beyond standard Vite build.
- [Manifest not found] If `site.webmanifest` is missing or malformed, browsers silently ignore it. → Validate JSON before committing.
