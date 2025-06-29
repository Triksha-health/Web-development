const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure User model exists
const generateToken = require('../utils/generateToken'); // helper for JWT

exports.googleAuthCallback = async (req, res) => {
  try {
    const googleUser = req.user;

    const existingUser = await User.findOne({ email: googleUser.emails[0].value });

    let user;
    if (existingUser) {
      user = existingUser;
    } else {
      // Create new user
      user = await User.create({
        name: googleUser.displayName,
        email: googleUser.emails[0].value,
        googleId: googleUser.id,
        avatar: googleUser.photos[0].value,
      });
    }

    const token = generateToken(user._id); // JWT token

    // Redirect with token or send JSON
    res.redirect(`https://your-frontend-url.com/dashboard?token=${token}`);
    // or: res.json({ success: true, token, user });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: 'Google authentication failed' });
  }
};
