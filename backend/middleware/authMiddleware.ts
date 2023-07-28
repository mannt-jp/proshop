import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

interface JwtPayload {
  userId: string;
}

export const auth = asyncHandler(async (req, res, next) => {
  if (!("jwt" in req.cookies)) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const token: string = req.cookies.jwt;
  if (process.env.JWT_SECRET) {
    try {
      const decodedObject = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as JwtPayload;
      const existingUser = await User.findById(decodedObject.userId);
      if (!existingUser) {
        res.status(401);
        throw new Error("Unauthorized");
      }
      req["user"] = existingUser;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
  // if (req.session.user) next();
  // else {
  //   res.status(401);
  //   throw new Error("Unauthorized");
  // }
});

export const adminAuth = asyncHandler(async (req, res, next) => {
  if (req["user"] && req["user"]["isAdmin"]) {
    next();
  }
  res.status(401);
  throw new Error("Unauthorized");
});
