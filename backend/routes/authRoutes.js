const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { register, login, verifyOtp} = require('../controllers/authController');


router.get('/', (req, res) => res.send('✅ Auth API is live!'));
router.post('/register', signup);
router.post('/login', login);
router.post('/send-reset-link', sendResetLink);
router.post('/reset-password', resetPassword);


// ===============================
// OTP SETUP
// ===============================
const Otp = require('../models/otp'); //this will store otp in mongodb

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
    // Saves otp to DB or (overwrites if exists)
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );
    await transporter.sendMail({

      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Your OTP for Triksha Sign-Up',
      html: `<p>Your OTP is: <b>${otp}</b></p><p>It will expire in 5 minutes.</p>`,
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// ===============================
// VERIFY OTP
// ===============================
router.post('/verify-otp', verifyOtp);


module.exports = router;