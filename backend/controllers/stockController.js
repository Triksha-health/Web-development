const Stock = require("../models/Stock");

exports.getStockByPlan = async (req, res) => {
  const { plan } = req.params;
  try {
    const stock = await Stock.findOne({ plan });
    if (!stock) {
      return res.status(404).json({ message: "Stock plan not found" });
    }
    res.status(200).json({ quantity: stock.quantity });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stock", error: err.message });
  }
};
