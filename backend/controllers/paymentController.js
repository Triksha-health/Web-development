const razorpay = require("../config/razorpay");
const crypto = require("crypto");
exports.createOrder = async (req, res) => {
  const { amount, currency, receipt} = req.body;

  try {
    const options = {
      amount: amount, // amount in paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Error creating Razorpay order", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.verifyOrder = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    // ✅ Store in DB (optional)
    res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};