import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

const ORIGIN = process.env.ORIGIN || "http://localhost:3000";

// Middleware
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Grocery System API is running...");
});

// Admin route (example placeholder)
app.get("/api/v1/admin", (req, res) => {
  res.json({ message: "Admin route" });
});

// Seller route (example placeholder)
app.get("/api/v1/seller", (req, res) => {
  res.json({ message: "Seller route" });
});


const PORT = process.env.PORT || 8080;


try {
  await connectDB();
  console.log("Database successfully connected");
  app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log(error);
}