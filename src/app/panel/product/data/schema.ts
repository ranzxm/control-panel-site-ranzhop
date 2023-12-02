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

export type ProductSchema = z.infer<typeof productSchema>;
