import { z } from "zod";

export const productSchema = z.object({
  productCode: z.string(),
  name: z.string(),
  provider: z.string(),
  type: z.string(),
  price: z.number(),
  capitalPrice: z.number(),
  discount: z.number(),
});

export const productTypeSchema = z.object({
  id: z.string().min(1, {
    message: "ID is required",
  }),
  name: z.string().min(1, {
    message: "Type name is required",
  }),
});

export type ProductSchema = z.infer<typeof productSchema>;
export type ProductTypeSchema = z.infer<typeof productTypeSchema>;
