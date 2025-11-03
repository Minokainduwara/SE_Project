
import Order from "../models/order.js";
import Product from "../models/Product.js";

//  Create Order
export const createOrder = async (req, res) => {
    try {
      const { items } = req.body;
      if (!items || items.length === 0)
        return res.status(400).json({ message: "No items provided" });
  
      let totalAmount = 0;
  
      // Validate stock and calculate total
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product)
          return res.status(404).json({ message: `Product not found: ${item.product}` });
  
        if (product.stock < item.quantity) {
          return res.status(400).json({
            message: `Not enough stock for product: ${product.name}`,
          });
        }
  
        totalAmount += product.price * item.quantity;
      }
  
      // Deduct stock after validation
      for (const item of items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }
  
      // Create the order
      const order = await Order.create({
        user: req.user._id,
        items,
        totalAmount,
      });
  
      res.status(201).json({
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

//  Get Customer Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Admin get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
