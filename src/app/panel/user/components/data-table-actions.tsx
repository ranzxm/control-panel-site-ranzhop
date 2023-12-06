"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { cn } from "@/lib/utils";
import FormAddUser from "./form-add-user";
import FormEditUser from "./form-edit-user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormCreateSchema, FormUpdateSchema } from "../data/schema";

interface DataTableActionsProps<TData> {
  table: Table<TData>;
}

export function DataTableActions<TData>({ table }: DataTableActionsProps<TData>) {
  const [data, setData] = React.useState<any>();
  const [buttonState, setButtonState] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const formUser = useForm<z.infer<typeof FormCreateSchema>>({
    resolver: zodResolver(FormCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });
  const formUserUpdate = useForm<z.infer<typeof FormUpdateSchema>>({
    resolver: zodResolver(FormUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    values: {
      id: data?.id,
      name: data?.name,
      email: data?.email,
      password: "",
      confirmPassword: "",
      role: data?.role,
    },
  });

  const handleEdit = () => {
    setData(table.getSelectedRowModel().rows[0].original);
  };
  const handleDeleteButton = () => {
    setData(table.getSelectedRowModel().rows[0].original);
  };
  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(`/api/user/`, {
        data: {
          id: data.id,
        },
      });
      router.refresh();
      console.log(res);
      table.resetRowSelection();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
              {buttonState === "create" ? (
                <FormAddUser form={formUser} statusDialog={setOpen} />
              ) : (
                <FormEditUser form={formUserUpdate} table={table} statusDialog={setOpen} />
              )}
            </DialogContent>
          </div>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="space-x-2">
              {table.getFilteredSelectedRowModel().rows.length <= 1 && (
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
              <Dialog>
                <DialogTrigger
                  className={cn(buttonVariants({ variant: "destructive" }))}
                  onClick={handleDeleteButton}
                >
                  Delete
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-3">Delete User</DialogTitle>
                    <DialogDescription>Are you sure to delete user {data?.name}?</DialogDescription>
                  </DialogHeader>
                  <div className="buttonAction space-x-3 ml-auto">
                    <DialogTrigger asChild>
                      <Button variant={"secondary"}>No</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button
                        variant={"secondary"}
                        className="hover:bg-red-700"
                        onClick={() => handleDeleteUser()}
                      >
                        Yes
                      </Button>
                    </DialogTrigger>
                  </div>
                </DialogContent>
              </Dialog>
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
    </>
  );
}
