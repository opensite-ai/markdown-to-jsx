import type { OverrideMap } from "../types";
import { H1WithId, H2WithId, H3WithId, H4WithId, H5WithId, H6WithId } from "./heading-with-id";
import { Image } from "./image";
import { Link } from "./link";
import { CodeBlock, InlineCode } from "./code-block";
import { Iframe } from "./iframe";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableDataCell,
} from "./table";

/**
 * Default override map for ecosystem-optimized components
 * Uses heading components with custom ID support ({#id} syntax)
 */
export function getDefaultOverrides(): OverrideMap {
  return {
    // Headings with auto-ID generation and {#id} syntax support
    h1: H1WithId,
    h2: H2WithId,
    h3: H3WithId,
    h4: H4WithId,
    h5: H5WithId,
    h6: H6WithId,

    // Images with @page-speed/img integration
    img: Image,

    // Safe links with external link handling
    a: Link,

    // Iframes for embeds (YouTube, Twitter, Spotify, etc.)
    iframe: Iframe,

    // Code blocks with language detection
    pre: CodeBlock,
    code: InlineCode,

    // Responsive tables
    table: Table,
    thead: TableHead,
    tbody: TableBody,
    tr: TableRow,
    th: TableHeaderCell,
    td: TableDataCell,
  };
}
