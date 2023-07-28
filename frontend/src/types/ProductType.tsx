import { z } from "zod";
import { ReviewSchema } from "./ReviewType";
export const ProductSchema = z
  .object({
    _id: z.string(),
    createdUserId: z.string().optional(),
    name: z.string(),
    image: z.string(),
    brand: z.string(),
    category: z.string(),
    description: z.string(),
    reviews: z.array(ReviewSchema),
    rating: z.number(),
    numReviews: z.number(),
    price: z.number(),
    countInStock: z.number(),
  })
  .passthrough();

export type ProductType = z.infer<typeof ProductSchema>;
