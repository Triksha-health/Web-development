const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Hospital, clinic or company, if the sender gave one.
  organisation: String,
  // What the message is about. "pilot" comes from the clinical pilot form.
  topic: { type: String, enum: ['pilot', 'general'], default: 'general' },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
