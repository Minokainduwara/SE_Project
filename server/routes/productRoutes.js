import express from "express";
import { getProducts, addProduct, updateProduct } from "../controllers/productController.js";
import { protect, sellerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, sellerOnly, addProduct);
router.put("/:id", protect, sellerOnly, updateProduct);

export default router;
