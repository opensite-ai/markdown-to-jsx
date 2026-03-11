import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMarkdown } from "../../src/hooks/useMarkdown";

describe("useMarkdown", () => {
  it("compiles basic markdown", () => {
    const { result } = renderHook(() => useMarkdown("# Hello World"));

    expect(result.current.content).toBeTruthy();
    expect(result.current.isCompiling).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("handles bold text", () => {
    const { result } = renderHook(() => useMarkdown("**Bold text**"));

    expect(result.current.content).toBeTruthy();
    expect(result.current.isCompiling).toBe(false);
  });

  it("handles italic text", () => {
    const { result } = renderHook(() => useMarkdown("*Italic text*"));

    expect(result.current.content).toBeTruthy();
    expect(result.current.isCompiling).toBe(false);
  });

  it("supports custom options", () => {
    const { result } = renderHook(() =>
      useMarkdown("# Heading", {
        useDefaults: false,
      })
    );

    expect(result.current.content).toBeTruthy();
    expect(result.current.error).toBeUndefined();
  });

  it("memoizes the same markdown input", () => {
    const markdown = "# Hello World";
    const { result, rerender } = renderHook(() => useMarkdown(markdown));

    const firstResult = result.current.content;
    rerender();
    const secondResult = result.current.content;

    expect(firstResult).toBe(secondResult);
  });

  it("updates when markdown changes", () => {
    const { result, rerender } = renderHook(
      ({ md }) => useMarkdown(md),
      {
        initialProps: { md: "# First" },
      }
    );

    const firstResult = result.current.content;

    rerender({ md: "# Second" });

    expect(result.current.content).not.toBe(firstResult);
  });

  it("handles empty markdown", () => {
    const { result } = renderHook(() => useMarkdown(""));

    expect(result.current.content).toBeTruthy();
    expect(result.current.error).toBeUndefined();
  });

  it("handles complex markdown", () => {
    const markdown = `
# Heading

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

[Link](https://example.com)
    `;

    const { result } = renderHook(() => useMarkdown(markdown));

    expect(result.current.content).toBeTruthy();
    expect(result.current.error).toBeUndefined();
  });
});
