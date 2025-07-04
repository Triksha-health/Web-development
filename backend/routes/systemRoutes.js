const express = require("express");
const router = express.Router();
const { getMetrics, healthCheck } = require("../controllers/systemController");
const { getStock } = require("../controllers/systemController");

router.get("/metrics", getMetrics);
router.get("/health", healthCheck);
router.get("/stock", getStock);

module.exports = router;
