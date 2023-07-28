import express from "express";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user";

import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controllers/admin";

import { auth, adminAuth } from "../middleware/authMiddleware";
const router = express.Router();

router.route("/").get(auth, adminAuth, getAllUsers);
router.route("/signup").post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/login").post(authUser);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);
router
  .route("/:id")
  .delete(auth, adminAuth, deleteUserById)
  .put(auth, adminAuth, updateUserById)
  .get(auth, adminAuth, getUserById);

export default router;
