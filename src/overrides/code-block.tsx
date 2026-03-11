import React from "react";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Code block component with language detection
 */
export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  // Extract language from className (e.g., "language-javascript")
  const language = React.useMemo(() => {
    if (!className) return null;
    const match = className.match(/language-(\w+)/);
    return match ? match[1] : null;
  }, [className]);

  return (
    <pre className={className} data-language={language} {...props}>
      <code>{children}</code>
    </pre>
  );
}

/**
 * Inline code component
 */
export function InlineCode({ children, ...props }: CodeBlockProps) {
  return <code {...props}>{children}</code>;
}
