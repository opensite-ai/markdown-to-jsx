import type { MarkdownToJSX } from "markdown-to-jsx";
import type { ElementType, ReactNode } from "react";

/**
 * Override map for custom component rendering
 */
export type OverrideMap = Record<string, ElementType>;

/**
 * Configuration options for markdown rendering
 */
export interface MarkdownOptions extends Omit<MarkdownToJSX.Options, "overrides" | "wrapper"> {
  /**
   * Custom component overrides
   */
  overrides?: OverrideMap;

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
