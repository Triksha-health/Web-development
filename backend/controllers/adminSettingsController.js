exports.getSettings = (req, res) => {
  res.json({
    preorderEnabled: true,
    paymentGateway: "razorpay",
    maskedKey: process.env.RAZORPAY_KEY_ID?.slice(0, 5) + "*****",
  });
};

exports.updateSettings = (req, res) => {
  // this would usually update config in DB
  res.json({ message: "Settings updated (mock)" });
};
