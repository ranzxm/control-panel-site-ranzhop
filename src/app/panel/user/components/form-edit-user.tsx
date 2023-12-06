"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { FormUpdateSchema } from "../data/schema";
import { z } from "zod";
import axios from "axios";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

interface FormEditUserProps<TData> {
  table: Table<TData>;
  statusDialog: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      id: number;
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      role: string;
    },
    any,
    undefined
  >;
}

function FormEditUser<TData>({ form, table, statusDialog }: FormEditUserProps<TData>) {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormUpdateSchema>) => {
    try {
      await axios.put("http://localhost:3000/api/user", {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
      });
      router.refresh();
      table.resetRowSelection();
      statusDialog(!open);
    } catch (error) {
      console.log({ msg: "error 09774" });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <div className="">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel>Names</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-type Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button className="mt-4 w-full">Submit</Button>
      </form>
    </Form>
  );
}

export default FormEditUser;
