## Why

App.tsx is currently a placeholder `<div>todo</div>`. Before any slide components, navigation, or games can be built, the app needs its core state model and routing switch so that each slide has a render target. This is the minimal foundation that all subsequent UI work depends on.

## What Changes

- Define the `SlideId` type union (`'front' | 'welcome' | 'info' | 'program' | 'contact'`) in App.tsx.
- Add `useState<SlideId>('front')` to manage the active slide.
- Render the active slide via a `switch` statement, outputting a simple `<div>` placeholder per slide (e.g., `<div>front</div>`).
- No navigation buttons, no SlideContainer component, no transitions — just the state + switch skeleton.

## Capabilities

### New Capabilities

- `slide-routing`: Core slide state model and switch-based rendering in App.tsx. Defines the `SlideId` type and renders a placeholder `<div>` for each slide value.

### Modified Capabilities

_(none)_

## Impact

- `src/App.tsx` — rewritten from placeholder to state + switch.
- No new dependencies or file additions.
- All future slide, navigation, and game work will build on this state model.
