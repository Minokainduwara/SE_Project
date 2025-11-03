import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/order.js";
import multer from "multer";
import { upload } from "../middleware/multer.js";
import { adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});


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

router.delete("/users/:id", adminMiddleware, async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// 🛒 Products

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

router.post("/products", isAdmin, upload.single("image"), async (req, res) => {
    try {
      console.log(req.file); // check if multer got the file
      const { name, description, price, category, stock } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        image,
      });
  
      await product.save();
      res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
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

router.delete("/orders/:id", adminMiddleware, async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json({ message: "Order deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
