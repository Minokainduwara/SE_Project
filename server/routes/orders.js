import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!req.session.cart || req.session.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of req.session.cart) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.name} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.session.userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    req.session.cart = [];

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user orders
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.userId })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders (Admin)
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update order status (Admin)
router.patch("/:id/status", adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
