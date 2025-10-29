import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
