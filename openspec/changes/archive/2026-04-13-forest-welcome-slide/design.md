## Context

The ForestWelcome slide (`welcome`) is the first content slide visitors see after clicking through the FrontDoor. It currently exists as a placeholder component that renders a Slide shell with TODO text. The slide needs to become a fully realized page with the camp introduction, images, animated creatures, and the forest background with cycling overlays.

All input assets are in `openspec/input/` and need to be moved into `src/slides/ForestWelcome/images/`. The welcome text is a markdown file that needs to be rendered with styled custom components.

The existing Slide shell already handles layout (content slot + picture slot), dip transitions, picture zoom, and sticky navigation. ForestWelcome just needs to provide the correct children and picture content.

## Goals / Non-Goals

**Goals:**
- Render the full welcome text from `openspec/input/valkommen-text.md` as styled markdown
- Display the "Konungens Rike" logo at the top of the content area
- Show 3 content images side-by-side with slight rotation below the text
- Animate 3 creatures (dragon, bird left-to-right; eagle right-to-left) drifting across the page
- Cycle through 3 background overlays on a timed schedule (4s pause, 2s visible, 500ms ease transitions)
- Set correct dip colors: dipFrom = gold (#ea9d34), dipTo = text (#575279)

**Non-Goals:**
- Mini-game ("Pack Your Bag") — separate change
- Game trigger element — separate change
- Custom scroll behavior or parallax effects
- Any changes to the Slide shell, SlideNav, or App.tsx

## Decisions

### 1. Markdown rendering: react-markdown

**Decision**: Use `react-markdown` to render the welcome text with custom component overrides.

**Rationale**: The welcome text contains markdown formatting (bold, blockquotes, paragraphs). Rather than manually parsing or converting to JSX, react-markdown provides a clean way to render markdown with custom styled components. It's lightweight (~7KB gzipped), has no heavy dependencies, and supports component overrides for h1-h6, blockquote, a, p, etc.

**Alternatives considered**:
- Raw JSX: Would lose the ability to keep content as editable markdown. Makes copy changes harder.
- mdx-js: Overkill for a single content block, adds build complexity.

### 2. Content storage: co-located slideContent.ts

**Decision**: Store the markdown text as a template literal string in `src/slides/ForestWelcome/slideContent.ts` and import it.

**Rationale**: Keeps content co-located with the component. A `.ts` file (not `.md`) avoids needing a Vite raw import plugin. The content is short enough that a string export is simple and type-safe.

### 3. Custom markdown components

**Decision**: Pass a `components` override object to react-markdown:
- `h1`-`h3`: Use `font-display` (Playwrite IE), `text-text` color, subtle sizing
- `blockquote`: Indent with `pl-4`, left border `border-l-2 border-rose`
- `a`: No `text-decoration`, instead `border-b-2 border-pine` for underline effect
- `p`: Standard body text with appropriate spacing
- `strong`: Default bold, no special override needed
- `em`: Already handled globally (Playwrite IE via CSS `em` rule)

**Rationale**: Keeps the markdown renderer aligned with the site's Rose Pine Dawn design. The custom components are stateless and can be defined as a constant object outside the component to avoid re-creation on render.

### 4. Content images layout

**Decision**: Render the 3 content images (`IMG_7673.jpg`, `IMG_8340.jpg`, `IMG_8482.jpg`) in a flex row with:
- Gap spacing between images
- Slight CSS rotation (-3deg, 1deg, -2deg or similar) for a "scattered photos" look
- Images sized proportionally (e.g., `max-w-[120px]` or similar) with `object-cover` and rounded corners
- Contained in a centered flex wrapper below the text

**Rationale**: Matches the storybook aesthetic — photos scattered on a page rather than rigidly aligned.

### 5. Flying creatures animation

**Decision**: Use the existing `drift` and `drift-reverse` CSS keyframes from `index.css` to animate 3 creatures across the page:
- `small-dragon.png`: left-to-right (`drift`), varying duration/delay
- `small-bird.png`: left-to-right (`drift`), different timing
- `small-eagle.png`: right-to-left (`drift-reverse`)

Same pattern as FrontDoor's floating details — absolutely positioned images with `pointer-events-none`, using `animation` CSS property.

**Rationale**: Reuses existing animation infrastructure. Consistent with FrontDoor's approach (clouds, birds).

### 6. Background overlay cycling

**Decision**: Use `useState` + `useEffect` with `setInterval` to cycle through the 3 overlays. Timing:
- Each overlay visible for 2 seconds
- 4-second gap between overlays
- Total cycle: overlay1 (2s) → gap (4s) → overlay2 (2s) → gap (4s) → overlay3 (2s) → gap (4s) → repeat
- Transitions use `opacity` with `transition: opacity 500ms ease-in-out`

Implementation: track `activeOverlayIndex` (0 = none, 1-3 = overlay). Use a single interval ticking at a rate that advances through the phases, or use a state machine approach with setTimeout chains.

**Decision detail**: Use a `setTimeout` chain rather than `setInterval` for cleaner phase management. Each phase schedules the next:
1. Set overlay N visible → after 2s, set invisible → after 4s, set overlay N+1 visible → repeat

**Rationale**: setTimeout chains are more predictable for variable-duration phases than trying to compute phase from a uniform interval tick.

### 7. Asset file organization

**Decision**: Copy all assets from `openspec/input/` into `src/slides/ForestWelcome/images/`:
- `background.png` → `background.png`
- `background - overlay 1.png` → `overlay-1.png` (rename for clean imports)
- `background - overlay 2.png` → `overlay-2.png`
- `background - overlay 3.png` → `overlay-3.png`
- `content-images/IMG_7673.jpg` → `content-1.jpg` (rename for clarity)
- `content-images/IMG_8340.jpg` → `content-2.jpg`
- `content-images/IMG_8482.jpg` → `content-3.jpg`
- `small-dragon.png` → `small-dragon.png`
- `small-bird.png` → `small-bird.png`
- `small-eagle.png` → `small-eagle.png`

All imported via Vite's static asset handling (ES module imports in the component).

**Rationale**: Co-location keeps assets next to the component that uses them. Clean filenames simplify imports.

### 8. Logo placement

**Decision**: The logo image (`docs/logo-small.png` or a copy into the ForestWelcome images folder) renders at the top of the content area, centered, before the "Valkommen" heading and text. Sized appropriately (e.g., `max-w-[200px]` on mobile, larger on desktop).

**Rationale**: The project outline specifies "Konungens Rike" logo at the top of slide 2.

## Risks / Trade-offs

- **[Image sizes]** The input images may be large. Vite handles this at build time, but oversized PNGs could slow initial load. → Mitigation: resize images with `sips` before copying if they exceed reasonable web sizes (e.g., background > 1500px wide).
- **[react-markdown bundle size]** Adds ~7KB gzipped to the bundle. → Acceptable for the functionality provided. Could be code-split with React.lazy if needed later.
- **[setTimeout chain drift]** setTimeout chains can accumulate small timing errors over many cycles. → Acceptable: the overlay cycle is decorative, not precision-critical. Errors of a few ms are invisible.
- **[Logo file location]** The only logo found is at `docs/logo-small.png`. If a higher-resolution version exists, it should be used instead. → Ask Peter if a better logo asset is available, otherwise use what we have.
