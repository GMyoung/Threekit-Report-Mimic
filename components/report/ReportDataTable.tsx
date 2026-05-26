"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Density, TableColumnSpec } from "@/lib/report/page-types";

type TableProps<T> = {
  data: T[];
  columns: TableColumnSpec<T>[];
  label: string;
  density: Density;
  leaderPredicate?: (row: T) => boolean;
};

export function ReportDataTable<T extends object>({ data, columns, label, density, leaderPredicate }: TableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const tableColumns = React.useMemo<ColumnDef<T>[]>(
    () =>
      columns.map((column) => ({
        id: String(column.id),
        accessorFn: (row) => {
          if (column.accessor) return column.accessor(row);
          return row[column.id as keyof T] as React.ReactNode;
        },
        header: column.header,
        enableSorting: column.sortable ?? true,
        meta: { align: column.align ?? "left" },
        cell: ({ row }) => {
          const value = column.accessor ? column.accessor(row.original) : row.original[column.id as keyof T];
          return <>{value as React.ReactNode}</>;
        },
      })),
    [columns],
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className={`data-table data-table--${density}`}>
      <h3 className="data-table__title">{label}</h3>
      <div className="data-table__toolbar">
        <label>
          <span className="sr-only">Search {label}</span>
          <Search aria-hidden="true" size={16} />
          <Input value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} placeholder={`Search ${label}`} />
        </label>
        <span>{table.getFilteredRowModel().rows.length} rows</span>
      </div>
      <div className="data-table__scroll">
        <table aria-label={label}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      aria-label={`Sort by ${String(header.column.columnDef.header)}`}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span aria-hidden="true">
                        {{ asc: " ↑", desc: " ↓" }[header.column.getIsSorted() as string] ?? ""}
                      </span>
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className={leaderPredicate?.(row.original) ? "is-leader" : undefined} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td data-align={(cell.column.columnDef.meta as { align?: string })?.align ?? "left"} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
