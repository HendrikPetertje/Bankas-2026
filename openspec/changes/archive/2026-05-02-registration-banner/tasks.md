## 1. Create RegistrationBanner component

- [x] 1.1 Create `src/slides/FrontDoor/RegistrationBanner.tsx` with a hardcoded deadline of `new Date(2026, 4, 3, 20, 0, 0)`
- [x] 1.2 Render pre-registration text "Anmälan öppnar kl 20:00 den 3 maj" when before deadline
- [x] 1.3 Render "Anmäl dig här nu" as an `<a>` link to the registration form when on or after deadline, with `target="_blank" rel="noopener noreferrer"`
- [x] 1.4 Style the banner: white background (`bg-white`), `rotate-[3deg]`, gold border top and bottom (`border-t-2 border-b-2 border-gold`), display font (`font-display`), large text (`text-2xl` or larger), horizontal padding and margin to prevent clipped corners

## 2. Integrate into FrontDoor

- [x] 2.1 Import `RegistrationBanner` in `FrontDoor.tsx`
- [x] 2.2 Place `<RegistrationBanner />` between the heading `<div>` and the door image `<div>` in the layout

## 3. Verify

- [x] 3.1 Run `pnpm build && pnpm lint:fix` and confirm no errors
- [x] 3.2 Visually confirm the banner renders correctly between heading and door image
- [x] 3.3 Manually test both states by temporarily adjusting the deadline date in the component
