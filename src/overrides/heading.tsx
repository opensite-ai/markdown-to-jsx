import React from "react";
import { generateHeadingId } from "../utils/slugify";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
}

/**
 * Heading component with automatic ID generation for anchor links
 */
export function Heading({ level, children, id, ...props }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  // Generate ID from text content if not provided
  const generatedId = React.useMemo(() => {
    if (id) return id;

    // Extract text content from children
    const textContent =
      typeof children === "string"
        ? children
        : React.Children.toArray(children)
            .filter((child) => typeof child === "string")
            .join("");

    return textContent ? generateHeadingId(textContent) : undefined;
  }, [children, id]);

  return (
    <Tag id={generatedId} {...props}>
      {children}
    </Tag>
  );
}

// Create individual heading components
export const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading level={1} {...props} />
);

export const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading level={2} {...props} />
);

export const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading level={3} {...props} />
);

export const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading level={4} {...props} />
);

export const H5 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading level={5} {...props} />
);

export const H6 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading level={6} {...props} />
);
