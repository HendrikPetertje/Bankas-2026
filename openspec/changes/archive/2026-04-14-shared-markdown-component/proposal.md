## Why

`ForestWelcome` and `MountaintopInfo` each define an identical `markdownComponents` object (6 overrides: `h1`, `h2`, `h3`, `blockquote`, `a`, `p`) and import `react-markdown` independently. This duplication means any style tweak must be made in multiple places, and future slides will copy the pattern again.

## What Changes

- Extract a new `<MarkdownContent>` component at `src/components/MarkdownContent/MarkdownContent.tsx` that wraps `react-markdown` with the shared `markdownComponents` config defined once.
- Remove the inline `markdownComponents` objects and `react-markdown` imports from `ForestWelcome.tsx` and `MountaintopInfo.tsx`.
- Replace `<Markdown components={markdownComponents}>` calls with `<MarkdownContent>` in both slides.

## Capabilities

### New Capabilities

- `shared-markdown-content`: A `<MarkdownContent>` component that renders a markdown string using the project's standard component overrides (`h1`–`h3`, `blockquote`, `a`, `p`), centralising all markdown styling in one place.

### Modified Capabilities

<!-- No existing spec-level requirements change — this is a refactor with no behaviour change. -->

## Impact

- `src/components/MarkdownContent/MarkdownContent.tsx` — new file
- `src/slides/ForestWelcome/ForestWelcome.tsx` — remove `markdownComponents`, swap import/usage
- `src/slides/MountaintopInfo/MountaintopInfo.tsx` — remove `markdownComponents`, swap import/usage
- No visual or behavioural change; rendered output is identical
