## 1. Add navigation hint to RegistrationBanner

- [x] 1.1 In `src/slides/FrontDoor/RegistrationBanner.tsx`, add a hint `<p>` beneath the `<a>` link (inside the `isOpen` branch) with Swedish text: "Eller klicka på den glödande dörren nedan för mer info & spel"
- [x] 1.2 Style the hint with `text-sm font-body text-subtle mt-1` (smaller, muted, body font)

## 2. Remove tooltip from FrontDoor

- [x] 2.1 In `src/slides/FrontDoor/FrontDoor.tsx`, delete the `tooltipVisible` useState declaration and its `useEffect` (the 3-second timeout)
- [x] 2.2 Delete the tooltip `<p>` element (lines ~139–144: `Tryck på dörren för att fortsätta`)
- [x] 2.3 Update the `useEffect` and `useState` imports if they are no longer needed (TypeScript will flag unused imports)

## 3. Verify

- [x] 3.1 Run `pnpm build` — no type errors
- [x] 3.2 Run `pnpm lint:fix` — no lint warnings or errors
- [x] 3.3 Visually confirm hint appears below CTA and tooltip is gone
