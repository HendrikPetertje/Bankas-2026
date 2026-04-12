## ADDED Requirements

### Requirement: Rose Pine Dawn color palette is configured in Tailwind
The Tailwind theme SHALL define all 15 Rose Pine Dawn colors as custom color tokens using a `@theme` block in `src/index.css`. Token names SHALL match their palette role names: `base`, `surface`, `overlay`, `muted`, `subtle`, `text`, `love`, `gold`, `rose`, `pine`, `foam`, `iris`, `highlight-low`, `highlight-med`, `highlight-high`.

#### Scenario: All Dawn palette colors available as utilities
- **WHEN** using Tailwind utility classes
- **THEN** classes like `bg-base`, `text-pine`, `border-highlight-high` resolve to their corresponding Rose Pine Dawn hex values

#### Scenario: Correct hex values
- **WHEN** inspecting the `@theme` block in `src/index.css`
- **THEN** the following mappings exist:
  - `--color-base: #faf4ed`
  - `--color-surface: #fffaf3`
  - `--color-overlay: #f2e9e1`
  - `--color-muted: #9893a5`
  - `--color-subtle: #797593`
  - `--color-text: #575279`
  - `--color-love: #b4637a`
  - `--color-gold: #ea9d34`
  - `--color-rose: #d7827e`
  - `--color-pine: #286983`
  - `--color-foam: #56949f`
  - `--color-iris: #907aa9`
  - `--color-highlight-low: #f4ede8`
  - `--color-highlight-med: #dfdad9`
  - `--color-highlight-high: #cecacd`

### Requirement: Extra project colors are configured
Two additional color tokens SHALL be defined in the Tailwind theme alongside the Dawn palette: `earth` (`#312b1d`) for underground/cave backgrounds, and `edge-light` (`#fafafa`) for image edge fades.

#### Scenario: Extra colors available
- **WHEN** using Tailwind utility classes
- **THEN** `bg-earth` resolves to `#312b1d`
- **AND** `bg-edge-light` resolves to `#fafafa`

### Requirement: Nunito is the body font
The `@fontsource-variable/nunito` package SHALL be installed. The font SHALL be imported in `src/index.css`. A Tailwind font-family token `--font-body` SHALL be defined mapping to `'Nunito Variable', sans-serif`. The `body` element SHALL use this font by default.

#### Scenario: Nunito package installed
- **WHEN** inspecting `package.json`
- **THEN** `@fontsource-variable/nunito` is listed as a dependency

#### Scenario: Body text uses Nunito
- **WHEN** inspecting the rendered page
- **THEN** body text renders in the Nunito Variable font family
- **AND** falls back to `sans-serif` if unavailable

#### Scenario: Tailwind utility available
- **WHEN** using the class `font-body`
- **THEN** the element's font-family is set to `'Nunito Variable', sans-serif`

### Requirement: Playwrite Ireland is the display and emphasis font
The `@fontsource-variable/playwrite-ie` package SHALL be installed. The font SHALL be imported in `src/index.css`. A Tailwind font-family token `--font-display` SHALL be defined mapping to `'Playwrite IE Variable', cursive`. Playwrite Ireland is a handwritten font that naturally appears cursive at all weights — it SHALL NOT be applied via `font-style: italic`. It is used in two roles:

1. **Display**: headings and decorative text use `font-display` directly.
2. **Emphasis**: when italic/emphasis (`<em>`, `<i>`) appears within body text (Nunito), the font-family SHALL swap to Playwrite Ireland at the same size and weight as the surrounding text, instead of using a slanted Nunito italic. A CSS rule SHALL set `em, i { font-family: var(--font-display); font-style: normal; }`.

#### Scenario: Playwrite IE package installed
- **WHEN** inspecting `package.json`
- **THEN** `@fontsource-variable/playwrite-ie` is listed as a dependency

#### Scenario: Tailwind utility available
- **WHEN** using the class `font-display`
- **THEN** the element's font-family is set to `'Playwrite IE Variable', cursive`

#### Scenario: Emphasis text uses Playwrite Ireland instead of italic Nunito
- **WHEN** an `<em>` or `<i>` element appears inside body text
- **THEN** the element renders in Playwrite Ireland at `font-style: normal`
- **AND** the font size and weight match the surrounding body text

### Requirement: Base styles apply fonts and background
The `src/index.css` file SHALL set the default `body` background to `--color-base` and default text color to `--color-text`. The default font-family on `body` SHALL be the body font (Nunito).

#### Scenario: Default page appearance
- **WHEN** the page loads with no additional classes
- **THEN** the background color is `#faf4ed` (Rose Pine Dawn base)
- **AND** the text color is `#575279` (Rose Pine Dawn text)
- **AND** the font is Nunito Variable
