import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import React from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <>
      <div className="flex items-center mb-4">
        <Input
          placeholder="Filter Type..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="w-64"
        />
      </div>
    </>
  );
}

export default DataTableToolbar;
