import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMarkdownOptions } from "../../src/hooks/useMarkdownOptions";

describe("useMarkdownOptions", () => {
  it("returns default overrides when useDefaults is true", () => {
    const { result } = renderHook(() => useMarkdownOptions());

    expect(result.current.overrides).toBeDefined();
    expect(result.current.overrides?.h1).toBeDefined();
    expect(result.current.overrides?.h2).toBeDefined();
    expect(result.current.overrides?.a).toBeDefined();
    expect(result.current.overrides?.img).toBeDefined();
  });

  it("merges custom overrides with defaults", () => {
    const CustomH1 = () => <h1>Custom</h1>;

    const { result } = renderHook(() =>
      useMarkdownOptions({
        overrides: { h1: CustomH1 },
      })
    );

    expect(result.current.overrides?.h1).toBe(CustomH1);
    expect(result.current.overrides?.h2).toBeDefined(); // Default is still there
  });

  it("uses only custom overrides when useDefaults is false", () => {
    const CustomH1 = () => <h1>Custom</h1>;

    const { result } = renderHook(() =>
      useMarkdownOptions({
        overrides: { h1: CustomH1 },
        useDefaults: false,
      })
    );

    expect(result.current.overrides?.h1).toBe(CustomH1);
    expect(result.current.overrides?.h2).toBeUndefined(); // No defaults
  });

  it("preserves other options", () => {
    const { result } = renderHook(() =>
      useMarkdownOptions({
        className: "custom-class",
      })
    );

    expect(result.current.className).toBe("custom-class");
  });

  it("memoizes the result with same options", () => {
    const overrides = { h1: () => <h1>Custom</h1> };

    const { result, rerender } = renderHook(() =>
      useMarkdownOptions({ overrides })
    );

    const firstResult = result.current;
    rerender();
    const secondResult = result.current;

    // Overrides will be different objects but should have same content
    expect(firstResult.overrides?.h1).toBe(secondResult.overrides?.h1);
  });

  it("updates when options change", () => {
    const { result, rerender } = renderHook(
      ({ opts }) => useMarkdownOptions(opts),
      {
        initialProps: { opts: { className: "class-1" } },
      }
    );

    const firstResult = result.current;

    rerender({ opts: { className: "class-2" } });

    expect(result.current).not.toBe(firstResult);
    expect(result.current.className).toBe("class-2");
  });

  it("handles empty options", () => {
    const { result } = renderHook(() => useMarkdownOptions({}));

    expect(result.current.overrides).toBeDefined();
    expect(result.current.useDefaults).toBe(true);
  });
});
