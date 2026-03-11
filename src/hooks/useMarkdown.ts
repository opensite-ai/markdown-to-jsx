import { useMemo, useState } from "react";
import type { MarkdownOptions, UseMarkdownResult } from "../types";
import { compileMarkdown } from "../core/MarkdownCompiler";

/**
 * Hook for compiling markdown to JSX
 *
 * @param markdown - The markdown string to compile
 * @param options - Markdown compilation options
 * @returns Compiled JSX content with compilation state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { content, isCompiling } = useMarkdown("# Hello World");
 *   return <div>{content}</div>;
 * }
 * ```
 */
export function useMarkdown(
  markdown: string,
  options: MarkdownOptions = {}
): UseMarkdownResult {
  const [error, setError] = useState<Error | undefined>(undefined);

  const content = useMemo(() => {
    try {
      setError(undefined);
      const result = compileMarkdown(markdown, options);
      return result;
    } catch (err) {
      const compilationError =
        err instanceof Error ? err : new Error(String(err));
      setError(compilationError);
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown, JSON.stringify(options)]);

  return {
    content,
    isCompiling: false,
    error,
  };
}
