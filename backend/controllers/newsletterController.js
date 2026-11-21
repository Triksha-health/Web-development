const Newsletter = require('../models/Newsletter');
const { sendMail } = require('../utils/mailer');

// Sent once, when someone joins. Plain text, no claims, and a way out.
const CONFIRMATION_SUBJECT = "You're on the Triksha waitlist";
const CONFIRMATION_TEXT = [
  'Thank you for joining the Triksha waitlist.',
  '',
  'We will email you once, when Triksha is ready for you. We will not send anything else in the meantime.',
  '',
  'Triksha is in development and is not a certified medical device. It does not diagnose, treat or prevent any disease.',
  '',
  'If you did not sign up, or you would like to be removed, reply to this email and we will take you off the list.',
  '',
  'Triksha',
  'VTY Triksha Health Tech Pvt Ltd',
  'https://trikshahealth.com',
].join('\n');

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

    // Confirmation email. Not awaited: the signup is already saved, and the
    // visitor should not wait on (or be failed by) the mail server.
    sendMail({ to: email, subject: CONFIRMATION_SUBJECT, text: CONFIRMATION_TEXT });

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
