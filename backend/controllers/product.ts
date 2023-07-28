import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc    Fetch a product by id
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.status(200).json(product);
  else {
    res.status(500);
    throw new Error("Resource not found");
  }
});
