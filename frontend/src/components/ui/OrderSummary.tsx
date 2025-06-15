import React from "react";
import { Package, ShieldCheck, CreditCard } from "lucide-react";
import womanlaptop from "../../public/womanlaptop.jpg";

interface Feature {
  id: string;
  text: string;
}

interface Product {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  features: Feature[];
  shippingDays: number;
}
interface OrderSummaryProps {
  triksha: "early" | "standard";
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ triksha }) => {
  const earlybird: Product = {
    name: "Triksha - Early Bird",
    description: "AI-Powered Health Wearable",
    price: 14999,
    originalPrice: 17999,
    image: womanlaptop,
    features: [
      { id: "1", text: "Premium health coaching session" },
      { id: "2", text: "12 months premium subscription" },
      { id: "3", text: "Lifetime priority support" },
      { id: "4", text: "Early access to new features" },
    ],
    shippingDays: 30,
  };

  const standard: Product = {
    name: "Triksha - Standard",
    description: "AI-Powered Health Wearable",
    price: 17999,
    originalPrice: 17999,
    image: womanlaptop,
    features: [
      { id: "1", text: "Premium health coaching session" },
      { id: "2", text: "12 months premium subscription" },
      { id: "3", text: "Lifetime priority support" },
      { id: "4", text: "Early access to new features" },
    ],
    shippingDays: 45,
  };
  const product = triksha === "early" ? earlybird : standard;

  return (
    <div className="rounded-lg p-6 pb-[4.5rem]">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

      {/* Product Info */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-lg font-semibold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-600 mb-3">Includes:</h3>
        <ul className="space-y-2">
          {product.features.map((feature) => (
            <li key={feature.id} className="flex items-center text-base font-medium text-gray-600">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {feature.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping Info */}
      <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
        <Package className="w-5 h-5 text-gray-400" />
        Ships in approximately {product.shippingDays} days
      </div>

      {/* Price Summary */}
      <div className="border-t pt-4">
        <div className="flex justify-between font-medium mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">₹{product.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-medium mb-4 ">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-2 border-t">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">₹{product.price.toLocaleString()}</span>
        </div>
      </div>

      {/* Security Icons */}
      <div className="flex items-center justify-between space-x-6 mt-5 pt-4">
        <div className="flex items-center text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 mr-1" />
          Secure Checkout
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <CreditCard className="w-4 h-4 mr-1" />
          PCI Compliant
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
