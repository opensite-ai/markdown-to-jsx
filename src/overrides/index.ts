/**
 * Component overrides for markdown rendering
 */

export { Heading, H1, H2, H3, H4, H5, H6 } from "./heading";
export type { HeadingProps } from "./heading";

export { Image } from "./image";
export type { ImageProps } from "./image";

export { Link } from "./link";
export type { LinkProps } from "./link";

export { CodeBlock, InlineCode } from "./code-block";
export type { CodeBlockProps } from "./code-block";

export {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableDataCell,
} from "./table";
export type { TableProps } from "./table";

export { getDefaultOverrides } from "./defaults";
