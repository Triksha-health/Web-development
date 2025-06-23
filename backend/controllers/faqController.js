const FAQ = require('../models/FAQ');

// Get all FAQs
exports.getFAQ = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving FAQs' });
  }
};

// Update FAQ (by ID)
exports.updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await FAQ.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating FAQ' });
  }
};
