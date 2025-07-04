//for stock persistant
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  plan: {
    type: String,
    enum: ['early', 'standard'],
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Stock', stockSchema);
