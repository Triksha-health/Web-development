import React from "react";
import { ShieldCheck } from "lucide-react";

interface PaymentFormData {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  saveCard: boolean;
}

interface shippingprops {
  onbtnclick?: (selected: number) => void;
  formData: PaymentFormData;
  setFormData: React.Dispatch<React.SetStateAction<PaymentFormData>>;
  onconfirmclick: (value: boolean) => void;
}

const PaymentInformationForm: React.FC<shippingprops> = ({ onbtnclick, formData, setFormData, onconfirmclick }) => {
  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpirationDate = (value: string) => {
    // Remove all non-digit characters
    const v = value.replace(/\D/g, "");

    // Add slash after 2 digits
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }

    return v;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      let formattedValue = value;

      if (name === "cardNumber") {
        formattedValue = formatCardNumber(value);
      } else if (name === "expirationDate") {
        formattedValue = formatExpirationDate(value);
      } else if (name === "cvc") {
        // Only allow digits and limit to 3-4 characters
        formattedValue = value.replace(/\D/g, "").substring(0, 4);
      }

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    }
  };

  const handleBack = () => {
    onbtnclick?.(2); // Call the onbtnclick prop with step 1
  };

  const handleCompleteOrder = () => {
    console.log("Payment form data:", formData);
    onconfirmclick(true); // Call the onconfirmclick prop to indicate order completion
    // Add your order completion logic here
  };

  return (
    <div className="lg:w-3/5 mx-auto p-6 bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Payment Information</h1>
      <form onSubmit={handleCompleteOrder}>
        <div className="space-y-6">
          {/* Card Number */}
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              required
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Expiration Date and CVC Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date
              </label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                required
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                value={formData.cvc}
                onChange={handleInputChange}
                required
                placeholder="123"
                maxLength={4}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>
          </div>

          {/* Save Card Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              name="saveCard"
              checked={formData.saveCard}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
              Save card for future purchases
            </label>
          </div>

          {/* Security Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <ShieldCheck className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">Secure Payment</h3>
                <p className="text-sm text-gray-600">
                  Your payment information is encrypted and never stored on our servers. We use industry-standard
                  security measures to protect your data.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between sm:flex-row gap-4 pt-6">
            <button type="button" onClick={handleBack} className="btn-outline">
              Back
            </button>
            <button type="submit" className="btn-primary">
              Complete Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentInformationForm;
