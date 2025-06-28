const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const updates = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
  res.json(updatedUser);
};
