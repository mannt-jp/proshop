import { CartItemSchema } from "./CartItemType";
import { z } from "zod";

export const CartSchema = z.object({
  userId: z.string().optional(),
  cartItems: z.array(CartItemSchema),
  itemsPrice: z.number(),
  taxPrice: z.number(),
  shippingPrice: z.literal(0).or(z.literal(10)),
  totalPrice: z.number(),
  shippingAddress: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  paymentMethod: z.string(),
});

export type CartType = z.infer<typeof CartSchema>;

export const isCart = (arg: any): arg is CartType => {
  return CartSchema.safeParse(arg).success;
};
