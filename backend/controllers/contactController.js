const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ success: true, message: 'Contact form submitted!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
