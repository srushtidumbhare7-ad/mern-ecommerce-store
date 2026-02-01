const Product = require("../models/Product");

// CREATE PRODUCT (ADMIN)
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// DELETE PRODUCT (ADMIN)
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Invalid product ID" });
  }
};
