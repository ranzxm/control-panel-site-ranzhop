import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ProductTypeSchema } from "../../data/schema";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormAddTypeProps {
  setDialogOpenStatus: React.Dispatch<React.SetStateAction<boolean>>;
  dialogOpenStatus: boolean;
  form: UseFormReturn<
    {
      id: string;
      name: string;
    },
    any,
    undefined
  >;
}

export default function FormAddType({
  form,
  setDialogOpenStatus,
  dialogOpenStatus,
}: FormAddTypeProps) {
  const router = useRouter();
  const onSubmit = async (data: ProductTypeSchema) => {
    try {
      await axios.post("/api/product/type", {
        id: data.id,
        name: data.name,
      });
      router.refresh();
      setDialogOpenStatus(!dialogOpenStatus);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <div>
              <FormItem>
                <FormLabel>Type ID</FormLabel>
                <FormControl>
                  <Input placeholder="PLS" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormLabel>Type Name</FormLabel>
                <FormControl>
                  <Input placeholder="Pulsa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <Button className="w-full mt-3">Submit</Button>
      </form>
    </Form>
  );
}
