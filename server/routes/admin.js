import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/order.js";

const router = express.Router();

const isAdmin = async (req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not authenticated" });
  const user = await User.findById(req.session.userId);
  if (!user || user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  next();
};

// 🧍‍♂️ Users
router.get("/users", isAdmin, async (req, res) => {
  const users = await User.find().select("name email role");
  res.json({ users });
});

router.put("/users/:id", isAdmin, async (req, res) => {
  const { role } = req.body;
  await User.findByIdAndUpdate(req.params.id, { role });
  res.json({ message: "Role updated" });
});

// 🛒 Products
router.get("/products", isAdmin, async (req, res) => {
  const products = await Product.find();
  res.json({ products });
});

router.post("/products", isAdmin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ product });
});

router.put("/products/:id", isAdmin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ product: updated });
});

router.delete("/products/:id", isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// 📦 Orders
router.get("/orders", isAdmin, async (req, res) => {
  const orders = await Order.find().populate("user", "email");
  res.json({ orders });
});

export default router;
