"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Button } from "@/components/ui/button";

export const FormSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is Required!",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email is Required",
      })
      .email(),
    password: z
      .string()
      .min(1, {
        message: "Password is Required!",
      })
      .min(6, {
        message: "The password must have a minimum of 6 characters",
      }),
    confirmPassword: z
      .string()
      .min(1, {
        message: "Confirm Password is Required!",
      })
      .min(6, {
        message: "The confirm password must have a minimum of 6 characters",
      }),
    role: z.string().min(1, {
      message: "Role is Required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password and confirm password isn't match",
  });

interface FormCreateUpdateProps {
  buttonState: string;
  statusDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formUser: UseFormReturn<
    {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      role: string;
    },
    any,
    undefined
  >;
  formUserUpdate: UseFormReturn<
    {
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

const FormCreateUpdate = ({
  statusDialog,
  formUser,
  formUserUpdate,
  buttonState,
}: FormCreateUpdateProps) => {
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    console.log(buttonState);
    statusDialog(!open);
  };
  return (
    <>
      {buttonState === "create" ? (
        <Form {...formUser}>
          <form onSubmit={formUser.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <div className="">
                <FormField
                  control={formUser.control}
                  name="name"
                  render={({ field }) => (
                    <div>
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    </div>
                  )}
                />

                <FormField
                  control={formUser.control}
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
                  control={formUser.control}
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
                  control={formUser.control}
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
              control={formUser.control}
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
      ) : (
        <Form {...formUserUpdate}>
          <form onSubmit={formUserUpdate.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <div className="">
                <FormField
                  control={formUserUpdate.control}
                  name="name"
                  render={({ field }) => (
                    <div>
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    </div>
                  )}
                />

                <FormField
                  control={formUserUpdate.control}
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
                  control={formUserUpdate.control}
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
                  control={formUserUpdate.control}
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
              control={formUserUpdate.control}
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
      )}
    </>
  );
};

export default FormCreateUpdate;
