import mongoose from "mongoose";
import { z } from "zod";

export const UserZSchema = z.object({
  name: z.string(),
  email: z.string().email("This is not a valid email"),
  password: z.string().min(8).max(20),
  isAdmin: z.boolean().default(false),
});


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
