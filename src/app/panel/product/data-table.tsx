"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./components/data-table-toolbar";
import { DataTablePagination } from "./components/data-table-pagination";
import { DataTableActions } from "./components/data-table-actions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      columnFilters,
      columnVisibility,
      sorting,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.getColumn("productCode")?.toggleVisibility(false);
    table.getColumn("capitalPrice")?.toggleVisibility(false);
    table.getColumn("profit")?.toggleVisibility(false);
  }, []);

  return (
    <>
      <div className="flex items-center mb-3">
        <DataTableActions />
      </div>
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
};

export default DataTable;
