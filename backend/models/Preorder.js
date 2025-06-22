const mongoose = require("mongoose");

const PreOrderSchema = new mongoose.Schema({
  plan: {
    type: String,
    enum: ["early", "standard"],
    required: true,
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
    cardLast4: String,
    expirationDate: String,
    saveCard: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PreOrder", PreOrderSchema);
