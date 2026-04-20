## 1. Remove old dock and back/next from SlideNav

- [x] 1.1 Delete the `DesktopDock` internal component from `SlideNav.tsx`
- [x] 1.2 Delete the `MobileBackNext` internal component from `SlideNav.tsx`
- [x] 1.3 Remove imports of `backImg` and `nextImg` from `SlideNav.tsx`
- [x] 1.4 Remove the `MobileMapButton` bottom-right rendering from the `SlideNav` root `<nav>` element
- [x] 1.5 Run `pnpm build && pnpm lint:fix` and fix any errors

## 2. Build `TopNavBar` component (desktop)

- [x] 2.1 Create a new `TopNavBar` internal component in `SlideNav.tsx` that renders a `<nav>` with `sticky top-0 z-50 w-full backdrop-blur-xl bg-base/25 shadow-lg`
- [x] 2.2 Define the `SLIDE_LINKS` array mapping `SlideId` → Swedish label (`Start`, `Välkommen`, `Lägerinfo`, `Program`, `Kontakt`)
- [x] 2.3 Render the five text links inside a centered flex row, styled `font-body text-sm` with active link using `text-pine font-semibold` and inactive using `text-text`
- [x] 2.4 Add `aria-label="Huvudnavigation"` to the `<nav>` element
- [x] 2.5 Hide `TopNavBar` on mobile with `hidden md:flex` (or equivalent)
- [x] 2.6 Run `pnpm build && pnpm lint:fix` and fix any errors

## 3. Add genie hover effect to `TopNavBar` links

- [x] 3.1 Add `useRef` array for link button elements and `useState` for scales
- [x] 3.2 Implement `onMouseMove` handler on `<nav>` using the existing `computeScales` cosine-falloff function (params: base 1.0, max 1.6, radius 80 px)
- [x] 3.3 Apply `transformOrigin: 'top center'` and `transition: 'transform 150ms ease-out'` to each link via inline `style`
- [x] 3.4 Add `onMouseLeave` handler to reset scales to `[]`
- [x] 3.5 Run `pnpm build && pnpm lint:fix` and fix any errors

## 4. Add tile reveal on `TopNavBar` hover

- [x] 4.1 Add `useState<boolean>` for `barHovered` to `TopNavBar`
- [x] 4.2 Set `barHovered = true` on `onMouseEnter` and `false` on `onMouseLeave` of the `<nav>`
- [x] 4.3 Render each tile `<img>` below its corresponding text link; default state: `scale-0 opacity-0`, hovered state: `scale-100 opacity-100` with `transition-all duration-200`
- [x] 4.4 Use `position: absolute` for tiles (below the bar) to avoid reflowing page content
- [x] 4.5 Animate bar `max-height` via Tailwind transition: closed ~`36px`, open ~`160px`; use CSS custom property or conditional class swap
- [x] 4.6 Ensure active slide uses `activeSrc` tile image in the reveal
- [x] 4.7 Run `pnpm build && pnpm lint:fix` and fix any errors

## 5. Build `MobileTopNav` component (mobile)

- [x] 5.1 Create a `MobileTopNav` internal component rendered at `fixed top-2 right-2 z-50 md:hidden`
- [x] 5.2 Style the wrapper as a small liquid-glass pill (`backdrop-blur-xl bg-base/25 rounded-2xl shadow-lg p-1`)
- [x] 5.3 Render the map icon button (reuse `mapImg`) inside the pill
- [x] 5.4 Apply minimal zoom on tap: add an `onClick` that sets a `tapped` state briefly (`true` → `false` after 120 ms), using `scale(1.1)` inline style while `tapped` is true, `scale(1)` otherwise, with `transition: 'transform 120ms ease-out'`
- [x] 5.5 Wire the map icon button to call `onMapOpen` prop to open `MobileMapOverlay`
- [x] 5.6 Replace the old `MobileMapButton` bottom-right rendering in `SlideNav` with `<MobileTopNav onMapOpen={() => setMapOpen(true)} />`
- [x] 5.7 Run `pnpm build && pnpm lint:fix` and fix any errors

## 6. Update `MobileMapOverlay` — smaller tiles + labels

- [x] 6.1 Open `MobileMapOverlay.tsx` and locate slide button tile rendering
- [x] 6.2 Change tile image `className` from ~`h-[200px] w-[200px]` to `h-[160px] w-[160px]`
- [x] 6.3 Add a `<p className="text-sm font-body text-text text-center mt-1">` label below each tile with the Swedish page name
- [x] 6.4 Remove the back/next row from the overlay layout
- [x] 6.5 Verify the city/contact tile remains `col-span-2` and centered
- [x] 6.6 Run `pnpm build && pnpm lint:fix` and fix any errors

## 7. Update `SlideNav` root and `App.tsx` layout

- [x] 7.1 Update `SlideNav`'s root `<nav>` wrapper: change `sticky bottom-0` to `sticky top-0 z-50` (or simply wrap `TopNavBar` and `MobileTopNav` without an extra nav wrapper since each has its own positioning)
- [x] 7.2 In `App.tsx`, add `pt-9` (or the exact closed-bar height class) to the main content wrapper so slide content is not obscured by the top bar on desktop
- [x] 7.3 Confirm `MobileMapOverlay` still renders as a portal/full-screen overlay above the top bar (`z-50` or higher)
- [x] 7.4 Run `pnpm build && pnpm lint:fix` and fix any errors

## 8. Final verification

- [x] 8.1 Visually verify desktop: top bar sticks at top, links are readable, genie effect pushes down, tiles reveal on hover, bar expands smoothly, active link is highlighted
- [x] 8.2 Visually verify mobile: top-right pill is visible, map icon tap opens overlay, overlay shows smaller tiles with labels, no back/next row
- [x] 8.3 Verify no 404 image errors in the console
- [x] 8.4 Run `pnpm build` — confirm zero type errors and zero build errors
- [x] 8.5 Run `pnpm lint` — confirm zero warnings and zero errors
