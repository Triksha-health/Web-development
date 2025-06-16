import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PreOrderConfirmationProps {
  triksha: "early" | "standard";
}

const PreOrderConfirmation: React.FC<PreOrderConfirmationProps> = ({ triksha }) => {
  const shippingdays = triksha === "early" ? 30 : 45;
  const isEarlyBird = triksha === "early";
  const price = isEarlyBird ? "₹14,999" : "₹17,999";
  const productName = isEarlyBird ? "Triksha - Early Bird" : "Triksha - Standard";

  return (
    <div className="lg:w-1/2 mx-auto bg-white rounded-lg shadow-lg p-10 mt-10">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary-500" />
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Pre-Order is Confirmed!</h1>
        <p className="text-gray-600">Thank you for pre-ordering Triksha. We've sent a confirmation to your email.</p>
      </div>

      {/* Order Summary */}
      <div className="mb-8 rounded-lg bg-gray-50 p-6">
        <h2 className="text-base font-bold text-gray-700 mb-4">Order Summary</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-base">
            <span className=" text-gray-700">{productName}</span>
            <span className="font-semibold text-gray-700">{price}</span>
          </div>

          <div className="flex justify-between items-center text-base">
            <span className="text-gray-700">Shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <span className="text-lg font-bold text-gray-800">{price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-800 mb-4">What's Next?</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-700">Order Confirmation</h3>
              <p className="text-sm text-gray-600">You'll receive an email with your order details.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-700">Production Updates</h3>
              <p className="text-sm text-gray-600">We'll keep you informed about production milestones.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-700">Shipping Notification</h3>
              <p className="text-sm text-gray-600">Your Triksha will ship in approximately {shippingdays} days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full justify-between gap-4">
        <Link to={"/signin"} className="btn-primary w-1/2">
          Create an Account
        </Link>
        <Link to={"/"} className="btn-outline w-1/2">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default PreOrderConfirmation;
