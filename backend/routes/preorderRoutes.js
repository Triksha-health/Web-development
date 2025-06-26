const express = require("express");
const router = express.Router();

const {
  createPreorder,
  getUserPreorders,
  cancelPreorder
} = require("../controllers/preorderController");

router.post("/", createPreorder); // POST /api/preorder
router.get("/:userId", getUserPreorders); // GET /api/preorder/:userId
router.delete("/:orderId", cancelPreorder); // DELETE /api/preorder/:orderId

module.exports = router;
