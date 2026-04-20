## Context

The current navigation is a bottom dock bar on desktop (liquid-glass icons with proximity scaling) and a bottom-right map button on mobile. Both patterns are visually rich but hard to discover — there are no text labels, and the dock blends into slide content. The change moves navigation to a sticky top bar with text links on desktop and a compact top-right map button on mobile, introducing animated tile reveals and keeping the existing liquid-glass aesthetic.

The codebase uses React 19, TypeScript 6, Tailwind CSS v4 (config in `src/index.css`), and Biome. Navigation is `useState<SlideId>` in `App.tsx` — no router. The `SlideNav` component lives in `src/components/SlideNav/`.

## Goals / Non-Goals

**Goals:**
- Replace bottom dock with sticky top bar (~30–40 px closed height) holding five text links
- Hover on any link: genie effect pushes link downward + zooms it (cosine proximity falloff, direction inverted from current dock)
- Hover on the bar: animated tile reveal below each link; bar expands downward to cover full zoomed link + 50 % of tile
- Active slide link is visually distinguished (highlighted text or color)
- Mobile: sticky top-right compact liquid-glass bar with map icon; minimal zoom on tap (≤ 1.1×) to avoid triggering scroll/drag
- Mobile overlay keeps tiles but adds page-name label beneath each tile; tiles slightly smaller than current `lg-*` size
- All transitions smooth (no layout jump, no flicker)

**Non-Goals:**
- Back/next arrow buttons are removed — no longer part of the navigation
- No router introduction
- No SSR or server-side changes
- No new npm dependencies
- Back/next arrow image assets removal is out of scope for this change (can stay unused for now)

## Decisions

### D1 — Top bar height management via CSS custom property

The bar expands on hover from ~36 px to cover zoomed text + 50 % of tile height. A CSS custom property `--nav-height` on `:root` lets `App.tsx` set `padding-top` reactively without JS measurement, keeping the bar's height as the single source of truth.

**Alternative**: JS `ResizeObserver` on the bar. Rejected — adds runtime overhead and a layout-read/write cycle on every hover.

### D2 — Genie effect: downward push with `transformOrigin: 'top center'`

Current dock scales items upward (`transformOrigin: 'bottom center'`). For the top bar the direction inverts: items push down and zoom using `transformOrigin: 'top center'`. The same cosine-falloff algorithm is reused unchanged — only the origin changes.

**Alternative**: Pure CSS `:hover` scale. Rejected — the per-item proximity falloff requires JS mouse tracking as established by the existing dock design.

### D3 — Tile reveal: scale from 0 via CSS transition, bar height via `max-height`

Each tile starts at `scale(0)` and `opacity-0` and transitions to `scale(1)` + `opacity-100` on bar hover. The bar wrapper uses `max-height` transition (closed: `max-height: 36px`, open: `max-height: 36px + link-zoom-height + tile-height`) to animate the expansion smoothly without JS height measurement.

**Alternative**: Animating `height` directly. Rejected — requires knowing exact pixel height at animation time; `max-height` avoids that.

### D4 — Mobile bar: position `fixed top-0 right-0` inside a minimal pill

The mobile bar is a small rounded pill (liquid glass, ~36 px tall) fixed to the top-right. It contains only the map icon. The existing `MobileMapOverlay` component is reused with one addition: a `<p>` label below each tile.

**Alternative**: Keep bottom-right position. Rejected — the user explicitly requires top positioning to match the desktop top bar.

### D5 — Component split: `TopNavBar` + `MobileTopNav` replace `DesktopDock` + `MobileBackNext`

`SlideNav.tsx` is refactored into two new internal components:
- `TopNavBar` — desktop top bar (text links, proximity genie, tile reveal)
- `MobileTopNav` — mobile top-right pill + map icon

`MobileMapOverlay` is updated in-place (add label, reduce tile size).

The `SLIDE_ORDER` export and `SlideNavProps` interface stay unchanged to avoid breaking `App.tsx`.

## Risks / Trade-offs

- **Bar expansion may overlap slide content** → The bar expands downward; slide content starts below `padding-top`. The expansion is a visual overlay (absolute/fixed children) so it does not reflow page content. Mitigation: use `overflow: visible` on the bar and `z-50` for the expanded tile layer.
- **`max-height` transition can look slow if value is too large** → Cap `max-height` to a known reasonable maximum (e.g., `180px`) to keep transition duration consistent. Mitigation: tune `max-height` and transition duration together.
- **Mobile tap zoom (1.1×) vs drag threshold** → iOS and Android trigger drag after ~10 px movement. A 1.1× scale on a ~40 px icon moves the edges by ~2 px — well below drag threshold. Monitor on real devices if needed.
- **Biome `noFloatingPromises` + `noStaticElementInteractions`** → The bar wrapper needs `role="navigation"` (already semantic via `<nav>`); hover handlers go on the `<nav>` element directly to satisfy Biome. All event handlers are synchronous — no floating promises.
- **Unused back/next image assets** → `noUnusedLocals` applies to TS, not image imports via Vite. No build failure expected, but the files will remain in the repo as dead assets until explicitly cleaned up.
