import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Markdown } from "../../src/core/Markdown";

describe("Markdown Component", () => {
  it("renders simple markdown", () => {
    render(<Markdown># Hello World</Markdown>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hello World"
    );
  });

  it("renders bold text", () => {
    const { container } = render(<Markdown>**Bold text**</Markdown>);
    expect(container.querySelector("strong")).toHaveTextContent("Bold text");
  });

  it("renders italic text", () => {
    const { container } = render(<Markdown>*Italic text*</Markdown>);
    expect(container.querySelector("em")).toHaveTextContent("Italic text");
  });

  it("renders links", () => {
    render(<Markdown>[Link](https://example.com)</Markdown>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders images", () => {
    const { container } = render(
      <Markdown>![Alt text](https://example.com/image.jpg)</Markdown>
    );
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(img).toHaveAttribute("alt", "Alt text");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Markdown className="custom-class"># Heading</Markdown>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("supports custom overrides", () => {
    const CustomH1 = ({ children }: { children: React.ReactNode }) => (
      <h1 className="custom-heading">{children}</h1>
    );

    render(
      <Markdown overrides={{ h1: CustomH1 }}># Custom Heading</Markdown>
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("custom-heading");
  });

  it("disables default overrides when useDefaults is false", () => {
    const { container } = render(
      <Markdown useDefaults={false}># Heading</Markdown>
    );
    const heading = container.querySelector("h1");
    // Note: markdown-to-jsx adds IDs by default, but our custom slugification won't run
    expect(heading).toBeInTheDocument();
  });

  it("renders code blocks", () => {
    const markdown = "```javascript\nconst x = 1;\n```";
    const { container } = render(<Markdown>{markdown}</Markdown>);

    // markdown-to-jsx renders code blocks with a pre tag
    const code = container.querySelector("code");
    expect(code).toBeInTheDocument();
    if (code) {
      expect(code.textContent).toContain("const x = 1");
    }
  });

  it("renders inline code", () => {
    const { container } = render(<Markdown>`inline code`</Markdown>);
    const code = container.querySelector("code");
    expect(code).toHaveTextContent("inline code");
  });

  it("renders tables", () => {
    const markdown = `
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
    `;

    const { container } = render(<Markdown>{markdown}</Markdown>);
    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass("markdown-table");
  });

  it("renders nested lists", () => {
    const markdown = `
- Item 1
  - Nested item 1
  - Nested item 2
- Item 2
    `;

    const { container } = render(<Markdown>{markdown}</Markdown>);
    const lists = container.querySelectorAll("ul");
    expect(lists.length).toBeGreaterThan(0);
  });
});
