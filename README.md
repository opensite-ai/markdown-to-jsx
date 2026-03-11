# @page-speed/markdown-to-jsx

## A performance-optimized, tree-shakable React markdown renderer for the DashTrack ecosystem. Wraps the lightweight `markdown-to-jsx` library (~6KB gzipped) with ecosystem-specific defaults: pre-configured overrides for `@page-speed/img`, sanitized link handling, prose-aware typography, and zero-CLS rendering. Used by the UI component library for the [OpenSite Semantic Site Builder](https://opensite.ai) platform.

![Opensite Semantic UI](https://octane.cdn.ing/api/v1/images/transform?url=https://cdn.ing/assets/i/r/293694/1ptcuwjb1sxb2pww0g4lcfpevmtb/banner.png&f=webp)

<br />

[![npm version](https://img.shields.io/npm/v/@page-speed/markdown-to-jsx?style=for-the-badge)](https://www.npmjs.com/package/@page-speed/markdown-to-jsx)
[![npm downloads](https://img.shields.io/npm/dm/@page-speed/markdown-to-jsx?style=for-the-badge)](https://www.npmjs.com/package/@page-speed/markdown-to-jsx)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge)](./tsconfig.json)

## Features

- **Performance-first**: Lightweight (~8KB gzipped) with minimal dependencies
- **Tree-shakable**: Import only what you need
- **SSR compatible**: Works with Next.js and other SSR frameworks
- **Type-safe**: Full TypeScript support
- **Secure**: Built-in XSS protection and URL sanitization
- **Customizable**: Easy to override default components
- **Ecosystem integration**: Seamless integration with `@page-speed/img`

## Installation

```bash
npm install @page-speed/markdown-to-jsx
# or
pnpm add @page-speed/markdown-to-jsx
# or
yarn add @page-speed/markdown-to-jsx
```

### Optional Peer Dependencies

For optimized image rendering, install `@page-speed/img`:

```bash
npm install @page-speed/img
```

## Quick Start

### Basic Usage

```tsx
import { Markdown } from "@page-speed/markdown-to-jsx";

function MyComponent() {
  return (
    <Markdown>
      # Hello World

      This is **bold** and this is *italic*.

      [Link](https://example.com)
    </Markdown>
  );
}
```

### With Custom Styling

```tsx
<Markdown className="prose prose-lg">
  # Styled Markdown

  Your content here...
</Markdown>
```

### Using the Hook

```tsx
import { useMarkdown } from "@page-speed/markdown-to-jsx/hooks";

function MyComponent() {
  const { content } = useMarkdown("# Hello from hook!");

  return <div>{content}</div>;
}
```

## API

### `<Markdown>` Component

Primary component for rendering markdown content.

```tsx
interface MarkdownProps {
  children: string;
  className?: string;
  wrapper?: string | ComponentType<any>;
  overrides?: OverrideMap;
  useDefaults?: boolean;
  sanitize?: boolean;
}
```

**Props:**

- `children` (required): Markdown string to render
- `className`: Custom CSS class for the wrapper element
- `wrapper`: Custom wrapper component (defaults to `'div'`)
- `overrides`: Custom component overrides
- `useDefaults`: Enable default ecosystem overrides (default: `true`)
- `sanitize`: Enable HTML sanitization (default: `true`)

### `useMarkdown` Hook

Hook for compiling markdown to JSX.

```tsx
function useMarkdown(
  markdown: string,
  options?: MarkdownOptions
): UseMarkdownResult
```

**Returns:**

```tsx
interface UseMarkdownResult {
  content: ReactNode;
  isCompiling: boolean;
  error?: Error;
}
```

### `useMarkdownOptions` Hook

Hook for merging custom options with defaults.

```tsx
function useMarkdownOptions(
  options?: MarkdownOptions
): MarkdownOptions
```

## Custom Overrides

You can override any HTML element with a custom React component:

```tsx
import { Markdown } from "@page-speed/markdown-to-jsx";

const CustomH1 = ({ children, ...props }) => (
  <h1 className="text-4xl font-bold text-blue-600" {...props}>
    {children}
  </h1>
);

function MyComponent() {
  return (
    <Markdown overrides={{ h1: CustomH1}}>
      # Custom Heading Style
    </Markdown>
  );
}
```

### Default Overrides

The library includes these default overrides:

- **Headings** (`h1-h6`): Auto-generated IDs for anchor links
- **Images** (`img`): Integration with `@page-speed/img` for optimized loading
- **Links** (`a`): Automatic external link handling with security attributes
- **Code blocks** (`pre`, `code`): Language detection and syntax highlighting support
- **Tables**: Responsive table wrapper

## Tree-Shakable Imports

Import only what you need for optimal bundle size:

```tsx
// Import individual components
import { H1, H2 } from "@page-speed/markdown-to-jsx/overrides";

// Import specific utilities
import { slugify } from "@page-speed/markdown-to-jsx/utils";

// Import hooks
import { useMarkdown } from "@page-speed/markdown-to-jsx/hooks";
```

## Utilities

### Slugification

```tsx
import { slugify, generateHeadingId } from "@page-speed/markdown-to-jsx/utils";

const slug = slugify("Hello World"); // "hello-world"
const id = generateHeadingId("Introduction"); // "introduction"
```

### Sanitization

```tsx
import { sanitizeUrl, sanitizeAttributes } from "@page-speed/markdown-to-jsx/utils";

const safeUrl = sanitizeUrl("javascript:alert('XSS')"); // "#"
const safeAttrs = sanitizeAttributes({ onclick: "alert('XSS')" }); // {}
```

## Examples

### Blog Post Rendering

```tsx
import { Markdown } from "@page-speed/markdown-to-jsx";

function BlogPost({ content }) {
  return (
    <article className="prose prose-lg max-w-none">
      <Markdown>{content}</Markdown>
    </article>
  );
}
```

### Documentation Page

```tsx
import { Markdown } from "@page-speed/markdown-to-jsx";

function DocsPage({ markdown }) {
  return (
    <div className="documentation">
      <Markdown
        className="docs-content"
        overrides={{
          h1: ({ children }) => (
            <h1 className="docs-heading-1">{children}</h1>
          ),
          code: ({ children }) => (
            <code className="docs-code">{children}</code>
          ),
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
```

### Dynamic Content

```tsx
import { useMarkdown } from "@page-speed/markdown-to-jsx/hooks";

function DynamicContent({ markdownSource }) {
  const { content, isCompiling, error } = useMarkdown(markdownSource);

  if (isCompiling) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{content}</div>;
}
```

## Performance

- **Bundle size**: ~8KB gzipped (base library)
- **Tree-shakable**: Import only what you need
- **Memoized**: Automatic memoization prevents unnecessary re-renders
- **Zero runtime overhead**: Pre-compiled components

## Security

The library includes built-in security features:

- XSS protection through URL sanitization
- Dangerous protocol detection (`javascript:`, `data:`, `vbscript:`)
- Event handler attribute stripping
- Safe external link handling with `rel="noopener noreferrer"`

## TypeScript

Full TypeScript support with comprehensive type definitions:

```tsx
import type {
  MarkdownProps,
  MarkdownOptions,
  OverrideMap
} from "@page-speed/markdown-to-jsx";
```

## License

MIT

## Contributing

See [BUILD_GUIDE.md](./BUILD_GUIDE.md) for development instructions.

## Repository

https://github.com/opensite-ai/markdown-to-jsx
