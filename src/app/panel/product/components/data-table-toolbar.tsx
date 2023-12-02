import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-viewoptions";
import { DataTableFacetedFilter } from "./data-table-faceted";
import { providers, typeProduct } from "../../user/data/data";
import { Button } from "@/components/ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex justify-between items-center pb-4">
      <div className="flex items-center">
        <Input
          placeholder="Search product ..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="w-64 mr-3"
        />
        <div className="space-x-3 flex items-center">
          {table.getColumn("provider") && (
            <DataTableFacetedFilter
              column={table.getColumn("provider")}
              title="Provider"
              options={providers}
            />
          )}
          {table.getColumn("type") && (
            <DataTableFacetedFilter
              column={table.getColumn("type")}
              title="Type"
              options={typeProduct}
            />
          )}
          {isFiltered && (
            <Button
              variant={"outline"}
              className="border-dashed"
              onClick={() => table.resetColumnFilters()}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
