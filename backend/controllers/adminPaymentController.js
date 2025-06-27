const Razorpay = require("razorpay");

exports.getPaymentStatus = async (req, res) => {
  // Fetch from Razorpay
  res.json({ status: "mock_paid" });
};

exports.initiateRefund = async (req, res) => {
  // Call Razorpay refund API
  res.json({ success: true, message: "Refund initiated" });
};
