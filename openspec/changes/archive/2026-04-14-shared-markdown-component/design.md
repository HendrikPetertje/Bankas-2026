## Context

Two slides — `ForestWelcome` and `MountaintopInfo` — each contain an identical `markdownComponents` object (6 element overrides) and import `react-markdown` directly. Any style change requires editing two files. Future slides (`PlainsProgram`, `CoastContact`) are likely to need markdown too, so the duplication will grow without intervention.

The project already uses a `src/components/` directory for shared UI (e.g. `Slide`, `SlideNav`). Adding `MarkdownContent` there follows the established pattern.

## Goals / Non-Goals

**Goals:**
- Single source of truth for all markdown element styles (`h1`–`h3`, `blockquote`, `a`, `p`)
- Zero visual or behavioural change — rendered output is identical after the refactor
- Simple drop-in replacement: `<MarkdownContent>{string}</MarkdownContent>`

**Non-Goals:**
- Adding new element overrides (e.g. `ul`, `li`, `strong`) — out of scope for this change
- Supporting per-slide style variations or override props — all slides use the same styles
- Remark/rehype plugin configuration — not used today, not added now

## Decisions

### 1. Component as a thin wrapper, not a utility function

The component accepts `children: string` and renders `<Markdown components={markdownComponents}>`. This keeps the call site idiomatic React (`<MarkdownContent>`) rather than a function call, and means future props (e.g. `className` on the wrapper div) can be added without changing call sites.

**Alternative considered:** Export `markdownComponents` as a const and let each slide import it. Rejected — slides would still each import `react-markdown` directly, so the `import Markdown` and `import type { Components }` duplication remains.

### 2. Location: `src/components/MarkdownContent/MarkdownContent.tsx`

Follows the existing `src/components/<Name>/<Name>.tsx` convention used by `Slide` and `SlideNav`.

### 3. No wrapper `<div>` in the component

`react-markdown` renders a fragment by default. The component will not add a wrapping element — each slide can wrap it in whatever container it needs, preserving layout control at the call site.

## Risks / Trade-offs

- **All slides share one style set** → If a future slide needs different markdown styles, the component will need a prop or a second variant. This is acceptable for now given all current content is uniform.
- **`strong` and `em` are not overridden** → `<strong>` renders as a bare `<b>` equivalent; `<em>` gets the display font via the global `em, i` CSS rule in `src/index.css`. This is existing behaviour — the refactor does not change it.
