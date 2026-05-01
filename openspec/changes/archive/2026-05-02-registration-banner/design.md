## Context

The front door slide (`FrontDoor.tsx`) currently has a heading ("presenterar") followed directly by the door image. There is no mechanism to communicate registration status to visitors. Registration opens 3 maj 2026 kl 20:00 — before that, visitors should see the opening date; after, a direct link to the form.

This is a pure client-side, static site. No server, no SSR. Date logic uses `new Date()` comparison in the browser.

## Goals / Non-Goals

**Goals:**
- Insert a `RegistrationBanner` component between the heading and the door image in `FrontDoor.tsx`
- Banner shows "Anmälan öppnar kl 20:00 den 3 maj" before the deadline
- Banner automatically shows "Anmäl dig här nu" as a link after the deadline, opening in a new tab
- Visual: white background, 3–4° rotation, gold (`text-gold` / `border-gold`) border lines, display font, large text

**Non-Goals:**
- No server-side date logic
- No countdown timer or live updates (a static check at render time is sufficient)
- No animation beyond what Tailwind provides statically

## Decisions

### Client-side date comparison vs. server-driven

The site is hosted on GitHub Pages with no backend. The deadline is hardcoded as `new Date(2026, 4, 3, 20, 0, 0)` (month is 0-indexed: May = 4). This runs once at render. If someone has a wrong system clock, they may see the wrong state — acceptable given the audience and context.

### Rotation via `rotate-[3deg]` Tailwind utility

Tailwind v4 supports arbitrary rotate values inline. Using `rotate-[3deg]` keeps the tilt simple and avoids inline styles. The parent container needs `overflow-hidden` or sufficient padding to absorb the rotated corners.

### Link target `_blank` with `rel="noopener noreferrer"`

Standard security practice for external links in a new tab.

### Placement in layout

The banner sits between the `<div>` containing the heading and the `<div>` containing the door image. It uses `z-20` consistent with surrounding elements.

## Risks / Trade-offs

- [Client clock skew] → Acceptable; the banner is informational, not security-critical
- [Rotation overflow] → Mitigated by adding horizontal padding/margin so rotated corners don't clip against slide edges
- [Font legibility at angle] → Display font (Playwrite IE) is decorative; if legibility is an issue, fall back to `font-body`. For now, `font-display` matches the slide aesthetic.
