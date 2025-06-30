// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminmiddleware= require('../middleware/adminauth');

const adminAuth = require("../controllers/adminController");
const adminOrders = require("../controllers/adminorderController");
const adminPayments = require("../controllers/adminPaymentController");
const adminUsers = require("../controllers/adminUserController");
const adminAnalytics = require("../controllers/adminAnalyticsController");
const adminSettings = require("../controllers/adminSettingsController");

// Protect all admin routes
router.get('/profile', adminAuth, (req, res) => {
  res.json({ msg: "Welcome Admin", adminId: req.user.id });
});


// ✅ Admin Auth
router.post("/admin/login", adminAuth.login);
router.post("/admin/logout", adminAuth.logout);
router.get("/admin/profile", adminAuth.getProfile);

// ✅ Orders Management
router.get("/admin/orders", adminOrders.getAllOrders);
router.get("/admin/orders/:id", adminOrders.getOrderById);
router.patch("/admin/orders/:id", adminOrders.updateOrderStatus);
router.delete("/admin/orders/:id", adminOrders.deleteOrder);

// ✅ Payments / Razorpay Integration
router.get("/admin/payment-status/:orderId", adminPayments.getPaymentStatus);
router.post("/admin/refund/:orderId", adminPayments.refundOrder);

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