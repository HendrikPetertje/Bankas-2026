## 1. Implementation

- [x] 1.1 In `src/components/Slide.tsx`, add an inline `style` prop to the content slot `<div className="flex-1">` with `background: 'linear-gradient(170deg, #add5f0 0%, #add5f000 60%)'`

## 2. Verification

- [x] 2.1 Run `pnpm build` and confirm no type or build errors
- [x] 2.2 Run `pnpm lint:fix` and confirm no lint warnings or errors
- [x] 2.3 Visually verify the gradient appears at the top of the content area on the ForestWelcome slide (sky-blue tint fading to transparent)
- [x] 2.4 Visually verify the gradient angle is not perfectly vertical (slight tilt visible)
- [x] 2.5 Visually verify no layout shift — content, picture, and nav positions are unchanged
