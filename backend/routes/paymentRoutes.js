const express = require("express");
const router = express.Router();
const { createOrder, verifyOrder } = require("../controllers/paymentController");

router.post("/create", createOrder);
router.post("/verify", verifyOrder);

module.exports = router;
