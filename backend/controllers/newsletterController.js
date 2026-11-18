const Newsletter = require('../models/Newsletter');

const AUDIENCES = ['self', 'family', 'clinician'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.subscribeToNewsletter = async (req, res) => {
  const rawEmail = req.body && req.body.email;
  const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  // Ignore anything that isn't one of the known options rather than failing the signup.
  const joiningFor = AUDIENCES.includes(req.body.joiningFor) ? req.body.joiningFor : undefined;

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already subscribed' });
    }

    await Newsletter.create({ email, joiningFor });

    res.status(200).json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    // Two requests for the same address at once: the unique index rejects the second.
    if (err && err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already subscribed' });
    }
    console.error('Subscription error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
