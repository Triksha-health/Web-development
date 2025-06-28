const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.initiateCheckout = async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`
  };
  const order = await instance.orders.create(options);
  res.json(order);
};

exports.confirmPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body).digest('hex');

  if (expected !== razorpay_signature)
    return res.status(400).json({ success: false, message: "Invalid signature" });

  res.json({ success: true, message: "Payment verified" });
};

exports.getPaymentStatus = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  res.json({ status: order?.status || "not found" });
};