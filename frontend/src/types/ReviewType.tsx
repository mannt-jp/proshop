import { UserSchema } from "./UserType";
import { z } from "zod";
export const ReviewSchema = z
  .object({
    user: UserSchema,
    name: z.string(),
    rating: z.number(),
    comment: z.string(),
  })
  .passthrough();

export type ReviewType = z.infer<typeof ReviewSchema>;
