export const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

export const adminMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.session.userRole !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  next();
};
