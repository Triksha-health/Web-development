const mongoose = require('mongoose');

const PreorderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['early', 'standard'],
    required: true
  },
  shipping: {
    fullName: String,
    email: String,
    phoneNumber: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  payment: {
    orderId: String,
    paymentId: String,
    status: {
      type: String,
      enum: ['Success', 'Refunded'],
      default: 'Success'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Preorder', PreorderSchema);
