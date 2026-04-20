## ADDED Requirements

### Requirement: Favicon assets present in public directory
All favicon and manifest files SHALL be present in the `public/` directory so Vite serves them at the site root.

#### Scenario: All favicon files are in public/
- **WHEN** the project is built
- **THEN** `public/` contains `favicon.ico`, `favicon.svg`, `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`, and `site.webmanifest`

### Requirement: HTML head contains favicon link tags
`index.html` SHALL include the favicon `<link>` and `<meta>` tags from `openspec/input/header.txt`.

#### Scenario: Favicon link tags are present
- **WHEN** the browser loads the page
- **THEN** the `<head>` contains `<link rel="icon">` for PNG and SVG, `<link rel="shortcut icon">` for ICO, `<link rel="apple-touch-icon">`, `<meta name="apple-mobile-web-app-title" content="Bänkås 2026">`, and `<link rel="manifest" href="/site.webmanifest">`

### Requirement: Theme color meta tag set
`index.html` SHALL include `<meta name="theme-color" content="#575279">` to match the PWA manifest theme color.

#### Scenario: Theme color meta tag is present
- **WHEN** the browser loads the page on mobile
- **THEN** the browser UI chrome uses the Rose Pine Dawn iris color `#575279`

### Requirement: Page title matches app name
The `<title>` in `index.html` SHALL be "Bänkåsläger 2026" to match the PWA manifest `name` field.

#### Scenario: Page title is set correctly
- **WHEN** the page is loaded
- **THEN** the browser tab and title bar show "Bänkåsläger 2026"
