const Newsletter = require('../models/Newsletter');

exports.subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already subscribed' });
    }

    await Newsletter.create({ email });

    res.status(200).json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    console.error('Subscription error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
