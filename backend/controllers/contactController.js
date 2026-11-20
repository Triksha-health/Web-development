const Contact = require('../models/Contact');
const { sendMail, teamInbox } = require('../utils/mailer');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = ['pilot', 'general'];

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

/**
 * Contact form. Used by the "Talk to us about the pilot" form on the website.
 * Saves the message, then tells the team by email if email is set up.
 */
exports.submitContactForm = async (req, res) => {
  const body = req.body || {};

  // "website" is a hidden field real visitors never see or fill in. Automated
  // form-fillers do. Answer as if it worked, and keep nothing.
  if (clean(body.website, 200)) {
    return res.status(201).json({ success: true, message: 'Contact form submitted!' });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const organisation = clean(body.organisation, 160);
  const message = clean(body.message, 4000);
  const topic = TOPICS.includes(body.topic) ? body.topic : 'general';

  if (!name) return res.status(400).json({ success: false, message: 'Please enter your name' });
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }
  if (!message) return res.status(400).json({ success: false, message: 'Please enter a message' });

  try {
    await Contact.create({ name, email, organisation, message, topic });
  } catch (error) {
    console.error('Contact form error:', error && error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }

  // Tell the team. Not awaited: the visitor should not wait on the mail server,
  // and the message is already saved either way.
  sendMail({
    to: teamInbox(),
    replyTo: email,
    subject: topic === 'pilot' ? `Clinical pilot enquiry from ${name}` : `Website message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      organisation ? `Hospital or organisation: ${organisation}` : null,
      '',
      message,
      '',
      'Sent from the contact form on trikshahealth.com. Reply to this email to answer them.',
    ]
      .filter((line) => line !== null)
      .join('\n'),
  });

  res.status(201).json({ success: true, message: 'Contact form submitted!' });
};
