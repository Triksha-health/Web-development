const PreOrder = require("../models/Preorder");

exports.submitPreOrder = async (req, res) => {
  try {
     console.log("📥 Received pre-order request:", req.body); // ✅ Add this line
    const { plan, shipping, payment } = req.body;

    const preOrder = new PreOrder({
      plan,
      shipping,
      payment: {
        cardLast4: payment.cardNumber.slice(-4),
        expirationDate: payment.expirationDate,
        saveCard: payment.saveCard,
      },
    });

    await preOrder.save();
    res.status(201).json({ success: true, message: "Pre-order saved!" });
  } catch (error) {
    console.error("Error saving preorder:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
