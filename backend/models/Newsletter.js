const mongoose = require('mongoose');

// Waitlist signups from the website ("Join the waitlist" form).
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  // Who the person is joining for. Optional so entries made before this
  // field existed, and older clients that don't send it, remain valid.
  joiningFor: {
    type: String,
    enum: ['self', 'family', 'clinician'],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
