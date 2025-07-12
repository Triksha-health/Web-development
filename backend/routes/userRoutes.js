const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  signup,
  login,
  logout,
  sendResetLink,
  resetPassword,
} = require('../controllers/userAuthController');

const {
  getProfile,
  updateProfile,
} = require('../controllers/userProfileController');

const {
  getAllOrders,
  getOrderById,
  getInvoice,
} = require('../controllers/userOrderController');

const {
  initiateCheckout,
  confirmPayment,
  getPaymentStatus,
} = require('../controllers/userPaymentController');

const {
  getNotifications,
} = require('../controllers/userNotificationController');

const {
  updateSettings,
} = require('../controllers/userSettingsController');

// ===============================
// USER AUTH ROUTES
// ===============================
router.post('/signup', signup);                  // Register
router.post('/login', login);                    // Login
router.post('/logout', auth, logout);            // Logout
console.log('resetPassword:', typeof resetPassword); // should be 'function'
console.log('sendResetLink:', typeof sendResetLink); // should be 'function'
console.log("sendResetLink:", sendResetLink); // should not be undefined
router.post('/sendResetLink', sendResetLink);        // Send email with token
router.post('/resetPassword', resetPassword);         // Accept token and new password

// ===============================
// USER PROFILE
// ===============================
router.get('/profile', auth, getProfile);        // View profile
router.patch('/profile', auth, updateProfile);   // Update profile

// ===============================
// ORDER MANAGEMENT
// ===============================
router.get('/orders', auth, getAllOrders);               // All orders
router.get('/orders/:id', auth, getOrderById);          // Single order
router.get('/orders/:id/receipt', auth, getInvoice); // PDF/HTML invoice

// ===============================
// CHECKOUT & PAYMENTS
// ===============================
router.post('/checkout', auth, initiateCheckout);              // Start payment
router.post('/checkout/confirm', auth, confirmPayment);   // Confirm
router.get('/payment-status/:orderId', auth, getPaymentStatus); // Status

// ===============================
// NOTIFICATIONS & SETTINGS
// ===============================
router.get('/notifications', auth, getNotifications);      // Notifications
router.patch('/settings', auth, updateSettings);           // Update user settings

module.exports = router;
