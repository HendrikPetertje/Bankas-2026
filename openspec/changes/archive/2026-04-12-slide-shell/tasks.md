## 1. Define the SlideId type and state

- [x] 1.1 Add `type SlideId = 'front' | 'welcome' | 'info' | 'program' | 'contact'` at the top of `src/App.tsx`
- [x] 1.2 Add `useState<SlideId>('front')` inside the `App` component (import `useState` from React)

## 2. Switch-based rendering

- [x] 2.1 Replace the `<div>todo</div>` return with a switch expression that renders `<div>{name}</div>` for each of the five slide values
- [x] 2.2 Add an exhaustive guard (e.g., `default` case with `satisfies never` or a `const _: never` check) so the compiler catches missing cases if a new slide is added later

## 3. Verify

- [x] 3.1 Run `pnpm build` — confirm no type errors
- [x] 3.2 Run `pnpm lint:fix` — confirm no lint warnings
