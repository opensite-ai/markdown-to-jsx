/**
 * Basic HTML sanitization for markdown content
 * Removes potentially dangerous attributes and protocols
 */

const DANGEROUS_PROTOCOLS = ["javascript:", "data:", "vbscript:"];
const DANGEROUS_ATTRIBUTES = [
  "onerror",
  "onload",
  "onclick",
  "onmouseover",
  "onfocus",
  "onblur",
];

/**
 * Check if a URL uses a dangerous protocol
 */
export function isDangerousUrl(url: string): boolean {
  const lowercaseUrl = url.toLowerCase().trim();
  return DANGEROUS_PROTOCOLS.some((protocol) =>
    lowercaseUrl.startsWith(protocol)
  );
}

/**
 * Sanitize a URL by removing dangerous protocols
 */
export function sanitizeUrl(url: string): string {
  if (isDangerousUrl(url)) {
    return "#";
  }
  return url;
}

/**
 * Check if an attribute name is dangerous
 */
export function isDangerousAttribute(attr: string): boolean {
  return DANGEROUS_ATTRIBUTES.some((dangerous) =>
    attr.toLowerCase().startsWith(dangerous)
  );
}

/**
 * Sanitize HTML attributes by removing dangerous ones
 * This is a basic implementation - for production use, consider DOMPurify
 */
export function sanitizeAttributes(
  attributes: Record<string, any>
): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(attributes)) {
    // Skip dangerous attributes
    if (isDangerousAttribute(key)) {
      continue;
    }

    // Sanitize URL attributes
    if (
      (key === "href" || key === "src") &&
      typeof value === "string" &&
      isDangerousUrl(value)
    ) {
      sanitized[key] = "#";
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Get default sanitization configuration
 */
export function getDefaultSanitizationConfig() {
  return {
    disableParsingRawHTML: false,
    forceBlock: false,
    forceInline: false,
  };
}
