const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
router.get('/', (req, res) => {
  res.send('✅ Auth API is live!');
});
router.post('/register', register);
router.post('/login', login);

module.exports = router;
