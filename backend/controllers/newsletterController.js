const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  const newSub = new Newsletter({ email });
  await newSub.save();
  res.status(201).json({ message: 'Subscribed successfully!' });
};
