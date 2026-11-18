const express = require('express');
const router = express.Router();
const { subscribeToNewsletter } = require('../controllers/newsletterController');

// This router is mounted at /api/newsletter (see server.js), so the path
// below resolves to /api/newsletter/newsletter/subscribe. That doubled path
// is the one that has always been live, and the website posts to it.
router.post('/newsletter/subscribe', subscribeToNewsletter);

// Cleaner alias: /api/newsletter/subscribe. The website can switch to this
// once a backend that includes it has been deployed.
router.post('/subscribe', subscribeToNewsletter);

module.exports = router;
