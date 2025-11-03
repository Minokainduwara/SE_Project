import express from "express";
import mongoose from "mongoose";
import Order from "../models/order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { adminMiddleware } from "../middleware/auth.js";
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// 🛡 Middleware to attach user from session
const attachUser = async (req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not authenticated" });

  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🛒 Create order
router.post("/", attachUser, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) return res.status(400).json({ message: "Cart is empty" });
    if (!shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.zipCode) {
      return res.status(400).json({ message: "Incomplete shipping address" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({ message: `Product ${item.name} not found` });
      }
      if (product.stock < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save({ session });
    }

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: "pending"
    });

    await order.save({ session });
    await session.commitTransaction();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    session.endSession();
  }
});


// 👤 Get logged-in user orders
router.get("/my-orders", attachUser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Cancel order
router.patch("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    // 🧮 Restore stock for each product in the cancelled order
    for (const item of order.items) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    // 🚫 Mark the order as cancelled
    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled and stock restored successfully", order });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Server error while cancelling order" });
  }
});




// 👑 Admin: get all orders
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✏️ Update order status (Admin)
router.patch("/:id/status", adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    const newStatus = status.toLowerCase();

    if (!validStatuses.includes(newStatus)) return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findByIdAndUpdate(req.params.id, { status: newStatus }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
