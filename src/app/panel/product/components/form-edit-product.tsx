import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface FormEditProductProps {
  form: UseFormReturn<
    {
      productCode: string;
      name: string;
      provider: string;
      type: string;
      price: number;
      capitalPrice: number;
      discount: number;
    },
    any,
    undefined
  >;
}

export function FormEditProduct({ form }: FormEditProductProps) {
  return (
    <Form {...form}>
      <div className="flex gap-3">
        <div className="w-1/2">
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
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <div>
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Game">Game</SelectItem>
                          <SelectItem value="Pulsa">Pulsa</SelectItem>
                          <SelectItem value="Listrik">Listrik</SelectItem>
                          <SelectItem value="Voucher">voucher</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <div>
                <FormItem>
                  <FormLabel>Provider</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Mobile Legends">Mobile Legends</SelectItem>
                          <SelectItem value="Genshin Impact">Genshin Impact</SelectItem>
                          <SelectItem value="PLN">PLN</SelectItem>
                          <SelectItem value="Telkomsel">Telkomsel</SelectItem>
                          <SelectItem value="Axis">Axis</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <div>
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Rp. 100.000" min={0} type="number" {...field} />
                </FormControl>
              </FormItem>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="capitalPrice"
          render={({ field }) => (
            <div>
              <FormItem>
                <FormLabel>Capital Price</FormLabel>
                <FormControl>
                  <Input placeholder="Rp. 100.000" min={0} type="number" {...field} />
                </FormControl>
              </FormItem>
            </div>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="discount"
        render={({ field }) => (
          <div>
            <FormItem>
              <FormLabel>Discount ( 0 - 100 )</FormLabel>
              <FormControl>
                <Input placeholder="0 - 100" min={0} max={100} type="number" {...field} />
              </FormControl>
            </FormItem>
          </div>
        )}
      />
      <Button>Submit</Button>
    </Form>
  );
}
