import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/payhere-notify", (req, res) => {
  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = req.body;

  const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;

  // Generate verification signature
  const localMd5sig = crypto
    .createHash("md5")
    .update(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        crypto.createHash("md5").update(merchant_secret).digest("hex")
    )
    .digest("hex")
    .toUpperCase();

  if (localMd5sig === md5sig && parseInt(status_code) === 2) {
    console.log(`Payment successful for Order ID: ${order_id}`);

  } else {
    console.log(`Invalid or failed payment for Order ID: ${order_id}`);
  }

  res.sendStatus(200);
});

export default router;
