const express = require("express");
const router = express.Router();
const { getMetrics, healthCheck } = require("../controllers/systemController");

router.get("/metrics", getMetrics);
router.get("/health", healthCheck);

module.exports = router;
