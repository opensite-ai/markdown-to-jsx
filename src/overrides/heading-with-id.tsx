import React from "react";
import { generateHeadingId } from "../utils/slugify";
import { useHeadingId } from "../core/HeadingIdContext";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Custom heading component that supports:
 * - Automatic ID generation from heading text
 * - Custom ID syntax: {#custom-id} (preprocessed by compiler)
 * - Custom className support
 */
export function HeadingWithId({ children, className, level, ...props }: HeadingProps) {
  // Extract text content from children
  const textContent = React.useMemo(() => {
    if (typeof children === "string") {
      return children;
    }
    if (React.isValidElement(children)) {
      const childProps = children.props as any;
      return String(childProps?.children || "");
    }
    if (Array.isArray(children)) {
      return children
        .map((child) => {
          if (typeof child === "string") return child;
          if (React.isValidElement(child)) {
            const childProps = child.props as any;
            return String(childProps?.children || "");
          }
          return "";
        })
        .join("");
    }
    return String(children || "");
  }, [children]);

  // Check if there's a custom ID mapping from preprocessing
  const customId = useHeadingId(textContent);

  // Use custom ID if available, otherwise auto-generate from text
  const headingId = customId || generateHeadingId(textContent);

  // Create props with proper typing
  const headingProps = {
    id: headingId,
    className,
    ...props,
  };

  return React.createElement(`h${level}`, headingProps, children);
}

// Individual heading components
export function H1WithId(props: Omit<HeadingProps, "level">) {
  return <HeadingWithId level={1} {...props} />;
}

export function H2WithId(props: Omit<HeadingProps, "level">) {
  return <HeadingWithId level={2} {...props} />;
}

export function H3WithId(props: Omit<HeadingProps, "level">) {
  return <HeadingWithId level={3} {...props} />;
}

export function H4WithId(props: Omit<HeadingProps, "level">) {
  return <HeadingWithId level={4} {...props} />;
}

export function H5WithId(props: Omit<HeadingProps, "level">) {
  return <HeadingWithId level={5} {...props} />;
}

export function H6WithId(props: Omit<HeadingProps, "level">) {
  return <HeadingWithId level={6} {...props} />;
}
