const express = require('express');
const passport = require('passport');
const router = express.Router();
const { googleAuthCallback } = require('../controllers/googleAuthController');

// Start Google Login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleAuthCallback
);


module.exports = router;
