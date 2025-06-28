// controllers/userSettingsController.js
const User = require('../models/User'); // Assuming your User model contains a `settings` field

// PATCH /user/settings
exports.updateSettings = async (req, res) => {
  const userId = req.user.id;
  const { settings } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { settings } },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password field

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully.',
      settings: updatedUser.settings,
    });
  } catch (err) {
    console.error('Error updating user settings:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};