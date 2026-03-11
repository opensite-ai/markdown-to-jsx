import React from "react";

/**
 * Context for sharing custom heading ID mappings
 * Maps heading text to custom IDs extracted from {#id} syntax
 */
export const HeadingIdContext = React.createContext<Map<string, string>>(new Map());

/**
 * Provider component for heading ID mappings
 */
export function HeadingIdProvider({
  children,
  headingIds,
}: {
  children: React.ReactNode;
  headingIds: Map<string, string>;
}) {
  return (
    <HeadingIdContext.Provider value={headingIds}>
      {children}
    </HeadingIdContext.Provider>
  );
}

/**
 * Hook to access custom heading ID for a given text
 */
export function useHeadingId(text: string): string | null {
  const headingIds = React.useContext(HeadingIdContext);
  return headingIds.get(text) || null;
}
