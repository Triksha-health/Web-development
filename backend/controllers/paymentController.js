const instance = require("../config/razorpay");
const crypto = require("crypto");
exports.createOrder = async (req, res) => {
  const { amount, currency, receipt} = req.body;
  console.log("Incoming createOrder request:");
  console.log("Amount:", amount);
  console.log("Currency:", currency);
  console.log("Receipt:", receipt);
  console.log("Received payment request:", req.body);
  try {
    const options = {
      amount: amount, // amount in paise
      currency,
      receipt,
    };

   const order = await instance.orders.create(options);
    console.log("Razorpay order created:", order);
    res.status(200).json();
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
     });
  }
}
  

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