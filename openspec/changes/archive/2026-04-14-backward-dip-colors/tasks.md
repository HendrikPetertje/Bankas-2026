## 1. App.tsx -- keep transitionDirection through full transition

- [x] 1.1 Move `setTransitionDirection(null)` from the slide-swap callback (2s mark) to the transition-end callback (4s mark), next to `setTransitioning(false)`

## 2. Slide.tsx -- direction-aware overlay colors

- [x] 2.1 Compute effective entry and exit colors from `transitionDirection`, `dipFrom`, and `dipTo`: forward/null uses dipTo for exit and dipFrom for entry; backward reverses them
- [x] 2.2 Use the effective exit color for the dipTo overlay element
- [x] 2.3 Use the effective entry color for the dipFrom overlay element and its visibility logic

## 3. Verification

- [x] 3.1 Run `pnpm build` and fix any type or build errors
- [x] 3.2 Run `pnpm lint:fix` and resolve any remaining warnings
- [x] 3.3 Visually verify: forward navigation uses dipTo→dipFrom colors, backward navigation uses dipFrom→dipTo colors, color chain is seamless in both directions
