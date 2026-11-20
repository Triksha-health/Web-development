const Newsletter = require('../models/Newsletter');
const Contact = require('../models/Contact');

const AUDIENCE_LABEL = { self: 'Myself', family: 'A family member', clinician: 'A clinician' };

/** Everyone on the waitlist, newest first, with a count per audience. */
exports.getWaitlist = async (req, res) => {
  try {
    const items = await Newsletter.find({}, { email: 1, joiningFor: 1, subscribedAt: 1, _id: 0 })
      .sort({ subscribedAt: -1 })
      .lean();
    const byAudience = { self: 0, family: 0, clinician: 0, unknown: 0 };
    for (const item of items) {
      byAudience[item.joiningFor && item.joiningFor in byAudience ? item.joiningFor : 'unknown']++;
    }
    res.json({ total: items.length, byAudience, items });
  } catch (err) {
    console.error('Waitlist list error:', err && err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// A cell that starts with = + - or @ can be run as a formula by spreadsheet
// programs. Prefixing it with a quote makes it plain text.
const csvCell = (value) => {
  let text = value === undefined || value === null ? '' : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
};

/** The same list as a spreadsheet file. */
exports.getWaitlistCsv = async (req, res) => {
  try {
    const items = await Newsletter.find({}, { email: 1, joiningFor: 1, subscribedAt: 1, _id: 0 })
      .sort({ subscribedAt: -1 })
      .lean();
    const rows = [['Email', 'Joining for', 'Joined on'].map(csvCell).join(',')];
    for (const item of items) {
      rows.push(
        [
          item.email,
          AUDIENCE_LABEL[item.joiningFor] || 'Not recorded',
          item.subscribedAt ? new Date(item.subscribedAt).toISOString() : '',
        ]
          .map(csvCell)
          .join(',')
      );
    }
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="triksha-waitlist.csv"');
    res.send('﻿' + rows.join('\r\n')); // leading mark so Excel reads it as UTF-8
  } catch (err) {
    console.error('Waitlist export error:', err && err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/** Messages sent through the contact form, newest first. */
exports.getContacts = async (req, res) => {
  try {
    const items = await Contact.find({}, { name: 1, email: 1, organisation: 1, topic: 1, message: 1, createdAt: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();
    res.json({ total: items.length, items });
  } catch (err) {
    console.error('Contact list error:', err && err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
