import { compiler } from "markdown-to-jsx";
import type { ReactNode } from "react";
import type { MarkdownOptions } from "../types";
import { getDefaultOverrides } from "../overrides/defaults";

/**
 * Compile markdown to JSX with ecosystem defaults
 */
export function compileMarkdown(
  markdown: string,
  options: MarkdownOptions = {}
): ReactNode {
  const {
    overrides: customOverrides = {},
    useDefaults = true,
    wrapper = "div",
    ...restOptions
  } = options;

  // Merge default overrides with custom overrides
  const finalOverrides = useDefaults
    ? { ...getDefaultOverrides(), ...customOverrides }
    : customOverrides;

  // Compile markdown with merged options
  const result = compiler(markdown, {
    wrapper: wrapper as any, // wrapper can be string, ElementType or null
    overrides: finalOverrides as any,
    ...restOptions,
  });

  return result;
}

/**
 * Pre-compile markdown for caching purposes
 * This is useful when you want to compile markdown once and reuse it
 */
export function precompileMarkdown(
  markdown: string,
  options: MarkdownOptions = {}
): () => ReactNode {
  return () => compileMarkdown(markdown, options);
}
