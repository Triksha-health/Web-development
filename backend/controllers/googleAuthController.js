//Google Auth Controller

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.googleAuthCallback = async (req, res) => {
  try {
    const googleUser = req.user;

    // Normalize email
    const email = googleUser.emails[0].value.toLowerCase();

    // Look for existing user
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        username: googleUser.displayName, // uses schema's 'username' field
        email,
        googleId: googleUser.id,
        avatar: googleUser.photos[0].value,
      });
    }
    const token = generateToken(user);
    console.log('Generated user for token:', user);

    // Redirect to frontend with token in query param
   const redirectURL = `https://trikshahealth.com/userdashboard?token=${token}`;
    res.redirect(redirectURL);
  } catch (err) {
    console.error("❌ Google Auth Error:", err.message);
    res.status(500).json({ message: 'Google authentication failed' });
  }
};