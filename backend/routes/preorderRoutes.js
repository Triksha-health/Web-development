const express = require("express");
const router = express.Router();

const {
  createPreorder,
  getUserPreorders,
  cancelPreorder
} = require("../controllers/preorderController");

router.post("/submit", (req, res, next) => {
  console.log("📬 /api/preorder/submit hit");
  next(); // pass control to the actual controller
}, createPreorder);
router.get("/:userId", getUserPreorders); // GET /api/preorder/:userId
router.delete("/:orderId", cancelPreorder); // DELETE /api/preorder/:orderId

module.exports = router;
