import { z } from "zod";

export const UserSchema = z
  .object({
    name: z.string(),
    email: z.string().email("This is not a valid email"),
    password: z.string().optional(),
    isAdmin: z.boolean(),
  })
  .passthrough();

export type UserType = z.infer<typeof UserSchema>;
export const isUser = (arg: any): arg is UserType => {
  return UserSchema.safeParse(arg).success;
};
