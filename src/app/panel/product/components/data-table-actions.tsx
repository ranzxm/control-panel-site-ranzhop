import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema, productSchema } from "../data/schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataTableActions() {
  const form = useForm<ProductSchema>({
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
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
        Add Product
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <Form {...form}>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="productCode"
                render={({ field }) => (
                  <div>
                    <FormItem>
                      <FormLabel>Product Code</FormLabel>
                      <FormControl>
                        <Input placeholder="PLS-AX5" {...field} />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <div>
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Pulsa Axis 5000" {...field} />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              />
            </div>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
