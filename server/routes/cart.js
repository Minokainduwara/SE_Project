import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get cart
router.get("/", (req, res) => {
  const cart = req.session.cart || [];
  res.json({ cart });
});

// Add to cart
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    if (!req.session.cart) req.session.cart = [];

    const existingItemIndex = req.session.cart.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex > -1) {
      req.session.cart[existingItemIndex].quantity += quantity;
    } else {
      req.session.cart.push({
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    res.json({ message: "Added to cart", cart: req.session.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update cart item
router.put("/update", (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!req.session.cart)
      return res.status(404).json({ message: "Cart is empty" });

    const itemIndex = req.session.cart.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      req.session.cart.splice(itemIndex, 1);
    } else {
      req.session.cart[itemIndex].quantity = quantity;
    }

    res.json({ message: "Cart updated", cart: req.session.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove from cart
router.delete("/remove/:productId", (req, res) => {
  try {
    if (!req.session.cart)
      return res.status(404).json({ message: "Cart is empty" });

    req.session.cart = req.session.cart.filter(
      (item) => item.productId !== req.params.productId
    );

    res.json({ message: "Item removed", cart: req.session.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Clear cart
router.delete("/clear", (req, res) => {
  req.session.cart = [];
  res.json({ message: "Cart cleared" });
});

export default router;
