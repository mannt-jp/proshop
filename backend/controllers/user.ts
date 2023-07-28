import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserZSchema } from "../models/userModel";

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const passwordIsMatched = await bcrypt.compare(password, user.password);
  if (!passwordIsMatched) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    console.log("Cookie set!", token);
  }
  // req.session.user = user;
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc    Register user
// @route   POST /api/users/signup
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const validateResult = UserZSchema.safeParse(req.body);
  console.log(validateResult);
  if (!validateResult.success) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const { name, email, password } = req.body;
  // Check for existing user
  const user = await User.findOne({ email });
  if (user) {
    res.status(401);
    throw new Error("User already exists!");
  }
  // Bcrypt the password
  const cryptedPassword = await bcrypt.hash(password, 10);
  // Create new entry
  const newUser = await User.create({
    name,
    email,
    password: cryptedPassword,
    isAdmin: false,
  });
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    console.log("Cookie set!", token);
  }
  // req.session.user = newUser;
  res.status(200).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
});

// @desc    Logout user and clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: false, expires: new Date(0) });
  // req.session.destroy(() => {
  //   res.status(200).json({ message: "Logged out successfully" });
  // });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = req["user"];
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Unauthorized!");
  }
});

// @desc    Update user profile
// @route   GET /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req["user"];
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password
      ? await bcrypt.hash(req.body.password, 10)
      : user.password;
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Unauthorized!");
  }
});
