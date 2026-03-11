import { describe, it, expect } from "vitest";
import { parseHeadingId, preprocessHeadingIds } from "../../src/utils/parse-heading-id";

describe("parseHeadingId", () => {
  it("parses custom ID from heading text", () => {
    const result = parseHeadingId("Introduction {#intro}");
    expect(result.text).toBe("Introduction");
    expect(result.id).toBe("intro");
  });

  it("handles heading without custom ID", () => {
    const result = parseHeadingId("Regular Heading");
    expect(result.text).toBe("Regular Heading");
    expect(result.id).toBeNull();
  });

  it("handles IDs with hyphens and underscores", () => {
    const result = parseHeadingId("My Heading {#my-custom_id}");
    expect(result.text).toBe("My Heading");
    expect(result.id).toBe("my-custom_id");
  });

  it("handles IDs with numbers", () => {
    const result = parseHeadingId("Section 1 {#section-1}");
    expect(result.text).toBe("Section 1");
    expect(result.id).toBe("section-1");
  });

  it("handles extra whitespace", () => {
    const result = parseHeadingId("Title  {#id}  ");
    expect(result.text).toBe("Title");
    expect(result.id).toBe("id");
  });

  it("ignores invalid ID syntax", () => {
    const result = parseHeadingId("Heading {#invalid id}");
    expect(result.text).toBe("Heading {#invalid id}");
    expect(result.id).toBeNull();
  });
});

describe("preprocessHeadingIds", () => {
  it("extracts custom IDs from markdown headings", () => {
    const markdown = `
# Main Title {#main}
## Subtitle {#sub}
### Regular Heading
    `.trim();

    const { processedMarkdown, headingIds } = preprocessHeadingIds(markdown);

    expect(headingIds.get("Main Title")).toBe("main");
    expect(headingIds.get("Subtitle")).toBe("sub");
    expect(headingIds.has("Regular Heading")).toBe(false);

    // Processed markdown should have IDs removed
    expect(processedMarkdown).toContain("# Main Title");
    expect(processedMarkdown).not.toContain("{#main}");
    expect(processedMarkdown).toContain("## Subtitle");
    expect(processedMarkdown).not.toContain("{#sub}");
  });

  it("handles multiple headings at same level", () => {
    const markdown = `
## First {#first}
## Second {#second}
## Third {#third}
    `.trim();

    const { headingIds } = preprocessHeadingIds(markdown);

    expect(headingIds.get("First")).toBe("first");
    expect(headingIds.get("Second")).toBe("second");
    expect(headingIds.get("Third")).toBe("third");
  });

  it("preserves markdown without custom IDs", () => {
    const markdown = `
# Regular Heading
This is some content.
    `.trim();

    const { processedMarkdown } = preprocessHeadingIds(markdown);

    expect(processedMarkdown).toBe(markdown);
  });
});
