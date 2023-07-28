import { z } from "zod";
export const ResponseOrderSchema = z.object({
  _id: z.string(),
  orderItems: z
    .array(
      z.object({
        quantity: z.number(),
        product: z.object({
          _id: z.string(),
          name: z.string(),
          image: z.string(),
          price: z.number(),
        }),
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
  user: z.object({
    name: z.string(),
    email: z.string(),
  }),
  isPaid: z.boolean(),
  isDelivered: z.boolean(),
  deliveredAt: z.date(),
  paidAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ResponseOrderType = z.infer<typeof ResponseOrderSchema>;
