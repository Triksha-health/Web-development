const express = require("express");
const router = express.Router();
const { submitPreOrder } = require("../controllers/preOrderController");

router.post("/submit", (req, res, next) => {
  console.log("📬 /api/preorder/submit hit");
  next(); // pass control to the controller
}, submitPreOrder);


module.exports = router;
