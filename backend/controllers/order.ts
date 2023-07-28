import asyncHandler from "express-async-handler";
import Order, { OrderZSchema } from "../models/orderModel";
import { z } from "zod";
// @desc    Place Order
// @route   POST /api/orders
// @access  Private
export const placeOrder = asyncHandler(async (req, res) => {
  const isValidRequest = OrderZSchema.safeParse(req.body).success;
  if (!isValidRequest) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const orderContent = req.body as z.infer<typeof OrderZSchema>;
  const newOrder = new Order({
    // userId: req["user"]["_id"],
    userId: "64b242542c6ccb922b434a22",
    ...orderContent,
  });
  const createdOrder = await newOrder.save();
  res.status(200).json(createdOrder);
});

// @desc    Get logged in user's order
// @route   GET /api/orders/myOrder
// @access  Private
export const getMyOrder = asyncHandler(async (req, res) => {
  // const orders = await Order.find({ user: req["user"]["userId"] });
  const orders = await Order.find({ userId: "64b242542c6ccb922b434a22" });
  res.status(200).json(orders);
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("userId", "name email")
    .populate({
      path: "orderItems",
      populate: "productId",
      select: "_id name image price",
    });
  if (!order) {
    res.status(500);
    throw new Error("Order not found");
  }
  res.status(200).json(order);
});
