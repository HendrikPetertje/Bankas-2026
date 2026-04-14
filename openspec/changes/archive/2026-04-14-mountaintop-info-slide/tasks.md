## 1. Asset Setup

- [x] 1.1 Create `src/slides/MountaintopInfo/images/` directory and move all image assets from `openspec/input/` into it (dragon.png, fluffy-clouds.png, flock-of-birds.png, main-pic-cutout.png, all overlay/cloud/smoke PNGs)
- [x] 1.2 Resize the three camp photos (`IMG_1029.jpg`, `IMG_8492.jpg`, `IMG_7916.jpg`) to max 600px on the longest edge and place them in `src/slides/MountaintopInfo/images/`
- [x] 1.3 Create `src/slides/MountaintopInfo/slideContent.ts` exporting the camp info markdown text as a string constant

## 2. Content Area (children prop)

- [x] 2.1 Add image imports for dragon, fluffy-clouds, flock-of-birds, and the three camp photos to `MountaintopInfo.tsx`
- [x] 2.2 Define the drifting creatures array (dragon left-to-right via `drift`, clouds and birds right-to-left via `drift-reverse`) with appropriate timing, delays, positions, and max widths
- [x] 2.3 Render the heading "For dig som ska resa in i riket" using the display font
- [x] 2.4 Render the markdown content using `react-markdown` with the same `markdownComponents` overrides as ForestWelcome
- [x] 2.5 Render the three angled camp photos in a horizontal row with slight rotation transforms, matching the ForestWelcome photo strip pattern
- [x] 2.6 Assemble the full children prop: `relative overflow-hidden` wrapper containing drifting creatures, then content div with heading, markdown, and photos

## 3. Picture Area (picture prop) -- Overlay Groups

- [x] 3.1 Add image imports for the main cutout and all overlay PNGs (clouds-1/2, smoke-1/2, overlay-1/2/3)
- [x] 3.2 Implement cloud overlay timer: `useState<boolean>` toggling every 4 seconds with a 1-second CSS opacity transition, crossfading between clouds-1 and clouds-2
- [x] 3.3 Implement smoke overlay timer: `useState<boolean>` toggling every 3 seconds with a 600ms CSS opacity transition, crossfading between smoke-1 and smoke-2
- [x] 3.4 Implement detail overlay timer: `useState<number>` cycling through overlays 1-2-3 with 5s gap, 2s visible, sequential pattern (matching ForestWelcome's `scheduleNext` approach)
- [x] 3.5 Render the picture prop JSX: relative wrapper with main cutout base image, cloud overlays (lowest z), smoke overlays (middle z), detail overlays (highest z), all using `absolute inset-0` and `pointer-events-none`

## 4. Integration and Verification

- [x] 4.1 Wire up the complete `MountaintopInfo` component with both children and picture props passed to the `Slide` wrapper, using `dipFrom="#575279"` (text) and `dipTo="#56949f"` (foam)
- [x] 4.2 Run `pnpm build` and fix any type or build errors
- [x] 4.3 Run `pnpm lint:fix` and resolve any remaining warnings
- [x] 4.4 Visually verify in dev server: heading, markdown text, drifting creatures, angled photos, main cutout with all three overlay groups cycling at their correct timings
