import { describe, it, expect } from "vitest";
import {
  isDangerousUrl,
  sanitizeUrl,
  isDangerousAttribute,
  sanitizeAttributes,
} from "../../src/utils/sanitize";

describe("isDangerousUrl", () => {
  it("detects javascript: protocol", () => {
    expect(isDangerousUrl("javascript:alert('XSS')")).toBe(true);
  });

  it("detects data: protocol", () => {
    expect(isDangerousUrl("data:text/html,<script>alert('XSS')</script>")).toBe(
      true
    );
  });

  it("detects vbscript: protocol", () => {
    expect(isDangerousUrl("vbscript:msgbox('XSS')")).toBe(true);
  });

  it("allows https URLs", () => {
    expect(isDangerousUrl("https://example.com")).toBe(false);
  });

  it("allows http URLs", () => {
    expect(isDangerousUrl("http://example.com")).toBe(false);
  });

  it("allows relative URLs", () => {
    expect(isDangerousUrl("/path/to/page")).toBe(false);
  });

  it("allows mailto URLs", () => {
    expect(isDangerousUrl("mailto:test@example.com")).toBe(false);
  });

  it("is case-insensitive", () => {
    expect(isDangerousUrl("JAVASCRIPT:alert('XSS')")).toBe(true);
    expect(isDangerousUrl("JavaScript:alert('XSS')")).toBe(true);
  });
});

describe("sanitizeUrl", () => {
  it("replaces dangerous URLs with #", () => {
    expect(sanitizeUrl("javascript:alert('XSS')")).toBe("#");
  });

  it("preserves safe URLs", () => {
    expect(sanitizeUrl("https://example.com")).toBe("https://example.com");
  });

  it("preserves relative URLs", () => {
    expect(sanitizeUrl("/path/to/page")).toBe("/path/to/page");
  });
});

describe("isDangerousAttribute", () => {
  it("detects onclick handler", () => {
    expect(isDangerousAttribute("onclick")).toBe(true);
  });

  it("detects onerror handler", () => {
    expect(isDangerousAttribute("onerror")).toBe(true);
  });

  it("detects onload handler", () => {
    expect(isDangerousAttribute("onload")).toBe(true);
  });

  it("allows safe attributes", () => {
    expect(isDangerousAttribute("href")).toBe(false);
    expect(isDangerousAttribute("src")).toBe(false);
    expect(isDangerousAttribute("className")).toBe(false);
  });

  it("is case-insensitive", () => {
    expect(isDangerousAttribute("onClick")).toBe(true);
    expect(isDangerousAttribute("ONCLICK")).toBe(true);
  });
});

describe("sanitizeAttributes", () => {
  it("removes dangerous attributes", () => {
    const attributes = {
      href: "https://example.com",
      onclick: "alert('XSS')",
      className: "test",
    };

    const sanitized = sanitizeAttributes(attributes);

    expect(sanitized).toEqual({
      href: "https://example.com",
      className: "test",
    });
    expect(sanitized).not.toHaveProperty("onclick");
  });

  it("sanitizes dangerous URLs in href", () => {
    const attributes = {
      href: "javascript:alert('XSS')",
    };

    const sanitized = sanitizeAttributes(attributes);

    expect(sanitized.href).toBe("#");
  });

  it("sanitizes dangerous URLs in src", () => {
    const attributes = {
      src: "javascript:alert('XSS')",
    };

    const sanitized = sanitizeAttributes(attributes);

    expect(sanitized.src).toBe("#");
  });

  it("preserves safe attributes unchanged", () => {
    const attributes = {
      className: "test-class",
      id: "test-id",
      "data-test": "value",
    };

    const sanitized = sanitizeAttributes(attributes);

    expect(sanitized).toEqual(attributes);
  });

  it("handles empty objects", () => {
    const sanitized = sanitizeAttributes({});
    expect(sanitized).toEqual({});
  });
});
