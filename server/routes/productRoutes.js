import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, sellerOrAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(protect, sellerOrAdmin, addProduct);

router.route("/:id")
  .put(protect, sellerOrAdmin, updateProduct)
  .delete(protect, sellerOrAdmin, deleteProduct);

export default router;
