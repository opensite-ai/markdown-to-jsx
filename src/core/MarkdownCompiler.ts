import { compiler } from "markdown-to-jsx";
import React, { type ReactNode, type ElementType } from "react";
import type { MarkdownOptions, MarkdownStylesMap } from "../types";
import { getDefaultOverrides } from "../overrides/defaults";
import { HeadingIdProvider } from "./HeadingIdContext";
import { HeadingWithId } from "../overrides/heading-with-id";
import { slugify as defaultSlugify } from "../utils/slugify";

/**
 * Preprocesses markdown to extract custom heading IDs using {#id} syntax
 * Returns processed markdown without {#id} and a map of IDs
 */
function preprocessMarkdownHeadings(markdown: string): {
  processedMarkdown: string;
  headingIds: Map<string, string>;
} {
  const headingIds = new Map<string, string>();

  // Match markdown headings with optional {#id} syntax
  const processedMarkdown = markdown.replace(
    /^(#{1,6})\s+(.+?)(?:\s*\{#([a-zA-Z0-9_-]+)\}\s*)?$/gm,
    (match, hashes, text, customId) => {
      const cleanText = text.trim();
      if (customId) {
        // Store the custom ID mapping
        headingIds.set(cleanText, customId);
        // Return heading without the {#id} syntax
        return `${hashes} ${cleanText}`;
      }
      return match;
    }
  );

  return { processedMarkdown, headingIds };
}

/**
 * Creates heading components with custom ID support and optional className
 */
function createHeadingWithClassName(level: 1 | 2 | 3 | 4 | 5 | 6, customClassName?: string) {
  return function HeadingComponent(props: any) {
    const { className: propsClassName, ...rest } = props;

    // Merge custom className from markdownStyles with any className passed by markdown-to-jsx
    const finalClassName = customClassName
      ? propsClassName
        ? `${propsClassName} ${customClassName}`
        : customClassName
      : propsClassName;

    return React.createElement(HeadingWithId, {
      level,
      className: finalClassName,
      ...rest,
    });
  };
}

/**
 * Creates override objects with className props from markdownStyles
 */
function createStyleOverrides(
  markdownStyles: MarkdownStylesMap,
  baseOverrides: Record<string, ElementType>
): Record<string, any> {
  const styleOverrides: Record<string, any> = {};

  for (const [element, className] of Object.entries(markdownStyles)) {
    // Special handling for headings to preserve ID functionality
    if (element.match(/^h[1-6]$/)) {
      const level = parseInt(element[1]) as 1 | 2 | 3 | 4 | 5 | 6;
      styleOverrides[element] = createHeadingWithClassName(level, className);
    } else {
      const BaseComponent = baseOverrides[element];

      if (BaseComponent) {
        // If we have a base component, wrap it with className
        styleOverrides[element] = {
          component: BaseComponent,
          props: { className },
        };
      } else {
        // Create a simple wrapper that adds className to the default element
        styleOverrides[element] = {
          component: (props: any) =>
            React.createElement(element, { ...props, className }),
        };
      }
    }
  }

  return styleOverrides;
}

/**
 * Compile markdown to JSX with ecosystem defaults
 */
export function compileMarkdown(
  markdown: string,
  options: MarkdownOptions = {}
): ReactNode {
  const {
    overrides: customOverrides = {},
    markdownStyles = {},
    useDefaults = true,
    wrapper = "div",
    ...restOptions
  } = options;

  // Preprocess heading IDs from {#id} syntax
  const { processedMarkdown, headingIds } = preprocessMarkdownHeadings(markdown);

  // Create custom slugify function that uses our custom IDs
  const customSlugify = (text: string): string => {
    // Check if we have a custom ID for this heading text
    const customId = headingIds.get(text);
    if (customId) {
      return customId;
    }
    // Otherwise use default slugify
    return defaultSlugify(text);
  };

  // Get base overrides (defaults or empty)
  const baseOverrides = useDefaults ? getDefaultOverrides() : {};

  // Create style-based overrides from markdownStyles
  const styleOverrides =
    Object.keys(markdownStyles).length > 0
      ? createStyleOverrides(markdownStyles, baseOverrides)
      : {};

  // Merge in priority order: base -> styles -> custom
  // Custom overrides take highest priority
  const finalOverrides = {
    ...baseOverrides,
    ...styleOverrides,
    ...customOverrides,
  };

  // Compile markdown with custom slugify and merged options
  const compiled = compiler(processedMarkdown, {
    wrapper: wrapper as any, // wrapper can be string, ElementType or null
    overrides: finalOverrides as any,
    slugify: customSlugify,
    ...restOptions,
  });

  // Wrap in context provider if we have custom heading IDs
  if (headingIds.size > 0) {
    return React.createElement(
      HeadingIdProvider,
      { headingIds, children: compiled }
    );
  }

  return compiled;
}

/**
 * Pre-compile markdown for caching purposes
 * This is useful when you want to compile markdown once and reuse it
 */
export function precompileMarkdown(
  markdown: string,
  options: MarkdownOptions = {}
): () => ReactNode {
  return () => compileMarkdown(markdown, options);
}
