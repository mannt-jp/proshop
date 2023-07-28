import express from "express";

import { placeOrder, getMyOrder, getOrderById } from "../controllers/order";

import {
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/admin";

import { auth, adminAuth } from "../middleware/authMiddleware";
const router = express.Router();

// router.route("/").post(auth, placeOrder).get(auth, adminAuth, getOrders);
// router.route("/:id").get(auth, getOrderById);
// router.route("/:id/pay").put(auth, adminAuth, updateOrderToPaid);
// router.route("/:id/deliver").put(auth, adminAuth, updateOrderToDelivered);
// router.route("/myOrder").get(auth, getMyOrder);

router.route("/").post(placeOrder).get(getOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/deliver").put(updateOrderToDelivered);
router.route("/myOrder").get(getMyOrder);

export default router;
