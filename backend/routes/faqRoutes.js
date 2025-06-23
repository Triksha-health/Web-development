const express = require('express');
const router = express.Router();
const { getFAQ, updateFAQ } = require('../controllers/faqController');

router.get('/faq', getFAQ);
router.put('/faq/:id', updateFAQ);

module.exports = router;
