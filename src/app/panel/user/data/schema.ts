"use client";

import { z } from "zod";

export const FormCreateSchema = z
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

export const FormUpdateSchema = z
  .object({
    id: z.number(),
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
