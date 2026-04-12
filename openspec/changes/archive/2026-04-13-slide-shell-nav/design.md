## Context

The app currently has one fully built slide (FrontDoor) and four placeholder `<div>`s in App.tsx. Before any slide content can be built, we need: a reusable layout shell that handles scroll, content/image slots, and transition overlays; a navigation system that works on both mobile and desktop; and stub slide components wired into App.tsx.

FrontDoor manages its own full-viewport layout and door-open transition. Slides 2-5 share a common layout pattern (content on top, illustration below, nav at bottom) that the Slide shell will provide. FrontDoor will NOT use the Slide shell — it remains self-contained.

Navigation assets (PNGs) are provided in `openspec/input/` at sizes larger than needed for web. They will be resized and moved into the codebase during implementation.

## Goals / Non-Goals

**Goals:**
- Reusable `Slide` component with content slot, picture slot, dip-from/dip-to transition overlays, and sticky navigation
- Desktop dock-style nav bar with macOS liquid glass backdrop, hover-grow animation, and all 5 slide buttons + back/next arrows
- Mobile nav: sticky map button that opens a full-screen overlay with all nav options and close button
- Zoom-based transitions: forward nav zooms picture in, backward nav zooms picture out
- Color dip transitions: 2s fade-in overlay on mount (dipFrom), 2s fade-out overlay on navigate-away (dipTo)
- Placeholder slide components for slides 2-5 with TODO content
- Bottom padding so nav never obscures scroll content

**Non-Goals:**
- Actual content for slides 2-5 (text, illustrations) — those come in later changes
- Mini-games or game triggers
- FrontDoor modifications (it keeps its own layout and transition)
- Keyboard navigation or accessibility beyond basic button semantics

## Decisions

### 1. Slide component is a layout wrapper, not a page component

The `Slide` component accepts `children` (content), `picture` (ReactNode), `dipFrom`/`dipTo` (CSS color strings), and renders them in a vertical scroll container with the nav docked at the bottom. Each page component (ForestWelcome, etc.) uses `<Slide>` internally. Each slide lives in its own folder (`src/slides/<Name>/<Name>.tsx`) so that images, text, and other assets can be co-located alongside the component.

**Alternative considered**: Making Slide a higher-order component or render-prop pattern. Rejected because a simple wrapper with named props is clearer for this use case.

### 2. Navigation state lives in App.tsx, passed down

App.tsx owns `activeSlide` and `setSlide`. It passes `activeSlide`, an `onNavigate` callback, and transition control to the Slide shell via props. The Slide component passes these to SlideNav.

**Alternative considered**: Context API for navigation state. Rejected — prop drilling is minimal (App → Slide → SlideNav) and keeps the data flow explicit.

### 3. Transition orchestration in App.tsx

When a navigation action is triggered:
1. The current slide's `dipTo` overlay animates to opaque (2s)
2. If navigating forward: the picture zooms in during the dip. If backward: the picture zooms out.
3. After the overlay is fully opaque, App.tsx swaps `activeSlide`
4. The new slide mounts with its `dipFrom` overlay opaque, which fades to transparent (2s)

App.tsx manages a `transitioning` state that blocks additional nav clicks during the 4s total transition. The `onNavigate` callback wraps `setSlide` with this transition logic.

### 4. Desktop dock: CSS-only hover scaling with backdrop-filter

The dock bar uses `backdrop-filter: blur()` with a subtle background tint for the liquid glass effect. Nav items scale up on hover using CSS `transition: transform`. The dock is fixed to the viewport bottom. Non-hovered state has the dock flush with the page bottom; hovered items grow upward (negative translate-y + scale).

**Alternative considered**: JavaScript-based proximity scaling (like the real macOS dock). Rejected as over-engineered for 7 items — CSS `:hover` on individual items is sufficient.

### 5. Mobile map overlay: portal-free, state-driven

The mobile overlay is a fixed-position div toggled by state in the SlideNav component. It uses `backdrop-filter: blur()` for the liquid glass effect. No React portal needed since it's fixed-positioned and has a high z-index.

### 6. Image sizing

Input images are oversized for web use. Target sizes for the nav buttons:
- Slide buttons (door, forest, mountain, field, city): 400x400 → resize to 80x80 (displayed at ~48-64px with room for hover growth)
- Back/next arrows: 562x344 → resize to ~120x73
- Mobile map button: 250x212 → resize to ~60x51
- Close button: 250x252 → resize to ~60x61

Images will be co-located with the SlideNav component at `src/components/SlideNav/images/`.

### 7. Slide order mapping

A constant array maps SlideId to its index for prev/next logic:

```ts
const SLIDE_ORDER: SlideId[] = ['front', 'welcome', 'info', 'program', 'contact'];
```

Back/next buttons derive from the current index. `front` has no back, `contact` has no forward. The dock highlights the active slide button.

## Risks / Trade-offs

- **[backdrop-filter support]** → `backdrop-filter` is well-supported in modern browsers (96%+ global). For the target audience (parents with recent phones), this is acceptable. No fallback needed.
- **[Transition timing coordination]** → The 2s dip-to + 2s dip-from sequence requires careful setTimeout coordination. Risk of state desync if user rapidly clicks. → Mitigated by blocking nav during transitions.
- **[Image resize quality]** → Resizing PNGs with `sips` on macOS may produce slightly different quality than professional tools. → Acceptable for nav icons at small display sizes.
- **[FrontDoor doesn't use Slide shell]** → FrontDoor has its own layout, transition, and no dock nav. This means two navigation patterns coexist. → Acceptable because FrontDoor is the "book cover" — once you enter the book (slide 2+), the dock appears.
