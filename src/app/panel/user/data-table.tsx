"use client";

import FormCreateUpdate, { FormSchema } from "./components/FormCreateUpdate";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailuser] = useState("");
  const [roleUser, setRoleUser] = useState("");
  const [buttonState, setButtonState] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      columnFilters,
    },
  });
  const formUser = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });
  const formUserUpdate = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    values: {
      name: nameUser,
      email: emailUser,
      password: "",
      confirmPassword: "",
      role: roleUser,
    },
  });
  const handleEdit = () => {
    const arrayRowSelection = Object.keys(rowSelection)[0];
    const dataRowSelected = table
      .getRowModel()
      .rows[Number(arrayRowSelection)].getVisibleCells()[0]
      .getContext().row.original;
    const { name, email, role }: any = dataRowSelected;
    setNameUser(name);
    setEmailuser(email);
    setRoleUser(role);
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <Dialog
          open={open}
          onOpenChange={() => {
            setOpen(!open);
            formUser.reset();
            formUserUpdate.reset();
          }}
        >
          <DialogTrigger
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => {
              setOpen(true);
              setButtonState("create");
            }}
          >
            Add Staff
          </DialogTrigger>
          <div className="my-6">
            <DialogContent className="overflow-auto">
              <DialogTitle>{buttonState === "create" ? "Add User" : "Update User"}</DialogTitle>
              <FormCreateUpdate
                buttonState={buttonState}
                statusDialog={setOpen}
                formUser={formUser}
                formUserUpdate={formUserUpdate}
              />
            </DialogContent>
          </div>
          {Object.keys(rowSelection).length > 0 && (
            <div className="space-x-2">
              {Object.keys(rowSelection).length <= 1 && (
                <DialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      handleEdit();
                      setButtonState("update");
                    }}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
              )}
              <Button disabled variant={"destructive"}>
                Delete
              </Button>
            </div>
          )}
        </Dialog>
      </div>
      <div className="flex items-center pb-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-xs"
        />
      </div>
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
      <div className="flex-1 ml-2 mt-2 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}
