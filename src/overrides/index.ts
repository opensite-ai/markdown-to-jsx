/**
 * Component overrides for markdown rendering
 */

export { Heading, H1, H2, H3, H4, H5, H6 } from "./heading";
export type { HeadingProps } from "./heading";

export {
  HeadingWithId,
  H1WithId,
  H2WithId,
  H3WithId,
  H4WithId,
  H5WithId,
  H6WithId,
} from "./heading-with-id";

export { Image } from "./image";
export type { ImageProps } from "./image";

export { Link } from "./link";
export type { LinkProps } from "./link";

export { Iframe } from "./iframe";
export type { IframeProps } from "./iframe";

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
