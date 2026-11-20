const nodemailer = require('nodemailer');

/**
 * One place for sending email. Uses the same SMTP settings as the sign-up
 * OTP emails (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL).
 *
 * Sending never throws. If email is not set up, or the mail server refuses,
 * the caller gets { sent: false } and carries on: a waitlist signup or a
 * contact message must still be saved even when the email cannot go out.
 */
let transporter = null;

function isConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.FROM_EMAIL
  );
}

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 587;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // 465 is the always-encrypted port; others upgrade after connecting
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

async function sendMail({ to, subject, text, replyTo }) {
  if (!isConfigured()) return { sent: false, reason: 'not-configured' };
  try {
    await getTransporter().sendMail({ from: process.env.FROM_EMAIL, to, subject, text, replyTo });
    return { sent: true };
  } catch (err) {
    // Log the reason, never the message body or the address list.
    console.error('Email could not be sent:', err && err.message);
    return { sent: false, reason: 'send-failed' };
  }
}

/** Where messages for the team go. Falls back to the sending address. */
function teamInbox() {
  return process.env.TEAM_INBOX_EMAIL || process.env.FROM_EMAIL;
}

module.exports = { sendMail, isConfigured, teamInbox };
