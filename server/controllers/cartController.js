import Cart from "../models/Cart.js";
import Product from "../models/productModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  res.json(cart || { items: [], totalPrice: 0 });
};

// Remove item
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();
  res.json(cart);
};

// Clear cart
export const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.json({ message: "Cart cleared" });
};
