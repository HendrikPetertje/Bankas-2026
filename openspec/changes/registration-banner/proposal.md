## Why

The front door slide needs to communicate the registration opening date to visitors before sign-ups go live, and then seamlessly transition to a direct registration link once registration opens (3 maj 2026 kl 20:00). This avoids manual site updates and ensures visitors always see the correct state.

## What Changes

- New `RegistrationBanner` component added between the "presenterar" text and the door picture on the front door slide
- Banner displays "Anmälan öppnar kl 20:00 den 3 maj" before the deadline
- After 3 maj 2026 20:00, the banner automatically switches to "Anmäl dig här nu" as a link to the registration form
- Visual style: white background, slight 3–4 degree rotation, gold (`gold`) border lines in the Rose Pine Dawn palette, display font, large text

## Capabilities

### New Capabilities

- `registration-banner`: A time-aware banner component on the front door slide that shows a countdown message before registration opens and a registration link after.

### Modified Capabilities

- `front-door-slide`: The front door slide layout is updated to include the new banner between the "presenterar" heading and the door picture.

## Impact

- `src/slides/FrontDoor/FrontDoor.tsx` (or equivalent) — layout change
- New file: `src/slides/FrontDoor/RegistrationBanner.tsx`
- No new dependencies, no router changes, no API calls
- Pure client-side date comparison using `new Date()`
