const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc    Fetch a product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.status(200).json(product);
  else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

module.exports = { getProducts, getProductById };
