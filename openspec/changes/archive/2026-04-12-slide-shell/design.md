## Context

App.tsx is currently `<div>todo</div>`. The project outline defines five slides (`front`, `welcome`, `info`, `program`, `contact`) managed by `useState`. Before any real slide components, navigation, or transitions can be built, App.tsx needs the state model and a switch to render the correct content per slide.

## Goals / Non-Goals

**Goals:**

- Define the `SlideId` type in App.tsx.
- Store the active slide in `useState<SlideId>('front')`.
- Render the matching slide placeholder via a `switch` expression.

**Non-Goals:**

- Navigation buttons or keyboard shortcuts.
- SlideContainer, transitions, or animations.
- Actual slide content or illustrations.
- Extracting `SlideId` type to a shared module (can happen later when other files need it).

## Decisions

### Inline type alias vs. exported type

Define `type SlideId = ...` at the top of App.tsx. It stays local until another module needs it, at which point it moves to a shared types file. Extracting now would create an unnecessary file for a single consumer.

### Switch expression inside JSX

Use an immediately-invoked arrow function or a helper that returns JSX based on the active slide. A plain `switch` is easier to read than a `Record<SlideId, ReactNode>` lookup and gives exhaustiveness checking when TypeScript's `noUncheckedSideEffectImports` or a `default: never` guard is used.

### Placeholder content

Each case renders `<div>{slide name}</div>` — the simplest possible marker. No Tailwind classes, no wrappers. This keeps the diff tiny and makes it obvious what needs replacing later.

## Risks / Trade-offs

- **Risk**: The `SlideId` type is duplicated if other files hardcode the same strings before it gets extracted.
  Mitigation: This change only touches App.tsx; extraction is a one-line refactor when needed.
- **Trade-off**: No `setSlide` is passed anywhere yet, so there is no way to change slides at runtime. This is intentional — navigation is a separate change.
