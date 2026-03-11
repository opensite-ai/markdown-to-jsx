import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link } from "../../src/overrides/link";

describe("Link Component", () => {
  it("renders a link with href", () => {
    render(<Link href="https://example.com">Click me</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveTextContent("Click me");
  });

  it("sanitizes dangerous javascript: URLs", () => {
    render(<Link href="javascript:alert('XSS')">Dangerous</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#");
  });

  it("sanitizes dangerous data: URLs", () => {
    render(
      <Link href="data:text/html,<script>alert('XSS')</script>">
        Dangerous
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#");
  });

  it("allows safe https URLs", () => {
    render(<Link href="https://example.com">Safe</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("allows relative URLs", () => {
    render(<Link href="/path/to/page">Relative</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/path/to/page");
  });

  it("handles missing href", () => {
    render(<Link>No href</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#");
  });

  it("passes through additional props", () => {
    render(
      <Link href="https://example.com" className="custom-class" data-test="value">
        Link
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
    expect(link).toHaveAttribute("data-test", "value");
  });

  it("renders children correctly", () => {
    render(
      <Link href="https://example.com">
        Click <strong>here</strong>
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link.querySelector("strong")).toHaveTextContent("here");
  });
});
