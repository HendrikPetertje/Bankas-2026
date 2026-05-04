## Context

The front slide (`FrontDoor.tsx`) has a `RegistrationBanner` component that shows "Anmäl dig här nu" as a link. Below the door image there is a tooltip (`<p>Tryck på dörren för att fortsätta</p>`) that fades in after 3 seconds — users are missing it, and in context it is redundant once a clearer hint is placed near the banner.

The change is self-contained to two files: `RegistrationBanner.tsx` (add hint subtitle) and `FrontDoor.tsx` (remove tooltip paragraph).

## Goals / Non-Goals

**Goals:**
- Add a Swedish hint subtitle beneath "Anmäl dig här nu" in a slightly smaller font, directing users to click the glowing door.
- Remove the delayed tooltip paragraph under the door image.

**Non-Goals:**
- Changes to any slide other than FrontDoor.
- Modifying the door animation or click behaviour.
- Touching the countdown / pre-open state of the banner.

## Decisions

**Where to place the hint text**

Option A: Inside `RegistrationBanner` — keeps the banner self-contained and the hint visually tied to the CTA. Chosen.

Option B: In `FrontDoor` between banner and door — requires prop drilling or separate component, adds indirection.

**Font sizing**

The CTA uses `font-display text-2xl`. The hint SHALL use `text-sm` (or `text-base`) in `font-body` with `text-subtle` colour — slightly smaller, readable, and visually subordinate without being tiny.

**Tooltip removal**

The `<p>` tooltip at line 139–144 in `FrontDoor.tsx` (plus the `tooltipVisible` state and its `useEffect`) can be deleted entirely. The hint in the banner replaces its communicative purpose.

## Risks / Trade-offs

- [Hint only visible when registration is open] The hint sits inside the `isOpen` branch. When registration is closed, users still see the door but no hint. Acceptable — the door's glow and the existing layout are enough before registration opens, and the hint's primary value is when the CTA competes for attention.
- [Tooltip state cleanup] Removing `tooltipVisible` state and its `useEffect` reduces code. `useState` import may become unused — TypeScript build will catch this; update the import accordingly.
