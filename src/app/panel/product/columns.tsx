"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Product = {
  id: string;
  productCode: string;
  name: string;
  price: number;
  capitalPrice: number;
  type: string;
  provider: string;
  discount: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productCode",
    header: "Product Code",
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-normal truncate max-w-[200px]">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "provider",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          className="justify-start -ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Provider
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = Number(row.getValue("price"));
      const discount = Number(row.getValue("discount"));
      const discountPrice = price * discount;
      const priceAfterDiscount = price - discountPrice;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(priceAfterDiscount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "capitalPrice",
    header: "Capital Price",
    cell: ({ row }) => {
      const capitalPrice = Number(row.getValue("capitalPrice"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(capitalPrice);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "profit",
    header: "Profit",
    cell: ({ row }) => {
      const price = Number(row.getValue("price"));
      const capitalPrice = Number(row.getValue("capitalPrice"));
      const discount = Number(row.getValue("discount"));
      const discountPrice = price * discount;
      const priceAfterDiscount = price - discountPrice;
      const profit = priceAfterDiscount - capitalPrice;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(profit);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const discount = Number(row.getValue("discount"));
      const decimalToNumber = discount * 100;

      return (
        <div className="text-start">{decimalToNumber !== 0 ? `${decimalToNumber}%` : "-"}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Set out of stock</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
