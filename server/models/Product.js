import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Fruits",
      "Vegetables",
      "Dairy",
      "Bakery",
      "Meat",
      "Beverages",
      "Snacks",
      "Other"
    ]
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300"
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  unit: {
    type: String,
    default: "piece",
    enum: ["kg", "g", "l", "ml", "piece", "dozen"]
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.virtual("finalPrice").get(function () {
  return this.price - (this.price * this.discount) / 100;
});

const Product = mongoose.model("Product", productSchema);

// ✅ ES Module export
export default Product;
