## 1. Assets

- [x] 1.1 Copy `openspec/input/forest-mouse-over-overlay.png` to `src/slides/ForestWelcome/images/forest-mouse-over-overlay.png`
- [x] 1.2 Copy `openspec/input/mountain-mouse-over-overlay.png` to `src/slides/MountaintopInfo/images/mountain-mouse-over-overlay.png`
- [x] 1.3 Copy `openspec/input/plains-mouse-over-overlay.png` to `src/slides/PlainsProgram/images/plains-mouse-over-overlay.png`

## 2. ForestWelcome

- [x] 2.1 Import `forest-mouse-over-overlay.png` in the ForestWelcome picture component
- [x] 2.2 Wrap the picture image in a `relative` container
- [x] 2.3 Add the hover overlay `<img>` absolutely positioned over the picture (full size, `opacity-0` default, `transition-opacity duration-300`)
- [x] 2.4 Add the percentage-based click-target `<div>` (top 5%, left 30%, width 25%, height 25%) with `onMouseEnter`, `onMouseLeave`, and `onClick` handlers
- [x] 2.5 Wire `onClick` to call `onNavigate('info')` and keep the overlay visible once clicked
- [x] 2.6 Add the delayed tooltip "Klicka på berget för att fortsätta" below the picture (`opacity-0` on mount, transitions to `opacity-1` after 3 seconds)
- [x] 2.7 Run `pnpm build && pnpm lint:fix` and fix any errors

## 3. MountaintopInfo

- [x] 3.1 Import `mountain-mouse-over-overlay.png` in the MountaintopInfo picture component
- [x] 3.2 Wrap the picture image in a `relative` container (if not already)
- [x] 3.3 Add the hover overlay `<img>` absolutely positioned over the picture (full size, `opacity-0` default, `transition-opacity duration-300`)
- [x] 3.4 Add the percentage-based click-target `<div>` (top 45%, left 47%, width 15%, height 20%) with `onMouseEnter`, `onMouseLeave`, and `onClick` handlers
- [x] 3.5 Wire `onClick` to call `onNavigate('program')` and keep the overlay visible once clicked
- [x] 3.6 Add the delayed tooltip "Klicka på gräsängarna för att fortsätta." below the picture (`opacity-0` on mount, transitions to `opacity-1` after 3 seconds)
- [x] 3.7 Run `pnpm build && pnpm lint:fix` and fix any errors

## 4. PlainsProgram

- [x] 4.1 Import `plains-mouse-over-overlay.png` in the PlainsProgram picture component
- [x] 4.2 Wrap the picture image in a `relative` container (if not already)
- [x] 4.3 Add the hover overlay `<img>` absolutely positioned over the picture (full size, `opacity-0` default, `transition-opacity duration-300`)
- [x] 4.4 Add the percentage-based click-target `<div>` (top 6%, left 22%, width 22%, height 28%) with `onMouseEnter`, `onMouseLeave`, and `onClick` handlers
- [x] 4.5 Wire `onClick` to call `onNavigate('contact')` and keep the overlay visible once clicked
- [x] 4.6 Add the delayed tooltip "Klicka på stadsslottet för att fortsätta." below the picture (`opacity-0` on mount, transitions to `opacity-1` after 3 seconds)
- [x] 4.7 Run `pnpm build && pnpm lint:fix` and fix any errors

## 5. Verification

- [x] 5.1 Verify forest hover region reveals overlay and navigates to the info slide
- [x] 5.2 Verify mountain hover region reveals overlay and navigates to the program slide
- [x] 5.3 Verify plains hover region reveals overlay and navigates to the contact slide
- [x] 5.4 Verify all three tooltips are hidden on mount and fade in after 3 seconds
- [x] 5.5 Verify overlay persists after click (does not flicker back to invisible during transition)
- [x] 5.6 Final `pnpm build && pnpm lint:fix` — build and lint pass clean
