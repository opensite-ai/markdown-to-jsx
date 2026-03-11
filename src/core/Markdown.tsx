import React from "react";
import type { MarkdownProps } from "../types";
import { compileMarkdown } from "./MarkdownCompiler";

/**
 * Primary Markdown component for rendering markdown content
 *
 * @example
 * ```tsx
 * <Markdown>
 *   # Hello World
 *   This is **bold** and this is *italic*.
 * </Markdown>
 * ```
 *
 * @example With custom overrides
 * ```tsx
 * <Markdown
 *   overrides={{
 *     h1: ({ children }) => <h1 className="custom-heading">{children}</h1>
 *   }}
 * >
 *   # Custom Heading
 * </Markdown>
 * ```
 */
export function Markdown({
  children,
  className,
  overrides,
  useDefaults = true,
  wrapper = "div",
  ...options
}: MarkdownProps) {
  // Memoize the compiled output to avoid re-compilation on every render
  const compiled = React.useMemo(
    () =>
      compileMarkdown(children, {
        overrides,
        useDefaults,
        wrapper,
        ...options,
      }),
    [children, overrides, useDefaults, wrapper, options]
  );

  // Apply className if provided and wrapper is a string and result is a ReactElement
  if (className && typeof wrapper === "string" && React.isValidElement(compiled)) {
    return React.cloneElement(compiled, {
      className: compiled.props.className
        ? `${compiled.props.className} ${className}`
        : className,
    } as any);
  }

  return <>{compiled}</>;
}

// Display name for debugging
Markdown.displayName = "Markdown";
