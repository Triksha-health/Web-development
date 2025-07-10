const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  fullName: String,
  email: String,
  position: String,
  stipend: String,
  availableFrom: String,
  coverLetter: String,
  resumeUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
