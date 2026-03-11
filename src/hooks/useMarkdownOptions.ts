import { useMemo } from "react";
import type { MarkdownOptions, OverrideMap } from "../types";
import { getDefaultOverrides } from "../overrides/defaults";

/**
 * Hook for merging custom markdown options with defaults
 *
 * @param options - Custom markdown options
 * @returns Merged options with defaults
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const options = useMarkdownOptions({
 *     overrides: {
 *       h1: MyCustomH1,
 *     },
 *   });
 *
 *   return <Markdown {...options}># Hello</Markdown>;
 * }
 * ```
 */
export function useMarkdownOptions(
  options: MarkdownOptions = {}
): MarkdownOptions {
  const {
    overrides: customOverrides = {},
    useDefaults = true,
    ...restOptions
  } = options;

  // Memoize the merged overrides
  const mergedOverrides = useMemo<OverrideMap>(() => {
    if (!useDefaults) {
      return customOverrides;
    }

    return {
      ...getDefaultOverrides(),
      ...customOverrides,
    };
  }, [customOverrides, useDefaults]);

  // Return merged options
  return useMemo(
    () => ({
      ...restOptions,
      overrides: mergedOverrides,
      useDefaults,
    }),
    [mergedOverrides, restOptions, useDefaults]
  );
}
