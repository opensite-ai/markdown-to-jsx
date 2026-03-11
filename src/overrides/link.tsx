import React from "react";
import { sanitizeUrl, isDangerousUrl } from "../utils/sanitize";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
}

/**
 * Safe link component with automatic external link handling
 */
export function Link({ href, children, ...props }: LinkProps) {
  // Sanitize the URL
  const safeHref = href ? sanitizeUrl(href) : "#";

  // Determine if this is an external link
  const isExternal = React.useMemo(() => {
    if (!href || isDangerousUrl(href)) return false;

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
