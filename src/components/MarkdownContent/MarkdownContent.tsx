import type { Components } from 'react-markdown';
import Markdown from 'react-markdown';

const markdownComponents: Components = {
  h1({ children }) {
    return <h1 className="font-display text-2xl text-text mb-4 mt-6">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="font-display text-xl text-text mb-3 mt-5">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="font-display text-lg text-text mb-2 mt-4">{children}</h3>;
  },
  blockquote({ children }) {
    return <blockquote className="pl-4 border-l-2 border-rose my-4 text-subtle italic">{children}</blockquote>;
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        className="text-pine no-underline border-b-2 border-pine"
      >
        {children}
      </a>
    );
  },
  p({ children }) {
    return <p className="mb-4 leading-relaxed">{children}</p>;
  },
};

interface MarkdownContentProps {
  children: string;
}

export default function MarkdownContent({ children }: MarkdownContentProps) {
  return <Markdown components={markdownComponents}>{children}</Markdown>;
}
