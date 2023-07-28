import { z } from "zod";
import { ProductSchema } from "./ProductType";
export const CartItemSchema = z.object({
  quantity: z.number(),
  product: ProductSchema,
});

export type CartItemType = z.infer<typeof CartItemSchema>;
