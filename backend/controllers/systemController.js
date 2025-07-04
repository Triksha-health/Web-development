// controllers/systemController.js
const Stock = require("../models/Stock");
exports.getStock = async (req, res) => {
  try {
    const stock = await Stock.find({});
    if (!stock || stock.length === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.status(200).json(stock); // full stock array
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving stock",
      error: error.message,
    });
  }
};


// Mock: System metrics
exports.getMetrics = (req, res) => {
  const metrics = {
    conversionRate: "3.2%",
    bounceRate: "48%",
    avgTimeOnSite: "2m 35s"
  };
  res.status(200).json(metrics);
};

// Simple health check
exports.healthCheck = (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy 💪" });
};
