const JobApplication = require('../models/JobApplication');

exports.submitApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      position,
      stipend,
      availableFrom,
      coverLetter,
    } = req.body;

    const resumeUrl = req.file ? req.file.path : "";

    const newApplication = new JobApplication({
      userId: req.user?.id || null,
      fullName,
      email,
      position,
      stipend,
      availableFrom,
      coverLetter,
      resumeUrl,
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
};
