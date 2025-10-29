import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Grocery System API is running...");
});

// Admin route (example placeholder)
app.get("/api/admin", (req, res) => {
  res.json({ message: "Admin route" });
});

// Seller route (example placeholder)
app.get("/api/seller", (req, res) => {
  res.json({ message: "Seller route" });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
