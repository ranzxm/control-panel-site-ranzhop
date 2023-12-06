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
import { Table } from "@tanstack/react-table";
import React from "react";
import { useForm } from "react-hook-form";
import { ProductTypeSchema, productTypeSchema } from "../../data/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormAddType from "./form-add-type";
import FormEditType from "./form-edit-type";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DataTableActionProps<TData> {
  table: Table<TData>;
}

function DataTableAction<TData>({ table }: DataTableActionProps<TData>) {
  const router = useRouter();
  const [buttonState, setButtonState] = React.useState("");
  const [dialogOpenStatus, setDialogOpenStatus] = React.useState(false);
  const [data, setData] = React.useState<any>();
  const formCreate = useForm<ProductTypeSchema>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });
  const formUpdate = useForm<ProductTypeSchema>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      id: "",
      name: "",
    },
    values: {
      id: data?.id,
      name: data?.name,
    },
  });

  const handleEditButton = () => {
    try {
      setData(table.getSelectedRowModel().rows[0].original);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButton = () => {
    setData(table.getSelectedRowModel().rows[0].original);
  };

  const handelConfirmDelete = async () => {
    try {
      await axios.delete("/api/product/type", {
        data: {
          id: data.id,
        },
      });
      router.refresh();
      table.resetRowSelection();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full">
      <Dialog
        onOpenChange={() => {
          formCreate.reset();
          setDialogOpenStatus(!dialogOpenStatus);
        }}
        open={dialogOpenStatus}
      >
        <DialogTrigger
          className={cn(buttonVariants({ variant: "outline" }), "mb-3")}
          onClick={() => {
            setDialogOpenStatus(!dialogOpenStatus);
            setButtonState("create");
          }}
        >
          Add Type
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {buttonState === "create" ? (
              <>
                <DialogTitle className="mb-3">Add Type</DialogTitle>
                <FormAddType
                  form={formCreate}
                  setDialogOpenStatus={setDialogOpenStatus}
                  dialogOpenStatus={dialogOpenStatus}
                />
              </>
            ) : (
              <>
                <DialogTitle className="mb-3">Edit Type</DialogTitle>
                <FormEditType
                  form={formUpdate}
                  setDialogOpenStatus={setDialogOpenStatus}
                  dialogOpenStatus={dialogOpenStatus}
                />
              </>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex ml-auto">
        <Dialog>
          {table.getIsSomeRowsSelected() && (
            <div className="space-x-3">
              {table.getFilteredSelectedRowModel().rows.length <= 1 && (
                <>
                  <DialogTrigger
                    onClick={() => {
                      setDialogOpenStatus(!dialogOpenStatus);
                      setButtonState("update");
                      handleEditButton();
                    }}
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    Edit
                  </DialogTrigger>
                  <Dialog>
                    <DialogTrigger
                      className={cn(buttonVariants({ variant: "destructive" }))}
                      onClick={() => handleDeleteButton()}
                    >
                      Delete
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="mb-3">Delete Product</DialogTitle>
                        <DialogDescription>
                          Are you sure to delete {table.getFilteredSelectedRowModel().rows.length}{" "}
                          product ?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="buttonAction space-x-3 ml-auto">
                        <DialogTrigger asChild>
                          <Button variant={"secondary"}>No</Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                          <Button
                            variant={"secondary"}
                            className="hover:bg-red-700"
                            onClick={() => {
                              handelConfirmDelete();
                            }}
                          >
                            Yes
                          </Button>
                        </DialogTrigger>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          )}
        </Dialog>
      </div>
    </div>
  );
}

export default DataTableAction;
