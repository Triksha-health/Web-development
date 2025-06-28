const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: 'INR',
    },

    status: {
      type: String,
      enum: ['created', 'paid', 'failed', 'refunded'],
      default: 'created',
    },

    receipt: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
    },

    razorpayOrderId: {
      type: String,
      required: true,
    },

    refundId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
