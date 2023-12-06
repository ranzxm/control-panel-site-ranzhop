import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface FormEditTypeProps {
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

export default function FormEditType({ form, setDialogOpenStatus }: FormEditTypeProps) {
  return (
    <Form {...form}>
      <form>
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
              </FormItem>
            </div>
          )}
        />
        <Button className="w-full mt-3">Submit</Button>
      </form>
    </Form>
  );
}
