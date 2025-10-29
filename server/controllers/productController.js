import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  const products = await Product.find().populate("seller", "name email");
  res.json(products);
};

// Add product (seller only)
export const addProduct = async (req, res) => {
  const { name, image, category, price, stock, description } = req.body;

  const product = new Product({
    name,
    image,
    category,
    price,
    stock,
    description,
    seller: req.user._id
  });

  const created = await product.save();
  res.status(201).json(created);
};

// Update or delete products (only their own)
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.seller.toString() === req.user._id.toString()) {
    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(403).json({ message: "Not authorized to update this product" });
  }
};
