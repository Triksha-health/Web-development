const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { register, login, verifyOtp } = require('../controllers/authController');

const Otp = require('../models/Otp'); // Add this at top
// ===============================
// BASIC AUTH ROUTES
// ===============================
router.get('/', (req, res) => {
  res.send('✅ Auth API is live!');
});

router.post('/register', register);
router.post('/login', login);

// ===============================
// OTP SETUP
// ===============================


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ===============================
// SEND OTP
// ===============================
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry


  try {
    // Save to DB (overwrite if exists)
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Your OTP for Triksha Sign-Up',
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP is: <b>${otp}</b></p><p>It will expire in 5 minutes.</p>`,
    });

    console.log(`✅ OTP ${otp} sent to ${email}`);
    return res.json({ message: 'OTP sent to your email' });

  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// ===============================
// VERIFY OTP
// ===============================
router.post('/verify-otp', verifyOtp);
module.exports = router;