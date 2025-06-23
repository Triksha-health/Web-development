// controllers/systemController.js

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
