import React from "react";
import { sanitizeUrl, isDangerousUrl } from "../utils/sanitize";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
}

// Try to load Pressable at module level (optional peer dependency)
let Pressable: any = null;
try {
  const pressableModule = require("@page-speed/pressable");
  Pressable = pressableModule.Pressable;
} catch {
  // Pressable not available - will use fallback
}

/**
 * Safe link component with automatic external link handling and URL normalization.
 * Uses @page-speed/pressable when available for enhanced link functionality including:
 * - Phone number normalization (tel: links)
 * - Email normalization (mailto: links)
 * - Internal/external link detection
 * - Automatic target and rel attributes
 */
export function Link({ href, children, ...props }: LinkProps) {
  // Sanitize the URL
  const safeHref = href ? sanitizeUrl(href) : "#";

  // Check if href is dangerous
  if (isDangerousUrl(safeHref)) {
    return <span {...props}>{children}</span>;
  }

  // Don't use Pressable for placeholder links ("#") - render basic link
  const isPlaceholder = safeHref === "#";

  // Use Pressable if available (provides phone/email normalization and enhanced navigation)
  // but not for placeholder links which should remain as-is
  if (Pressable && !isPlaceholder) {
    return (
      <Pressable href={safeHref} {...props}>
        {children}
      </Pressable>
    );
  }

  // Fallback to basic link logic if Pressable not available
  const isExternal = React.useMemo(() => {
    if (!href) return false;

    try {
      // Check if it's an absolute URL
      const url = new URL(href, window.location.href);
      return url.origin !== window.location.origin;
    } catch {
      // Relative URLs are internal
      return false;
    }
  }, [href]);

  // Add security attributes for external links
  const externalProps = isExternal
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a href={safeHref} {...externalProps} {...props}>
      {children}
    </a>
  );
}
