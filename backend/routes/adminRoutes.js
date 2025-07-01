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
router.post("/admin/login", adminController.adminLogin);
router.get("/admin/profile", adminController.getAdminProfile);
router.post("/admin/logout", adminController.adminLogout);

// ✅ Orders Management
router.get("/admin/orders", adminOrders.getAllOrders);
router.get("/admin/orders/:id", adminOrders.getOrderById);
router.patch("/admin/orders/:id", adminOrders.updateOrderStatus);
router.delete("/admin/orders/:id", adminOrders.deleteOrder);

// ✅ Payments / Razorpay Integration
router.get("/admin/payment-status/:orderId", adminPayments.getPaymentStatus);
router.post("/admin/refund/:orderId", adminPayments.initiateRefund);

// ✅ User Management
router.get("/admin/users", adminUsers.getAllUsers);
router.get("/admin/users/:id", adminUsers.getUserById);

// ✅ Analytics
router.get("/admin/analytics/orders-summary", adminAnalytics.getOrdersSummary);
router.get("/admin/analytics/daily-sales", adminAnalytics.getDailySales);
router.get("/admin/analytics/refunds", adminAnalytics.getRefundStats);

// ✅ Settings
router.get("/admin/settings", adminSettings.getSettings);
router.patch("/admin/settings", adminSettings.updateSettings);

module.exports = router;