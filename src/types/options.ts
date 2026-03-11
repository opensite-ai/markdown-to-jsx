import type { MarkdownToJSX } from "markdown-to-jsx";
import type { ElementType, ReactNode } from "react";

/**
 * Override map for custom component rendering
 */
export type OverrideMap = Record<string, ElementType>;

/**
 * Map of element names to custom className strings
 * Supports all HTML elements (h1-h6, p, img, iframe, etc.)
 *
 * @example
 * ```tsx
 * markdownStyles={{
 *   h2: 'text-2xl md:text-4xl text-primary',
 *   img: 'shadow-lg rounded-2xl',
 *   iframe: 'aspect-video w-full rounded-2xl shadow-lg my-12'
 * }}
 * ```
 */
export type MarkdownStylesMap = Record<string, string>;

/**
 * Configuration options for markdown rendering
 */
export interface MarkdownOptions extends Omit<MarkdownToJSX.Options, "overrides" | "wrapper"> {
  /**
   * Custom component overrides
   */
  overrides?: OverrideMap;

  /**
   * Custom className mappings for markdown elements
   * Simplifies styling without creating custom components
   *
   * @example
   * ```tsx
   * markdownStyles={{
   *   h2: 'text-3xl font-bold',
   *   img: 'rounded-lg shadow-md',
   *   iframe: 'aspect-video w-full'
   * }}
   * ```
   */
  markdownStyles?: MarkdownStylesMap;

  /**
   * Whether to use default ecosystem overrides
   * @default true
   */
  useDefaults?: boolean;

  /**
   * Enable sanitization of dangerous HTML
   * @default true
   */
  sanitize?: boolean;

  /**
   * Custom className for the wrapper element
   */
  className?: string;

  /**
   * Custom wrapper component (defaults to 'div')
   */
  wrapper?: ElementType | null;
}

/**
 * Props for the Markdown component
 */
export interface MarkdownProps extends MarkdownOptions {
  /**
   * Markdown content to render
   */
  children: string;
}

/**
 * Result from useMarkdown hook
 */
export interface UseMarkdownResult {
  /**
   * Compiled JSX output
   */
  content: ReactNode;

  /**
   * Whether compilation is in progress
   */
  isCompiling: boolean;

  /**
   * Compilation error, if any
   */
  error?: Error;
}
