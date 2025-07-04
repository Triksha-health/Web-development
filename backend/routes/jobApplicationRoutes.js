const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const { submitApplication } = require('../controllers/jobApplicationController');

router.post('/apply', auth, upload.single('resume'), submitApplication);

module.exports = router;