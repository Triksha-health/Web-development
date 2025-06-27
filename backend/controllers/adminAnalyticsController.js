const Preorder = require("../models/Preorder");

exports.getOrdersSummary = async (req, res) => {
  const totalOrders = await Preorder.countDocuments();
  const totalRevenue = await Preorder.aggregate([
    { $group: { _id: null, total: { $sum: "$payment.amount" } } },
  ]);
  res.json({
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
  });
};

exports.getDailySales = async (req, res) => {
  const sales = await Preorder.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        total: { $sum: "$payment.amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json(sales);
};

exports.getRefundStats = async (req, res) => {
  const refunds = await Preorder.find({ status: "refunded" });
  res.json({
    count: refunds.length,
    totalRefunded: refunds.reduce((sum, r) => sum + r.payment.amount, 0),
  });
};
