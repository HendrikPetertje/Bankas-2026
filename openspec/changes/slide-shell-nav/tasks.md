## 1. Asset Preparation

- [ ] 1.1 Create `src/components/SlideNav/images/` directory
- [ ] 1.2 Copy and resize slide button PNGs (door, forest, mountain, field, city) from `openspec/input/` to 80x80, rename `forest button.png` → `forest-button.png`
- [ ] 1.3 Copy and resize back/next arrow PNGs from `openspec/input/` to 120x73
- [ ] 1.4 Copy and resize mobile-map-button.png from `openspec/input/` to 60x51
- [ ] 1.5 Copy and resize close-button.png from `openspec/input/` to 60x61

## 2. App.tsx Updates

- [ ] 2.1 Export `SlideId` type from App.tsx
- [ ] 2.2 Add `transitioning` state and `onNavigate` callback that wraps `setSlide` with dip-to delay → slide swap logic, blocking during active transitions
- [ ] 2.3 Add `transitionDirection` state (`'forward' | 'backward' | null`) derived from slide index comparison, passed to slide components for zoom direction
- [ ] 2.4 Update switch to render real slide components (ForestWelcome, MountaintopInfo, PlainsProgram, CoastContact) with `activeSlide`, `onNavigate`, and `transitioning` props

## 3. Slide Shell Component

- [ ] 3.1 Create `src/components/Slide.tsx` with `children`, `picture`, `dipFrom`, `dipTo`, `activeSlide`, `onNavigate`, `transitioning`, and `transitionDirection` props
- [ ] 3.2 Implement vertical scroll container layout with content above picture
- [ ] 3.3 Implement bottom padding spacer so nav does not obscure content at scroll bottom
- [ ] 3.4 Implement dipFrom overlay: full-screen overlay that starts opaque with the dipFrom color and fades to transparent over 2s on mount
- [ ] 3.5 Implement dipTo overlay: full-screen overlay that transitions from transparent to the dipTo color over 2s when navigating away
- [ ] 3.6 Implement picture zoom: scale up on forward transition, scale down on backward transition, synced with dipTo timing
- [ ] 3.7 Render `SlideNav` at the bottom of the Slide with sticky positioning, passing through navigation props

## 4. Desktop Dock Navigation

- [ ] 4.1 Create `src/components/SlideNav/SlideNav.tsx` with desktop/mobile responsive rendering
- [ ] 4.2 Implement desktop dock bar layout: [back] [next] — gap — [door] [forest] [mountain] [field] [city], centered, fixed to viewport bottom
- [ ] 4.3 Add liquid glass backdrop effect (`backdrop-filter: blur()` + semi-transparent background)
- [ ] 4.4 Implement hover animation: items scale up and translate upward on hover
- [ ] 4.5 Implement hover darkening on all buttons (CSS brightness filter or overlay)
- [ ] 4.6 Implement active slide indicator (visual distinction for the current slide button)
- [ ] 4.7 Wire back/next logic: derive prev/next from SLIDE_ORDER array, hide back on first slide, hide next on last slide
- [ ] 4.8 Wire slide button clicks to `onNavigate`, block clicks when `transitioning` is true

## 5. Mobile Map Navigation

- [ ] 5.1 Implement mobile map button: sticky positioned at bottom, visible only below md breakpoint
- [ ] 5.2 Create `src/components/SlideNav/MobileMapOverlay.tsx` — full-screen overlay with liquid glass backdrop
- [ ] 5.3 Implement overlay layout: close button at top, [back] [next] row, [door] [forest] / [mountain] [field] rows, [city] centered
- [ ] 5.4 Wire overlay navigation: tapping a slide button triggers `onNavigate` and closes overlay
- [ ] 5.5 Wire close button to dismiss overlay

## 6. Placeholder Slide Components

- [ ] 6.1 Create `src/slides/ForestWelcome/ForestWelcome.tsx` using Slide shell with `<div>TODO: Forest Welcome content</div>` children and `<div>TODO: Forest Welcome image content</div>` picture
- [ ] 6.2 Create `src/slides/MountaintopInfo/MountaintopInfo.tsx` using Slide shell with `<div>TODO: Mountaintop Info content</div>` children and `<div>TODO: Mountaintop Info image content</div>` picture
- [ ] 6.3 Create `src/slides/PlainsProgram/PlainsProgram.tsx` using Slide shell with `<div>TODO: Plains Program content</div>` children and `<div>TODO: Plains Program image content</div>` picture
- [ ] 6.4 Create `src/slides/CoastContact/CoastContact.tsx` using Slide shell with `<div>TODO: Coast Contact content</div>` children and `<div>TODO: Coast Contact image content</div>` picture

## 7. Build & Lint

- [ ] 7.1 Run `pnpm build` and fix any type errors
- [ ] 7.2 Run `pnpm lint:fix` and resolve any remaining warnings
