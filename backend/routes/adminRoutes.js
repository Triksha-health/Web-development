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
const adminWaitlist = require("../controllers/adminWaitlistController");

// Signing in and out are the only admin routes open to everyone.
router.post("/login", adminController.adminLogin);
router.post("/logout", adminController.adminLogout);

// Everything below this line needs a valid admin token (sent as
// "Authorization: Bearer <token>", the token returned by /login). Without
// this, anyone on the internet could list users and orders, change
// settings or start refunds.
router.use(adminmiddleware);

router.get("/profile", adminController.getAdminProfile);

// Waitlist signups and contact form messages
router.get("/waitlist", adminWaitlist.getWaitlist);
router.get("/waitlist.csv", adminWaitlist.getWaitlistCsv);
router.get("/contacts", adminWaitlist.getContacts);

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