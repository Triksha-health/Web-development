const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
  if (!order) return res.status(404).json({ message: "Not found" });
  res.json(order);
};

exports.getInvoice = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Invoice not found" });

  // Simulating invoice generation
  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(`Invoice for Order #${order._id}`));
};
