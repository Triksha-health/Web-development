const express = require("express");
const router = express.Router();
const { getStockByPlan } = require("../controllers/stockController");

router.get("/:plan", getStockByPlan); // GET /api/stock/early

module.exports = router;
