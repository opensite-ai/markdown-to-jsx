import type { OverrideMap } from "../types";
import { H1, H2, H3, H4, H5, H6 } from "./heading";
import { Image } from "./image";
import { Link } from "./link";
import { CodeBlock, InlineCode } from "./code-block";
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
 */
export function getDefaultOverrides(): OverrideMap {
  return {
    // Headings with auto-ID generation
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,

    // Images with @page-speed/img integration
    img: Image,

    // Safe links with external link handling
    a: Link,

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
