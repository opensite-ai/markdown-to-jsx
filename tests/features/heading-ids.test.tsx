import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Markdown } from "../../src/core/Markdown";

describe("Heading ID Features", () => {
  it("renders heading with custom ID using {#id} syntax", () => {
    const markdown = "## Introduction {#intro}";
    render(<Markdown>{markdown}</Markdown>);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("id", "intro");
    expect(heading).toHaveTextContent("Introduction");
    expect(heading).not.toHaveTextContent("{#intro}");
  });

  it("auto-generates ID when no custom ID provided", () => {
    render(<Markdown>## Regular Heading</Markdown>);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("id");
    expect(heading.id).toBe("regular-heading");
  });

  it("handles multiple headings with custom IDs", () => {
    const markdown = `
## First Section {#first}
## Second Section {#second}
## Third Section {#third}
    `;
    render(<Markdown>{markdown}</Markdown>);

    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings[0]).toHaveAttribute("id", "first");
    expect(headings[1]).toHaveAttribute("id", "second");
    expect(headings[2]).toHaveAttribute("id", "third");
  });

  it("handles mixed custom and auto-generated IDs", () => {
    const markdown = `
## Custom ID {#custom}
## Auto Generated
    `;
    render(<Markdown>{markdown}</Markdown>);

    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings[0]).toHaveAttribute("id", "custom");
    expect(headings[1]).toHaveAttribute("id", "auto-generated");
  });
});

describe("markdownStyles Feature", () => {
  it("applies custom className to headings", () => {
    render(
      <Markdown
        markdownStyles={{
          h2: "text-2xl font-bold text-primary",
        }}
      >
        ## Styled Heading
      </Markdown>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveClass("text-2xl", "font-bold", "text-primary");
  });

  it("applies custom className to images", () => {
    render(
      <Markdown
        markdownStyles={{
          img: "rounded-lg shadow-md",
        }}
      >
        ![Test](https://example.com/test.jpg)
      </Markdown>
    );

    const img = screen.getByRole("img");
    expect(img).toHaveClass("rounded-lg", "shadow-md");
  });

  it("applies custom className to multiple element types", () => {
    const markdown = `
## Heading
![Image](https://example.com/img.jpg)
    `;

    render(
      <Markdown
        markdownStyles={{
          h2: "heading-class",
          img: "image-class",
        }}
      >
        {markdown}
      </Markdown>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    const img = screen.getByRole("img");

    expect(heading).toHaveClass("heading-class");
    expect(img).toHaveClass("image-class");
  });

  it("combines markdownStyles with custom overrides", () => {
    const CustomH1 = ({ children, className }: any) => (
      <h1 className={className} data-custom="true">
        {children}
      </h1>
    );

    render(
      <Markdown
        markdownStyles={{
          h2: "styled-h2",
        }}
        overrides={{
          h1: CustomH1,
        }}
      >
        {`# Custom Override\n## Styled Heading`}
      </Markdown>
    );

    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });

    expect(h1).toHaveAttribute("data-custom", "true");
    expect(h2).toHaveClass("styled-h2");
  });
});

describe("Iframe Support", () => {
  it("renders iframe with default attributes", () => {
    const markdown = '<iframe src="https://www.youtube.com/embed/test"></iframe>';
    const { container } = render(<Markdown>{markdown}</Markdown>);

    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/test");
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe).toHaveAttribute("allowFullScreen");
  });

  it("applies custom className to iframe via markdownStyles", () => {
    const markdown = '<iframe src="https://www.youtube.com/embed/test"></iframe>';
    const { container } = render(
      <Markdown
        markdownStyles={{
          iframe: "aspect-video w-full rounded-2xl shadow-lg",
        }}
      >
        {markdown}
      </Markdown>
    );

    const iframe = container.querySelector("iframe");
    expect(iframe).toHaveClass("aspect-video", "w-full", "rounded-2xl", "shadow-lg");
  });
});
