const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashed });
  res.status(201).json({ message: "User created" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.logout = (req, res) => {
  res.json({ message: "User logged out" });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed });
  res.json({ message: "Password reset successful" });
};
