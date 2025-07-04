const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  stipend: { type: Number },
  availableFrom: { type: Date },
  coverLetter: { type: String },
  resumeUrl: { type: String }, 
}, { timestamps: true })

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
