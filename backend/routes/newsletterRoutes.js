const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { subscribeToNewsletter } = require('../controllers/newsletterController');

// A person signs up once. This stops a script from flooding the list (and,
// through the confirmation email, other people's inboxes).
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please try again later.' },
});

// This router is mounted at /api/newsletter (see server.js), so the path
// below resolves to /api/newsletter/newsletter/subscribe. That doubled path
// is the one that has always been live, and the website posts to it.
router.post('/newsletter/subscribe', signupLimiter, subscribeToNewsletter);

// Cleaner alias: /api/newsletter/subscribe. The website can switch to this
// once a backend that includes it has been deployed.
router.post('/subscribe', signupLimiter, subscribeToNewsletter);

module.exports = router;
