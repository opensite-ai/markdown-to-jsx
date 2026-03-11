/**
 * Convert a string to a URL-safe slug for heading IDs
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Generate a unique ID for a heading, with collision tracking
 */
const usedIds = new Set<string>();

export function generateHeadingId(text: string, resetTracking = false): string {
  if (resetTracking) {
    usedIds.clear();
  }

  const baseSlug = slugify(text);
  let slug = baseSlug;
  let counter = 1;

  while (usedIds.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  usedIds.add(slug);
  return slug;
}

/**
 * Reset heading ID tracking (useful for testing or new renders)
 */
export function resetHeadingIds(): void {
  usedIds.clear();
}
