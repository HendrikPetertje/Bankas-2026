## 1. Copy static assets to public/

- [x] 1.1 Copy `openspec/input/favicon/favicon.ico` to `public/favicon.ico`
- [x] 1.2 Copy `openspec/input/favicon/favicon.svg` to `public/favicon.svg`
- [x] 1.3 Copy `openspec/input/favicon/favicon-96x96.png` to `public/favicon-96x96.png`
- [x] 1.4 Copy `openspec/input/favicon/apple-touch-icon.png` to `public/apple-touch-icon.png`
- [x] 1.5 Copy `openspec/input/favicon/web-app-manifest-192x192.png` to `public/web-app-manifest-192x192.png`
- [x] 1.6 Copy `openspec/input/favicon/web-app-manifest-512x512.png` to `public/web-app-manifest-512x512.png`
- [x] 1.7 Copy `openspec/input/favicon/site.webmanifest` to `public/site.webmanifest`

## 2. Update index.html

- [x] 2.1 Update `<title>` to `Bänkåsläger 2026`
- [x] 2.2 Add favicon link tags from `openspec/input/header.txt` inside `<head>`
- [x] 2.3 Add `<meta name="theme-color" content="#575279">` inside `<head>`

## 3. Verify build

- [x] 3.1 Run `pnpm build` and confirm no errors
- [x] 3.2 Run `pnpm lint:fix` and confirm no warnings or errors
