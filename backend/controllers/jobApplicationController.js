const JobApplication = require('../models/JobApplication');

exports.submitApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      position,
      stipend,
      availableFrom,
      coverLetter
    } = req.body;

    const resumeUrl = req.file?.path || ''; // Will be added via multer

    const application = new JobApplication({
      userId: req.user.id,
      fullName,
      email,
      position,
      stipend,
      availableFrom,
      coverLetter,
      resumeUrl,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit application", error: error.message });
  }
};