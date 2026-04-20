## Why

The current bottom-dock navigation is hard to discover and difficult to read — it blends into slide content and lacks textual labels. Moving to a top bar with visible text links makes the site immediately understandable to first-time visitors, while the macOS-inspired compact bar keeps it visually light.

## What Changes

- The desktop dock bar is removed from the bottom and replaced with a sticky top bar (~30–40 px tall) spanning the full viewport width
- The top bar has a liquid-glass effect (backdrop blur, semi-transparent) reminiscent of the macOS menu bar
- Five text links are displayed horizontally: **Start**, **Välkommen**, **Lägerinfo**, **Program**, **Kontakt**
- On hover, each link pushes downward and zooms (genie effect mirroring the current upward dock zoom)
- Hovering the top bar reveals picture tiles (one per slide) beneath the text links, scaling from 0 to full size; the bar expands downward to cover the full zoomed text and 50% of the tile — animated so it never looks jerky
- On mobile, the bottom-dock controls and the floating map button are replaced with a sticky top-right compact bar (liquid glass) containing the map icon; tapping/hovering the map icon opens the existing full-screen overlay (tiles + page names underneath each tile, tiles slightly smaller than today)
- The map icon has a minimal zoom on tap (small enough not to trigger accidental drag events)
- All transitions are smooth CSS animations (no layout jump)
- Back/next arrow buttons from the old dock are **removed** — slide-to-slide navigation happens exclusively through the named links and mobile overlay tiles

## Capabilities

### New Capabilities

- `top-nav-bar`: Sticky top navigation bar with liquid-glass styling, horizontal text links, hover genie effect (links push down + zoom), and animated tile reveal that expands the bar downward
- `mobile-top-nav`: Sticky top-right compact bar (liquid glass) on mobile with map icon; minimal icon zoom on tap; opens the full-screen overlay showing slide tiles with page-name labels

### Modified Capabilities

- `slide-nav`: Existing slide-nav spec covers the bottom dock, back/next logic, mobile overlay, and image assets. Requirements change substantially: dock moves to top, back/next arrows are removed, hover direction inverts, tile reveal is added, and mobile bar moves to top-right. The spec must be updated to reflect new layout, interaction model, and asset needs.

## Impact

- `src/components/SlideNav/` — primary change target; component logic, styles, and image assets updated
- `src/index.css` — may need new animation keyframes or Tailwind utility classes
- `src/App.tsx` — layout wrapper needs `pt-[nav-height]` or equivalent to prevent content hiding behind top bar
- No new dependencies required
- No router changes — navigation remains `useState<Slide>` in App.tsx
- Back/next arrow image assets may become unused (can be removed)
