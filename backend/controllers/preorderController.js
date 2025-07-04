const Preorder = require('../models/Preorder');
const Razorpay = require('razorpay');
const stockServices = require('../services/stockServices');
require('dotenv').config();

// 1. CREATE preorder after payment verification
exports.createPreorder = async (req, res) => {
  try {
    const { userId, plan, shipping, razorpayDetails } = req.body;
       
    const stockAvailable = await stockServices.reduceStock(plan, 1);
    if (!stockAvailable) {
      return res.status(400).json({ message: "Out of stock" });
    }


    const preorder = new Preorder({
      userId,
      plan,
      shipping,
      payment: {
        orderId: razorpayDetails.orderId,
        paymentId: razorpayDetails.paymentId,
        status: "confirmed"
      }
    });

    await preorder.save();
    res.status(201).json({ message: "Preorder saved successfully", preorder });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// 2. GET preorders for a user
exports.getUserPreorders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Preorder.find({ userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching preorders" });
  }
};

// 3. DELETE preorder and refund
exports.cancelPreorder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Preorder.findById(orderId);

    if (!order){ return res.status(404).json({ message: "Order not found" });
    }
    if (order.payment.status === 'confirmed') {
      await stockServices.restoreStock(order.plan, 1);
    }
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const refund = await razorpay.payments.refund(order.payment.paymentId);

    order.payment.status = "Refunded";
    await order.save();
     await Preorder.findByIdAndDelete(orderId);
    res.status(200).json({
      success: true,
      message: "Order cancelled, stock restored, and refund processed.",
      refund
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to cancel preorder", error: error.message });
  }
};
