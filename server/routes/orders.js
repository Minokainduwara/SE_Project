import express from "express";
import mongoose from "mongoose";
import Order from "../models/order.js";
import Product from "../models/Product.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

// 🛒 Create a new order
router.post("/", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validate cart
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
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
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      // Build order item
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      // Calculate total
      totalAmount += product.price * item.quantity;

      // Deduct stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    // Create order
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: "Pending",
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 👤 Get logged-in user's orders
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    console.error("Fetching user orders failed:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 👑 Get all orders (Admin only)
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    console.error("Fetching all orders failed:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✏️ Update order status (Admin only)
router.patch("/:id/status", adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

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
    console.error("Updating order status failed:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
