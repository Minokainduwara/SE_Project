// routes/payhereRoutes.js
import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/create-payment", (req, res) => {
  const { order_id, items, amount, first_name, email, phone, address } = req.body;

  const merchant_id = process.env.PAYHERE_MERCHANT_ID;
  const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;

  const hash = crypto
    .createHash("md5")
    .update(
      merchant_id +
        order_id +
        amount.toFixed(2) +
        "LKR" +
        crypto.createHash("md5").update(merchant_secret).digest("hex")
    )
    .digest("hex")
    .toUpperCase();

  const paymentData = {
    sandbox: true,
    merchant_id,
    return_url: "http://localhost:3000/payment-success",
    cancel_url: "http://localhost:3000/payment-cancel",
    notify_url: "http://localhost:5000/api/payments/payhere-notify",
    order_id,
    items,
    amount,
    currency: "LKR",
    first_name,
    email,
    phone,
    address,
    hash,
  };

  res.json(paymentData);
});

export default router;
