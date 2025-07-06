const express = require('express');
const router = express.Router();
const { getFAQ, updateFAQ, createFAQ } = require('../controllers/faqController');


router.get('/faq', getFAQ);
router.put('/faq/:id', updateFAQ);
router.post('/faq', createFAQ);   // ✅ this is required!


module.exports = router;
