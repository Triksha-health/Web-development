const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Otp = require('../models/Otp');
const { signup, login, sendResetLink, resetPassword } = require('../controllers/authController');

router.get('/', (req, res) => res.send('✅ Auth API is live!'));
router.post('/register', signup);
router.post('/login', login);
router.post('/send-reset-link', sendResetLink);
router.post('/reset-password', resetPassword);

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.deleteMany({ email });
  await Otp.create({ email, otp, expiresAt });

  try {
    await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    }).sendMail({
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

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

  const record = await Otp.findOne({ email, otp });
  if (!record) return res.status(400).json({ message: 'Invalid OTP' });
  if (record.expiresAt < Date.now()) return res.status(400).json({ message: 'OTP has expired' });

  await Otp.deleteMany({ email });
  res.json({ message: 'OTP verified successfully' });
});

module.exports = router;