# Konungens Rike — Project Outline

A playful, storybook-style website for a children's summer camp in northern Sweden,
organized by Baptistkyrkan Sundsvall & Bilda.

All content is in **Swedish**.

---

## Concept

The website is a five-page picture book. Each "page" is a full-screen slide
containing a large illustrated scene, text content, and a hidden mini-game.
Children navigate the book with arrow buttons (or, on page 1, by clicking the
door). The visual identity mixes warm Rose Pine Dawn tones with earthy fantasy
colors — forests, tunnels, mountains, coastal cities.

---

## Tech Stack

| Layer         | Choice                                            |
| ------------- | ------------------------------------------------- |
| Framework     | React 19 + TypeScript 6                           |
| Build         | Vite 8                                            |
| Styling       | Tailwind CSS v4 (all styles managed via Tailwind) |
| Linting       | Biome (replaces ESLint + Prettier)                |
| Routing       | None — `useState` drives slide selection           |
| Animation     | CSS transitions/keyframes + React state           |
| Package mgr   | pnpm                                              |
| Hosting       | GitHub Pages (no browser-router)                  |
| Spec workflow | OpenSpec (already configured)                     |

---

## Color System

### Rose Pine Dawn (primary palette)

| Token          | Hex       | Usage                                    |
| -------------- | --------- | ---------------------------------------- |
| base           | `#faf4ed` | Primary background                       |
| surface        | `#fffaf3` | Card/input backgrounds                   |
| overlay        | `#f2e9e1` | Modals, popovers, game overlays          |
| muted          | `#9893a5` | Disabled / low-contrast text             |
| subtle         | `#797593` | Secondary text, captions                 |
| text           | `#575279` | Body text, headings                      |
| love           | `#b4637a` | Errors, accents (red family)             |
| gold           | `#ea9d34` | Warnings, highlights (warm yellow)       |
| rose           | `#d7827e` | Interactive accents, buttons             |
| pine           | `#286983` | Links, keywords (deep teal)              |
| foam           | `#56949f` | Info accents, tags (ocean blue)          |
| iris           | `#907aa9` | Decorative accents (purple)              |
| highlight-low  | `#f4ede8` | Subtle hover / focus backgrounds         |
| highlight-med  | `#dfdad9` | Selection backgrounds                    |
| highlight-high | `#cecacd` | Borders, dividers                        |

### Extra colors

| Token         | Hex       | Usage                                      |
| ------------- | --------- | ------------------------------------------ |
| earth         | `#312b1d` | Dark accent backgrounds                    |
| edge-light    | `#fafafa` | Image edge fade (all pages except forest)  |

All colors are defined in the Tailwind config as semantic tokens so that
components reference role names, not raw hex values.

---

## Audience & Responsiveness

- **60 % mobile** (mostly iPhones, portrait) — the primary target.
- **40 % desktop** — comfortable widescreen layout.

Each slide is a vertically scrollable page that fits naturally on a phone screen.
Layouts use a mobile-first approach with breakpoints for wider viewports.

---

## Application Structure

### State model

```
type Slide = 'front' | 'welcome' | 'info' | 'program' | 'contact'
useState<Slide>('front')
```

### Navigation

- **Page 1 → 2**: clicking the door triggers a zoom + flash animation
  (~2 s CSS animation class, then state swap to `'welcome'`).
- **Pages 2–5**: left/right arrow buttons placed below the main illustration
  on each slide. Page 2 has no back arrow. Page 5 has no forward arrow.

### Slide layout (shared)

Each slide is a scroll container (`overflow-y: auto`, `height: 100svh`).
Content order per slide:

1. Text section (top)
2. Main illustration (anchored to bottom or filling remaining space)
3. Absolutely positioned detail overlays (small JPGs) on the illustration
4. Hidden game trigger element somewhere in the scene

### Image system

- Each main illustration has 1–2 **detail overlays**: small JPG/GIF images
  absolutely positioned (using percentage values) over the base picture.
  These add subtle animation (e.g., a dragon moving, trees swaying).
- Images are provided externally — the code renders `<img>` elements with
  styling conventions:
  - Edges fade to `#fafafa` by default.
- All images referenced from `[ComponentDir]/images/` or `src/assets/`. don't
  use public

---

## The Five Slides

### Slide 1 — "The Door" (`front`)

- **Text**: "Baptistkyrkan Sundsvall & Bilda presenterar" (centered above the door).
- **Image**: A fantastical door, bottom-aligned to viewport bottom.
- **Interaction**: Clicking the door zooms into it (the title text slides up
  off-screen), then a white flash → black → fade into slide 2.
- **Game**: None (this is the book cover).

### Slide 2 — "The Forest" (`welcome`)

