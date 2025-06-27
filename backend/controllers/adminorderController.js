const Preorder = require("../models/Preorder");

exports.getAllOrders = async (req, res) => {
  const orders = await Preorder.find();
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Preorder.findById(req.params.id);
  res.json(order);
};

exports.updateOrderStatus = async (req, res) => {
  const updated = await Preorder.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json({ success: true, updated });
};

exports.deleteOrder = async (req, res) => {
  await Preorder.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
