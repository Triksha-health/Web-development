const Stock = require('../models/Stock');

exports.reduceStock = async (plan, qty = 1) => {
  const stock = await Stock.findOne({ plan });
  if (!stock || stock.quantity < qty) return false;
  stock.quantity -= qty;
  await stock.save();
  return true;
};

exports.restoreStock = async (plan, qty = 1) => {
  const stock = await Stock.findOne({ plan });
  if (stock) {
    stock.quantity += qty;
    await stock.save();
  }
};
