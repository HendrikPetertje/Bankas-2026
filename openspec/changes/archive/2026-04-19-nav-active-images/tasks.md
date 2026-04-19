## 1. Asset Preparation

- [x] 1.1 Resize `openspec/input/door-button-active.png` to 80×80 → `src/components/SlideNav/images/door-button-active.png` (`sips -z 80 80`)
- [x] 1.2 Resize `openspec/input/forest button-active.png` to 80×80 → `src/components/SlideNav/images/forest-button-active.png`
- [x] 1.3 Resize `openspec/input/mountain-button-active.png` to 80×80 → `src/components/SlideNav/images/mountain-button-active.png`
- [x] 1.4 Resize `openspec/input/field-button-active.png` to 80×80 → `src/components/SlideNav/images/field-button-active.png`
- [x] 1.5 Resize `openspec/input/city-button-active.png` to 80×80 → `src/components/SlideNav/images/city-button-active.png`
- [x] 1.6 Resize `openspec/input/door-button-active.png` to 200×200 → `src/components/SlideNav/images/lg-door-button-active.png`
- [x] 1.7 Resize `openspec/input/forest button-active.png` to 200×200 → `src/components/SlideNav/images/lg-forest-button-active.png`
- [x] 1.8 Resize `openspec/input/mountain-button-active.png` to 200×200 → `src/components/SlideNav/images/lg-mountain-button-active.png`
- [x] 1.9 Resize `openspec/input/field-button-active.png` to 200×200 → `src/components/SlideNav/images/lg-field-button-active.png`
- [x] 1.10 Resize `openspec/input/city-button-active.png` to 200×200 → `src/components/SlideNav/images/lg-city-button-active.png`

## 2. Update SlideNav.tsx

- [x] 2.1 Import the 5 active images (`door-button-active.png` … `city-button-active.png`)
- [x] 2.2 Add `activeSrc: string` field to `SLIDE_BUTTONS` entries, populated with the new imports
- [x] 2.3 Update the `DockItem` type to include `activeSrc?: string`
- [x] 2.4 In the items array mapping, set `activeSrc` on each slide button item
- [x] 2.5 In the render, change `src={item.src}` to `src={item.isActive && item.activeSrc ? item.activeSrc : item.src}`
- [x] 2.6 Remove the `brightness-110 contrast-110` / `brightness-95 contrast-95` conditional class from the button, keeping only `hover:brightness-90`

## 3. Update MobileMapOverlay.tsx

- [x] 3.1 Import the 5 lg- active images (`lg-door-button-active.png` … `lg-city-button-active.png`)
- [x] 3.2 Add `activeSrc: string` to the `SLIDE_BUTTONS` entries in MobileMapOverlay
- [x] 3.3 In the render, swap `src={btn.src}` to `src={activeSlide === btn.id ? btn.activeSrc : btn.src}`
- [x] 3.4 Remove the `brightness-110 contrast-110` / `brightness-95 contrast-95` conditional class, keeping `hover:brightness-90`

## 4. Update Preloader

- [x] 4.1 Add imports for all 10 active images in `src/App.tsx`
- [x] 4.2 Add all 10 to the `PRELOAD_ASSETS` array under a `// SlideNav active` comment

## 5. Verify

- [x] 5.1 Run `pnpm build` and fix any type or build errors
- [x] 5.2 Run `pnpm lint:fix` and fix any lint warnings
