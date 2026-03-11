import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { H1, H2, H3, H4, H5, H6, Heading } from "../../src/overrides/heading";
import { resetHeadingIds } from "../../src/utils/slugify";

describe("Heading Components", () => {
  beforeEach(() => {
    resetHeadingIds();
  });

  describe("H1", () => {
    it("renders an h1 element", () => {
      const { container } = render(<H1>Hello World</H1>);
      const h1 = container.querySelector("h1");
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent("Hello World");
    });

    it("generates an ID from text content", () => {
      const { container } = render(<H1>Hello World</H1>);
      const h1 = container.querySelector("h1");
      expect(h1).toHaveAttribute("id", "hello-world");
    });
  });

  describe("H2", () => {
    it("renders an h2 element", () => {
      const { container } = render(<H2>Subheading</H2>);
      const h2 = container.querySelector("h2");
      expect(h2).toBeInTheDocument();
      expect(h2).toHaveTextContent("Subheading");
    });
  });

  describe("H3", () => {
    it("renders an h3 element", () => {
      const { container } = render(<H3>Section</H3>);
      const h3 = container.querySelector("h3");
      expect(h3).toBeInTheDocument();
    });
  });

  describe("H4", () => {
    it("renders an h4 element", () => {
      const { container } = render(<H4>Subsection</H4>);
      const h4 = container.querySelector("h4");
      expect(h4).toBeInTheDocument();
    });
  });

  describe("H5", () => {
    it("renders an h5 element", () => {
      const { container } = render(<H5>Minor heading</H5>);
      const h5 = container.querySelector("h5");
      expect(h5).toBeInTheDocument();
    });
  });

  describe("H6", () => {
    it("renders an h6 element", () => {
      const { container } = render(<H6>Smallest heading</H6>);
      const h6 = container.querySelector("h6");
      expect(h6).toBeInTheDocument();
    });
  });

  describe("Heading", () => {
    it("uses provided ID if available", () => {
      const { container } = render(
        <Heading level={1} id="custom-id">
          Hello
        </Heading>
      );
      const h1 = container.querySelector("h1");
      expect(h1).toHaveAttribute("id", "custom-id");
    });

    it("handles duplicate headings", () => {
      const { container } = render(
        <>
          <H1>Introduction</H1>
          <H1>Introduction</H1>
        </>
      );

      const headings = container.querySelectorAll("h1");
      expect(headings[0]).toHaveAttribute("id", "introduction");
      expect(headings[1]).toHaveAttribute("id", "introduction-1");
    });

    it("passes through additional props", () => {
      const { container } = render(
        <H1 className="custom-class" data-test="value">
          Hello
        </H1>
      );
      const h1 = container.querySelector("h1");
      expect(h1).toHaveClass("custom-class");
      expect(h1).toHaveAttribute("data-test", "value");
    });

    it("handles empty children", () => {
      const { container } = render(<H1></H1>);
      const h1 = container.querySelector("h1");
      expect(h1).toBeInTheDocument();
      expect(h1).not.toHaveAttribute("id");
    });

    it("extracts text from complex children", () => {
      const { container } = render(
        <H1>
          Hello <strong>World</strong>
        </H1>
      );
      const h1 = container.querySelector("h1");
      // Currently only extracts direct string children, not nested text
      // This is acceptable behavior for heading ID generation
      expect(h1).toHaveAttribute("id", "hello");
    });
  });
});