- **Logo**: "Konungens Rike" at the top of the slide.
- **Text**: 1.5-paragraph camp introduction, displayed in a block with the
  page background color (`base`). Small detail images (dragons, birds, fantasy
  creatures) float and animate around the text block.
- **Image**: Forest scene — mountain in the distance. Bottom-aligned below
  the text block. Background above/beside the image is white (`#fafafa`).
- **Navigation**: Prev/next arrows below the main illustration (no back
  arrow on this slide since it's the first navigable page).
- **Game trigger**: Hidden element within the forest illustration.
- **Game — "Pack Your Bag"** (matching/memory):
  Modal styled as an open backpack / bag of holding. Cards show paired
  items (string → bow, shield → sword, cheese → sandwich, etc.). Kids
  flip cards to find matching pairs.

### Slide 3 — "The Mountaintop" (`info`)

- **Image**: Mountain summit vista — fantasy kingdom below, dragons in the
  distance, coastal city on the horizon, plains between mountain and city,
  forest on the near mountainside. Image bottom-aligned.
- **Text**: Camp information in two columns above the image (dates, ages,
  pricing, practical details).
- **Game trigger**: Binoculars icon.
- **Game — "Mountain climb"** (retro platform game):
  Modal styled as a game world. player has to move up the mountain by jumping
  from platform to platform, climb ropes, etc.

### Slide 4 — "The Plains" (`program`)

- **Image**: Open plains with tents, goblins, fantasy creatures, and a small
  inn (Wandering Inn nod). The city and coast visible in the distance.
  No mountain in frame. Image bottom-aligned.
- **Text**: Camp program / schedule above the image.
- **Game trigger**: Backpack icon.
- **Game — "Tent Builder"** (drag-and-drop puzzle):
  Modal styled as a small grassy field. Kids drag tent parts into the
  correct positions and order to assemble a tent.

### Slide 5 — "The Coast" (`contact`)

- **Image**: Warm tropical city street on the coast, kids fishing from docks,
  sunny mood. Image bottom-aligned.
- **Text**: Contact information and Bilda sponsorship details above the image.
- **Game trigger**: Fishing rod icon.
- **Game — "Gone Fishing"** (click-fast / timed):
  Modal styled as a speech-bubble shaped water area. Fish swim left to
  right. Kids click to raise/lower a fishing hook to catch fish while
  avoiding trash (boots, tires). Different fish score differently. Timer
  counts down.

---

## Game System (shared)

All four games share a common pattern:

- Activated by clicking a themed trigger element on the slide.
- Open in a full-screen or near-full-screen modal overlay.
- Each modal has a distinct visual frame matching its theme.
- Games track score locally (no backend).
- A close / "Stäng" button returns to the slide.
- Games are self-contained React components, lazy-loaded or code-split per slide.

---

## Asset Expectations

All illustrations, detail overlays, GIF triggers, and game graphics are
**provided externally** (not generated by code). The codebase provides
placeholder slots with documented dimensions/positions. Specific assets needed:

| Asset                          | Format          | Provider |
| ------------------------------ | --------------- | -------- |
| 5 main slide illustrations     | PNG / JPG       | External |
| Detail overlay fragments       | PNG / JPG / GIF | External |
| Game trigger icons (4)         | GIF / PNG       | External |
| Game card / piece graphics     | PNG / SVG       | External |
| "Konungens Rike" logo          | SVG / PNG       | External |
| Arrow navigation icons         | SVG             | Internal |

---

## File Structure (target)

```
src/
├── main.tsx
├── App.tsx                        # Slide state + navigation
├── index.css                      # Tailwind directives
├── components/
│   ├── SlideContainer.tsx         # Shared scroll container
│   ├── SlideNav.tsx               # Arrow buttons
│   ├── ImageScene.tsx             # Main image + detail overlays
│   ├── GameModal.tsx              # Shared modal shell
│   ├── PackYourBag.tsx            # Memory game
│   ├── CreatureSpotter.tsx        # Click-fast game
│   ├── TentBuilder.tsx            # Drag-and-drop puzzle
│   └── GoneFishing.tsx            # Click-fast fishing game
├── slides/
│   ├── FrontDoor.tsx              # Slide 1
│   ├── ForestWelcome.tsx          # Slide 2
│   ├── MountaintopInfo.tsx        # Slide 3
│   ├── PlainsProgram.tsx          # Slide 4
│   └── CoastContact.tsx          # Slide 5
└── assets/
    └── images/                    # Provided illustrations
```

---

## What This Outline Does Not Cover

The following details belong in individual OpenSpec changes, not here:

- Exact text copy for each slide.
- Pixel-level positioning of detail overlays.
- Game balancing (timers, point values, difficulty).
- Specific animation curves and durations.
- Biome configuration schema.
- Deployment pipeline details.
- Accessibility considerations beyond basic keyboard/touch support.
