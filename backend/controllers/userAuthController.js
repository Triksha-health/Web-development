const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer=require('nodemailer')
// ======================
// Register New User
// ======================
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ username, email, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// ======================
// Login User
// ======================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials (user not found)' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials (wrong password)' });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};
// Logout (stateless JWT – frontend clears token)
exports.logout = (req, res) => {
  // In stateless auth, logout is handled client-side
  res.status(200).json({ msg: "Logout successful (token removed from client)" });
};
//reset link
exports.sendResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );

    const resetURL = `https://trikshahealth.com/reset-password/${resetToken}`;

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Reset your Triksha password",
      html: `<p>Click <a href="${resetURL}">here</a> to reset your password. Link expires in 10 minutes.</p>`
    });

    res.status(200).json({ msg: "Reset link sent successfully" });

  } catch (err) {
    console.error("Send reset link error:", err.message);
    res.status(500).json({ msg: "Failed to send reset link" });
  }
};


// Reset password (simple email-based simulation)
exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword)
    return res.status(400).json({ msg: "All fields are required" });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "User with that email not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
