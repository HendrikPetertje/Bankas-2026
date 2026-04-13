## 1. Dependencies and Assets Setup

- [x] 1.1 Install `react-markdown` as a project dependency (`pnpm add react-markdown`)
- [x] 1.2 Copy and rename image assets from `openspec/input/` to `src/slides/ForestWelcome/images/`: background.png, overlay-1.png, overlay-2.png, overlay-3.png, small-dragon.png, small-bird.png, small-eagle.png
- [x] 1.3 Copy and rename content images from `openspec/input/content-images/` to `src/slides/ForestWelcome/images/`: content-1.jpg, content-2.jpg, content-3.jpg
- [x] 1.4 Copy the logo image into `src/slides/ForestWelcome/images/` (from `docs/logo-small.png` or a provided asset)

## 2. Content File

- [x] 2.1 Create `src/slides/ForestWelcome/slideContent.ts` with the welcome markdown text exported as a string constant (from `openspec/input/valkommen-text.md`, prepended with a `## Valkommen` heading)

## 3. Markdown Renderer

- [x] 3.1 Create a custom react-markdown components object with overrides for headings (h1-h3: display font, text-text color), blockquotes (pl-4, border-l-2 border-rose), links (no text-decoration, border-b-2), and paragraphs (appropriate spacing)
- [x] 3.2 Wire up react-markdown in the ForestWelcome component to render the slideContent string with the custom components

## 4. Content Area Layout

- [x] 4.1 Add the logo image at the top of the content area, centered with constrained width
- [x] 4.2 Add the markdown-rendered welcome text below the logo
- [x] 4.3 Add the three content images in a flex row below the text, with slight rotation per image, spacing, and centered as a group

## 5. Flying Creatures Animation

- [x] 5.1 Add three absolutely-positioned creature images (dragon, bird, eagle) with drift/drift-reverse animations, varying durations and delays, and pointer-events-none

## 6. Picture Container — Background and Overlays

- [x] 6.1 Render background.png as the full-width main illustration in the picture slot
- [x] 6.2 Implement the overlay cycling logic: useState + setTimeout chain to cycle through overlays (2s visible, 4s gap, ~500ms ease opacity transitions)
- [x] 6.3 Render the three overlay images positioned identically to the background, with opacity controlled by the cycling state

## 7. Dip Colors and Final Integration

- [x] 7.1 Verify dipFrom is `#ea9d34` (gold) and dipTo is `#575279` (text) on the Slide shell
- [x] 7.2 Run build and lint to verify no errors
