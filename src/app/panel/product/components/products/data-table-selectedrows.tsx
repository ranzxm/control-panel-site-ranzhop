import { Table } from "@tanstack/react-table";

interface DataTableSelectedRowsProps<TData> {
  table: Table<TData>;
}

export function DataTableSelectedRows<TData>({ table }: DataTableSelectedRowsProps<TData>) {
  return (
    <div className="flex-1 text-sm text-muted-foreground">
      {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{" "}
      row(s) selected.
    </div>
  );
}
