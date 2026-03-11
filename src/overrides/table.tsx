import React from "react";

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
}

/**
 * Responsive table wrapper component
 */
export function Table({ children, className, ...props }: TableProps) {
  const tableClassName = className
    ? `markdown-table ${className}`
    : "markdown-table";

  return (
    <div className="table-wrapper" style={{ overflowX: "auto" }}>
      <table className={tableClassName} {...props}>
        {children}
      </table>
    </div>
  );
}

/**
 * Table head component
 */
export function TableHead({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props}>{children}</thead>;
}

/**
 * Table body component
 */
export function TableBody({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{children}</tbody>;
}

/**
 * Table row component
 */
export function TableRow({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props}>{children}</tr>;
}

/**
 * Table header cell component
 */
export function TableHeaderCell({
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) {
  return <th {...props}>{children}</th>;
}

/**
 * Table data cell component
 */
export function TableDataCell({
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableDataCellElement>) {
  return <td {...props}>{children}</td>;
}
