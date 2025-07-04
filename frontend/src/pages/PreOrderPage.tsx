import React, { useState, useEffect } from "react";
import Container from "../components/ui/Container";
import OrderSummary from "../components/ui/OrderSummary";
import TrikshaForm from "../components/ui/TrikshaForm";
import MultiStepProgress from "../components/ui/MultistepProgress";
import ShippingInformationForm from "../components/ui/ShippingInformationForm";
import PreOrderConfirmation from "../components/ui/PreOrderConfirmation";

interface ShippingFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const PreOrderPage: React.FC = () => {
  const [ordercomplete, setordercomplete] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const urlParams = new URLSearchParams(window.location.search);
  const initialTriksha = urlParams.get("triksha") === "standard" ? "standard" : "early";
  const [triksha, settriksha] = useState<"early" | "standard">(initialTriksha as "early" | "standard");
  const [shippingFormData, setShippingFormData] = useState<ShippingFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed with your order.");
      return;
    }

    setIsProcessing(true);

    const priceMap: Record<string, number> = {
      early: 1499900,
      standard: 1799900,
    };

    const amountInPaise = priceMap[triksha];

    try {
      const response = await fetch("http://localhost:5000/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `receipt_triksha_${triksha}_${Date.now()}`,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error("Order creation failed");

      const options = {
        key: "rzp_test_XsAIDp6ecIDoke",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Triksha",
        description: `Pre-order for Triksha ${triksha.charAt(0).toUpperCase() + triksha.slice(1)} Edition`,
        order_id: data.order.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setordercomplete(true);
            } else {
              alert("Payment verification failed. Please contact support if amount was deducted.");
            }
          } catch (error) {
            alert("Payment verification error. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: shippingFormData.fullName,
          email: shippingFormData.email,
          contact: shippingFormData.phoneNumber,
        },
        theme: {
          color: "#6366F1",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Something went wrong. Please try again or contact support.");
      setIsProcessing(false);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const getDisplayPrice = () => {
    if (triksha === "early") return "₹14,999";
    if (triksha === "standard") return "₹17,999";
    return "₹0";
  };

  const getOriginalPrice = () => {
    if (triksha === "early") return "₹17,999";
    if (triksha === "standard") return "₹22,999";
    return "₹0";
  };

  const getSavings = () => {
    if (triksha === "early") return "₹5,000";
    if (triksha === "standard") return "₹5,000";
    return "₹0";
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      {!ordercomplete && (
        <>
          <MultiStepProgress currentStep={currentStep} />
          <Container className="relative z-10">
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto shadow-xl rounded-xl lg:rounded-2xl bg-white lg:bg-transparent overflow-hidden">
              {/* Order Summary - Mobile: Top, Desktop: Left */}
              <div className="w-full lg:w-2/5 order-1 lg:order-1">
                <OrderSummary triksha={triksha} />
              </div>

              {/* Main Content Area */}
              <div className="w-full lg:w-3/5 order-2 lg:order-2 bg-white">
                {currentStep === 1 ? (
                  <TrikshaForm currenttriksha={triksha} setselectedtriksha={settriksha} onbtnclick={setCurrentStep} />
                ) : currentStep === 2 ? (
                  <ShippingInformationForm
                    onbtnclick={handleStepClick}
                    formData={shippingFormData}
                    setFormData={setShippingFormData}
                  />
                ) : (
                  <div className="p-4 sm:p-6 lg:p-8 bg-white">
                    <div className="max-w-md mx-auto">
                      {/* Order Review Header */}
                      <div className="text-center mb-6 sm:mb-8">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Review Your Order</h2>
                        <p className="text-sm sm:text-base text-gray-600 px-2">
                          You're almost there! Please review and confirm your pre-order.
                        </p>
                      </div>

                      {/* Pricing Card */}
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-indigo-100">
                        <div className="text-center">
                          <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-2 gap-2">
                            <span className="text-xs sm:text-sm font-medium text-indigo-600 bg-indigo-100 px-2 sm:px-3 py-1 rounded-full">
                              Pre-Order Special
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                              Save {getSavings()}
                            </span>
                          </div>
                          <div className="mb-2">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900">{getDisplayPrice()}</span>
                            <span className="text-base sm:text-lg text-gray-500 line-through ml-2">
                              {getOriginalPrice()}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                            for Triksha {triksha.charAt(0).toUpperCase() + triksha.slice(1)} Edition
                          </p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>✓ Secure payment processing</p>

                            <p>✓ Free shipping across India</p>
                          </div>
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="mb-4 sm:mb-6">
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 max-h-32 overflow-y-auto text-xs sm:text-sm text-gray-700">
                          <h4 className="font-semibold mb-2">Terms and Conditions</h4>
                          <div className="space-y-1 sm:space-y-2 text-xs">
                            <p>• Pre-order amount is non-refundable except as per our refund policy</p>
                            <p>• Expected delivery: Delivery start from Jan 1</p>
                            <p>• Specifications may vary slightly from images shown</p>
                            <p>• We reserve the right to modify delivery timelines due to manufacturing constraints</p>
                            <p>• All prices are inclusive of applicable taxes</p>
                            <p>• For support, contact us at Support@trikshahealth.com or +91-(789) 994-0382</p>
                          </div>
                        </div>

                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="mt-0.5 sm:mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded flex-shrink-0"
                          />
                          <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            I agree to the{" "}
                            <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                              Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>

                      {/* Payment Button */}
                      <button
                        onClick={handlePayment}
                        disabled={!termsAccepted || isProcessing}
                        className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 ${
                          !termsAccepted || isProcessing
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                        }`}
                      >
                        {isProcessing ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-current"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span className="text-sm sm:text-base">Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <span className="mr-2">🔒</span>
                            <span className="hidden sm:inline">Complete Pre-Order • {getDisplayPrice()}</span>
                            <span className="sm:hidden">Complete Order • {getDisplayPrice()}</span>
                          </div>
                        )}
                      </button>

                      {/* Security Notice */}
                      <div className="mt-3 sm:mt-4 text-center">
                        <p className="text-xs text-gray-500 flex items-center justify-center px-2">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          <span className="text-center">
                            <span className="hidden sm:inline">
                              Secured by 256-bit SSL encryption • Powered by Razorpay
                            </span>
                            <span className="sm:hidden">Secured by SSL • Powered by Razorpay</span>
                          </span>
                        </p>
                      </div>

                      {/* Back Button */}
                      <div className="mt-4 sm:mt-6 text-center">
                        <button
                          onClick={() => handleStepClick(2)}
                          className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                        >
                          ← Back to shipping information
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </>
      )}
      {ordercomplete && <PreOrderConfirmation triksha={triksha} />}
    </div>
  );
};

export default PreOrderPage;
