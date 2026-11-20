const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { submitContactForm } = require('../controllers/contactController');

// A few messages an hour from one address is plenty for a real person.
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages. Please try again later.' },
});

router.post('/contact', contactLimiter, submitContactForm);

module.exports = router;
