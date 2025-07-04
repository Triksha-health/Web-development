// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminmiddleware= require('../middleware/adminaut');

const adminController = require("../controllers/adminController");
const adminOrders = require("../controllers/adminorderController");
const adminPayments = require("../controllers/adminPaymentController");
const adminUsers = require("../controllers/adminUserController");
const adminAnalytics = require("../controllers/adminAnalyticsController");
const adminSettings = require("../controllers/adminSettingsController");

router.get('/profile', adminmiddleware, (req, res) => {
  res.json({ msg: "Welcome Admin", adminId: req.user.id });
});
console.log("adminLogin:", typeof adminController.adminLogin);
console.log("adminLogout:", typeof adminController.adminLogout);


// ✅ Admin Auth
router.post("/login", adminController.adminLogin);
router.get("/profile", adminController.getAdminProfile);
router.post("/logout", adminController.adminLogout);

// ✅ Orders Management
router.get("/orders", adminOrders.getAllOrders);
router.get("/orders/:id", adminOrders.getOrderById);
router.patch("/orders/:id", adminOrders.updateOrderStatus);
router.delete("/orders/:id", adminOrders.deleteOrder);

// ✅ Payments / Razorpay Integration
router.get("/payment-status/:orderId", adminPayments.getPaymentStatus);
router.post("/refund/:orderId", adminPayments.initiateRefund);

// ✅ User Management
router.get("/users", adminUsers.getAllUsers);
router.get("/users/:id", adminUsers.getUserById);

// ✅ Analytics
router.get("/analytics/orders-summary", adminAnalytics.getOrdersSummary);
router.get("/analytics/daily-sales", adminAnalytics.getDailySales);
router.get("/analytics/refunds", adminAnalytics.getRefundStats);

// ✅ Settings
router.get("/settings", adminSettings.getSettings);
router.patch("/settings", adminSettings.updateSettings);

module.exports = router;