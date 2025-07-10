const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { submitApplication } = require("../controllers/jobApplicationController");

// Optional: add `auth` middleware if user should be logged in
router.post("/", upload.single("resume"), submitApplication);

module.exports = router;
