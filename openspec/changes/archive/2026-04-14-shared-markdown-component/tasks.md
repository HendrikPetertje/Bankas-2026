## 1. Create MarkdownContent component

- [x] 1.1 Create `src/components/MarkdownContent/MarkdownContent.tsx` with the `markdownComponents` object (`h1`, `h2`, `h3`, `blockquote`, `a`, `p`) and a `<MarkdownContent>` component that accepts `children: string` and renders `<Markdown components={markdownComponents}>`
- [x] 1.2 Use `import type { Components }` for the react-markdown type import (verbatimModuleSyntax)

## 2. Refactor ForestWelcome

- [x] 2.1 Remove the `markdownComponents` object and the `import type { Components }` / `import Markdown` lines from `ForestWelcome.tsx`
- [x] 2.2 Import `MarkdownContent` from `src/components/MarkdownContent/MarkdownContent.tsx`
- [x] 2.3 Replace `<Markdown components={markdownComponents}>{welcomeContent}</Markdown>` with `<MarkdownContent>{welcomeContent}</MarkdownContent>`

## 3. Refactor MountaintopInfo

- [x] 3.1 Remove the `markdownComponents` object and the `import type { Components }` / `import Markdown` lines from `MountaintopInfo.tsx`
- [x] 3.2 Import `MarkdownContent` from `src/components/MarkdownContent/MarkdownContent.tsx`
- [x] 3.3 Replace `<Markdown components={markdownComponents}>{infoContent}</Markdown>` with `<MarkdownContent>{infoContent}</MarkdownContent>`

## 4. Verification

- [x] 4.1 Run `pnpm build` and fix any type or build errors
- [x] 4.2 Run `pnpm lint:fix` and resolve any remaining warnings
- [x] 4.3 Visually verify that ForestWelcome and MountaintopInfo render markdown identically to before
