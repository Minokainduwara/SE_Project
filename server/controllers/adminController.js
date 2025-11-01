import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]);
    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales: totalSales[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
