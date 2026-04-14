## ADDED Requirements

### Requirement: MarkdownContent component renders markdown with project styles

A `<MarkdownContent>` component SHALL exist at `src/components/MarkdownContent/MarkdownContent.tsx`. It SHALL accept a single `children` prop of type `string` and render it via `react-markdown` using the project's standard element overrides.

The component SHALL NOT add any wrapping HTML element — it renders the `react-markdown` output directly. Layout wrapping is the responsibility of the call site.

#### Scenario: Renders a paragraph

- **WHEN** `<MarkdownContent>` receives a string with a paragraph
- **THEN** the paragraph is rendered as a `<p>` with classes `mb-4 leading-relaxed`

#### Scenario: Renders headings with display font

- **WHEN** the markdown string contains `# Heading`, `## Heading`, or `### Heading`
- **THEN** `h1` renders with `font-display text-2xl text-text mb-4 mt-6`
- **THEN** `h2` renders with `font-display text-xl text-text mb-3 mt-5`
- **THEN** `h3` renders with `font-display text-lg text-text mb-2 mt-4`

#### Scenario: Renders a blockquote

- **WHEN** the markdown string contains a `>` blockquote
- **THEN** the blockquote renders with `pl-4 border-l-2 border-rose my-4 text-subtle italic`

#### Scenario: Renders a link

- **WHEN** the markdown string contains a `[text](url)` link
- **THEN** the anchor renders with `text-pine no-underline border-b-2 border-pine`

### Requirement: Slides use MarkdownContent instead of inline react-markdown

`ForestWelcome` and `MountaintopInfo` SHALL import `<MarkdownContent>` from `src/components/MarkdownContent/MarkdownContent.tsx` and use it in place of their previous inline `<Markdown components={markdownComponents}>` calls.

Neither slide SHALL import `react-markdown` or define a `markdownComponents` object directly.

#### Scenario: ForestWelcome renders markdown via MarkdownContent

- **WHEN** the ForestWelcome slide renders
- **THEN** the markdown content is rendered via `<MarkdownContent>` with identical visual output to before

#### Scenario: MountaintopInfo renders markdown via MarkdownContent

- **WHEN** the MountaintopInfo slide renders
- **THEN** the markdown content is rendered via `<MarkdownContent>` with identical visual output to before
