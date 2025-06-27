const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
  }
};

exports.getAdminProfile = (req, res) => {
  res.status(200).json({ role: "admin", message: "Admin profile accessed" });
};

exports.adminLogout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
