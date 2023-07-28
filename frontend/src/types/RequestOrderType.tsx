import { z } from "zod";
export const RequestOrderSchema = z.object({
  orderItems: z
    .array(
      z.object({
        quantity: z.number(),
        productId: z.string(),
      })
    )
    .min(1),
  shippingAddress: z.object({
    address: z.string(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }),
  paymentMethod: z.string(),
  itemsPrice: z.number(),
  taxPrice: z.number(),
  shippingPrice: z.literal(0).or(z.literal(10)),
  totalPrice: z.number(),
});

export type RequestOrderType = z.infer<typeof RequestOrderSchema>;
