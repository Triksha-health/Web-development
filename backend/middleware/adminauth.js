const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") throw new Error();
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
