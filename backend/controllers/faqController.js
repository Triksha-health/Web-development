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
    const { question, answer } = req.body;

    if (!question && !answer) {
      return res.status(400).json({ message: 'Provide at least question or answer to update.' });
    }

    const updateData = {};
    if (question !== undefined) updateData.question = question;
    if (answer !== undefined) updateData.answer = answer;

    const updated = await FAQ.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.json({ message: 'FAQ updated successfully', faq: updated });
  } catch (err) {
    console.error('Error updating FAQ:', err);
    res.status(500).json({ message: 'Error updating FAQ' });
  }
};
