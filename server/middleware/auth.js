import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Attach user info to req.user
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // ✅ Now req.user exists in routes
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(req.session.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Admin Middleware Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
