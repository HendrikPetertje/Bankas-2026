## Why

The website currently has no favicon, PWA manifest, or mobile browser theming meta tags. Adding these assets ensures the site looks polished when bookmarked, shared, or added to a home screen — and satisfies basic web standards expected of a modern site.

## What Changes

- Copy all favicon assets from `openspec/input/favicon/` to `public/`
- Copy `site.webmanifest` from `openspec/input/favicon/` to `public/`
- Add favicon `<link>` tags to `index.html`
- Add `<meta name="apple-mobile-web-app-title">` to `index.html`
- Add `<link rel="manifest">` to `index.html`
- Add `<meta name="theme-color">` to `index.html` (Rose Pine Dawn iris: `#575279`)
- Update `<title>` to "Bänkåsläger 2026" for consistency with manifest

## Capabilities

### New Capabilities

- `favicon-and-pwa-meta`: Browser favicon, PWA web manifest, and mobile theming meta tags wired into the HTML document.

### Modified Capabilities

## Impact

- `index.html` — head section updated with new link/meta tags
- `public/` — new static assets (favicon files + manifest)
- No React component changes required
- No Tailwind or CSS changes required
