"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email(),
  password: z.string().min(1, {
    message: "password is required",
  }),
});

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const signInData = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log(signInData);
      window.location.href = "/panel/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-96 rounded-md p-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@gmail.com" {...field} />
                </FormControl>
                <FormMessage className="capitalize" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage className="capitalize" />
              </FormItem>
            )}
          />
          <Button className="w-full mt-4">Sign In</Button>
        </form>
      </Form>
    </Card>
  );
}
