import { describe, it, expect, beforeEach } from "vitest";
import {
  slugify,
  generateHeadingId,
  resetHeadingIds,
} from "../../src/utils/slugify";

describe("slugify", () => {
  it("converts text to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("Multiple   Spaces   Here")).toBe("multiple-spaces-here");
  });

  it("removes special characters", () => {
    expect(slugify("Hello! World?")).toBe("hello-world");
  });

  it("removes leading and trailing hyphens", () => {
    expect(slugify("  Hello World  ")).toBe("hello-world");
  });

  it("handles empty strings", () => {
    expect(slugify("")).toBe("");
  });

  it("handles strings with only special characters", () => {
    expect(slugify("!@#$%^&*()")).toBe("");
  });

  it("preserves valid slug characters", () => {
    expect(slugify("hello-world_123")).toBe("hello-world_123");
  });
});

describe("generateHeadingId", () => {
  beforeEach(() => {
    resetHeadingIds();
  });

  it("generates a basic slug from text", () => {
    const id = generateHeadingId("Hello World");
    expect(id).toBe("hello-world");
  });

  it("handles duplicate IDs by adding a counter", () => {
    const id1 = generateHeadingId("Hello World");
    const id2 = generateHeadingId("Hello World");
    const id3 = generateHeadingId("Hello World");

    expect(id1).toBe("hello-world");
    expect(id2).toBe("hello-world-1");
    expect(id3).toBe("hello-world-2");
  });

  it("tracks IDs across multiple calls", () => {
    generateHeadingId("Introduction");
    generateHeadingId("Getting Started");
    const id = generateHeadingId("Introduction");

    expect(id).toBe("introduction-1");
  });

  it("resets tracking when requested", () => {
    generateHeadingId("Hello World");
    const id = generateHeadingId("Hello World", true);

    expect(id).toBe("hello-world");
  });
});

describe("resetHeadingIds", () => {
  it("clears all tracked IDs", () => {
    generateHeadingId("Hello World");
    resetHeadingIds();
    const id = generateHeadingId("Hello World");

    expect(id).toBe("hello-world");
  });
});
