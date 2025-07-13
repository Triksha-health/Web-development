const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  console.log("Signing token for:", user.email); // debug log
  console.log("With secret:", process.env.JWT_SECRET); // debug log

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // 7 days validity
    }
  );
};
console.log("Generating token with secret:", process.env.JWT_SECRET);

module.exports = generateToken;
