/**
 * Parses custom ID syntax from markdown headings
 * Supports the {#id} pattern commonly used by AI LLMs and extended markdown
 *
 * @example
 * ```ts
 * parseHeadingId('Hello World {#custom-id}')
 * // Returns: { text: 'Hello World', id: 'custom-id' }
 *
 * parseHeadingId('No ID Here')
 * // Returns: { text: 'No ID Here', id: null }
 * ```
 */
export function parseHeadingId(text: string): { text: string; id: string | null } {
  // Match {#id} pattern at the end of the heading
  const match = text.match(/^(.+?)\s*\{#([a-zA-Z0-9_-]+)\}\s*$/);

  if (match) {
    return {
      text: match[1].trim(),
      id: match[2],
    };
  }

  return {
    text,
    id: null,
  };
}

/**
 * Preprocesses markdown content to extract custom heading IDs
 * and store them for later use during rendering
 *
 * @param markdown - Raw markdown string
 * @returns Object with processed markdown and ID mappings
 */
export function preprocessHeadingIds(markdown: string): {
  processedMarkdown: string;
  headingIds: Map<string, string>;
} {
  const headingIds = new Map<string, string>();

  // Match markdown headings (# through ######)
  const processedMarkdown = markdown.replace(
    /^(#{1,6})\s+(.+?)(?:\s*\{#([a-zA-Z0-9_-]+)\}\s*)?$/gm,
    (match, hashes, text, customId) => {
      if (customId) {
        // Store the mapping of text to custom ID
        const cleanText = text.trim();
        headingIds.set(cleanText, customId);
        // Return heading without the {#id} syntax
        return `${hashes} ${cleanText}`;
      }
      return match;
    }
  );

  return {
    processedMarkdown,
    headingIds,
  };
}
