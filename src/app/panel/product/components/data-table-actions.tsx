import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema, productSchema } from "../data/schema";
import { FormAddProduct } from "./form-add-product";
import React from "react";
import { RowModel, Table } from "@tanstack/react-table";
import { Product } from "../columns";
import { FormEditProduct } from "./form-edit-product";

interface DataTableActionsProps<TData> {
  table: Table<TData>;
}

export function DataTableActions<TData extends any>({ table }: DataTableActionsProps<TData>) {
  const [data, setData] = React.useState<any>();
  const formAdd = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productCode: "",
      name: "",
      provider: "",
      type: "",
      price: 0,
      capitalPrice: 0,
      discount: 0,
    },
  });
  const formEdit = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productCode: "",
      name: "",
      provider: "",
      type: "",
      price: 0,
      capitalPrice: 0,
      discount: 0,
    },
    values: {
      productCode: data?.productCode,
      name: data?.name,
      provider: data?.provider,
      type: data?.type,
      price: data?.price,
      capitalPrice: data?.capitalPrice,
      discount: data?.discount,
    },
  });

  const handleEditButton = () => {
    try {
      setData(table.getSelectedRowModel().rows[0].original);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full">
      <Dialog onOpenChange={() => formAdd.reset()}>
        <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
          Add Product
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Add Product</DialogTitle>
            <FormAddProduct form={formAdd} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex ml-auto">
        <Dialog onOpenChange={() => formEdit.reset()}>
          {table.getIsSomeRowsSelected() ? (
            <div className="space-x-3">
              <DialogTrigger
                className={cn(buttonVariants({ variant: "outline" }))}
                onClick={() => handleEditButton()}
              >
                Edit
              </DialogTrigger>
              <Dialog>
                <DialogTrigger className={cn(buttonVariants({ variant: "destructive" }))}>
                  Delete
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-3">Delete Product</DialogTitle>
                    <DialogDescription>Are you sure to delete this product ?</DialogDescription>
                  </DialogHeader>
                  <div className="buttonAction space-x-3 ml-auto">
                    <Button variant={"secondary"}>No</Button>
                    <Button variant={"secondary"}>Yes</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            ``
          )}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <FormEditProduct form={formEdit} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
