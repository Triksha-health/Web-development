// PreOrderPage.tsx
import React from "react";
import { useState } from "react";
import logo from "../public/logo (3).png";
import Container from "../components/ui/Container";
import OrderSummary from "../components/ui/OrderSummary";
import TrikshaForm from "../components/ui/TrikshaForm";
import MultiStepProgress from "../components/ui/MultistepProgress";
import ShippingInformationForm from "../components/ui/ShippingInformationForm";
import PaymentInformationForm from "../components/ui/PaymentInformationForm";
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

interface PaymentFormData {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  saveCard: boolean;
}

const PreOrderPage: React.FC = () => {
  const [ordercomplete, setordercomplete] = useState<Boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  //set traiksha to early or standard based on query in url
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
  const [paymentformData, setPaymentFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    saveCard: false,
  });

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  return (
    <div className="min-h-screen py-12 sm:px-6 lg:px-8 bg-[#f9fafc]">
      {!ordercomplete && (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4 "></div>
          <MultiStepProgress currentStep={currentStep} />
          <Container className="relative z-10">
            <div className="flex max-w-7xl lg:flex-row shadow-lg rounded-lg">
              <div className="lg:w-2/5">
                <OrderSummary triksha={triksha} />
              </div>
              {currentStep === 1 ? (
                <TrikshaForm currenttriksha={triksha} setselectedtriksha={settriksha} onbtnclick={setCurrentStep} />
              ) : currentStep === 2 ? (
                <ShippingInformationForm
                  onbtnclick={handleStepClick}
                  formData={shippingFormData}
                  setFormData={setShippingFormData}
                />
              ) : (
                <PaymentInformationForm
                  onbtnclick={handleStepClick}
                  formData={paymentformData}
                  setFormData={setPaymentFormData}
                  onconfirmclick={setordercomplete}
                />
              )}
            </div>
          </Container>
        </>
      )}
      {ordercomplete && <PreOrderConfirmation triksha={triksha} />}
    </div>
  );
};

export default PreOrderPage;
