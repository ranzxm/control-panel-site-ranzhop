"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

//   {
//     id: "frnssmmr",
//     name: "Frans Simamora",
//     email: "frans@gmail.com",
//     role: "admin",
//   },
//   {
//     id: "rbrtgnwn",
//     name: "Robert Gunawan",
//     email: "robert@gmail.com",
//     role: "staff",
//   },

//   {
//     id: "biladimana",
//     name: "Bila Dimana",
//     email: "bila@gmail.com",
//     role: "staff",
//   },
//   {
//     id: "irfnkplng",
//     name: "Irfan Kopling",
//     email: "irfan@gmail.com",
//     role: "staff",
//   },
//   {
//     id: "jpridngkl",
//     name: "Jepri Dongkol",
//     email: "jepri@gmail.com",
//     role: "staff",
//   },
// ];

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <>
          {row.original.role === "staff" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">View Transactions</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Banned User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      );
    },
  },
];
