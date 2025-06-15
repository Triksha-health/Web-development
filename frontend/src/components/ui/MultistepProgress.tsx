import React from "react";

interface Step {
  id: number;
  label: string;
}

interface MultiStepProgressProps {
  steps?: Step[];
  currentStep?: number;
}

const MultiStepProgress: React.FC<MultiStepProgressProps> = ({
  steps = [
    { id: 1, label: "Select" },
    { id: 2, label: "Details" },
    { id: 3, label: "Payment" },
  ],
  currentStep = 1,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle and Label */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200
                  ${
                    step.id === currentStep
                      ? "bg-[#3690fe] text-white"
                      : step.id < currentStep
                      ? "bg-[#3690fe] text-white"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {step.id}
              </div>
              <span
                className={`
                  mt-2 text-sm font-medium
                  ${step.id === currentStep ? "text-gray-900" : "text-gray-500"}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-1 mx-4 transition-colors duration-200
                  ${step.id < currentStep ? "bg-[#3690fe]" : "bg-gray-200"}
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default MultiStepProgress;
