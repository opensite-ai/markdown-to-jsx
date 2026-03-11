/**
 * @page-speed/markdown-to-jsx
 *
 * Performance-optimized, tree-shakable React markdown renderer
 * for the DashTrack ecosystem
 */

// Core exports
export { Markdown, compileMarkdown, precompileMarkdown } from "./core";

// Hooks
export { useMarkdown, useMarkdownOptions } from "./hooks";

// Component overrides
export {
  Heading,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Image,
  Link,
  CodeBlock,
  InlineCode,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableDataCell,
  getDefaultOverrides,
} from "./overrides";

// Utilities
export {
  slugify,
  generateHeadingId,
  resetHeadingIds,
  sanitizeUrl,
  isDangerousUrl,
  sanitizeAttributes,
  isDangerousAttribute,
  getDefaultSanitizationConfig,
} from "./utils";

// Type exports
export type {
  MarkdownOptions,
  MarkdownProps,
  OverrideMap,
  MarkdownStylesMap,
  UseMarkdownResult,
} from "./types";

export type {
  HeadingProps,
  ImageProps,
  LinkProps,
  CodeBlockProps,
  TableProps,
} from "./overrides";
