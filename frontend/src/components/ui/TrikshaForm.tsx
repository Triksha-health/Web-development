import React, { useState } from "react";

interface trikshaformprops {
  currenttriksha?: "early" | "standard";
  setselectedtriksha?: (selected: "early" | "standard") => void;
  onbtnclick?: (selected: number) => void;
}

const TrikshaForm: React.FC<trikshaformprops> = ({ currenttriksha, setselectedtriksha, onbtnclick }) => {
  const [selected, setSelected] = useState<"early" | "standard">(currenttriksha || "early");

  const handleSelection = (option: "early" | "standard") => {
    setSelected(option);
    setselectedtriksha?.(option);
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full lg:w-3/5">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">Select Your Triksha</h2>

      <div
        className={`border rounded-lg p-4 mb-4 cursor-pointer ${
          selected === "early" ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onClick={() => handleSelection("early")}
      >
        <div className="flex justify-between">
          <div>
            <p className="font-medium">
              Early Bird <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-lg ml-1">Limited</span>
            </p>
            <p className="text-xl font-bold mt-1">
              ₹14,999 <span className="line-through text-gray-400 text-base ml-2">₹17,999</span>{" "}
              <span className="text-green-600 text-sm ml-2">Save ₹3,000</span>
            </p>
            <p className="text-base font-semibold text-gray-500 mt-3">
              Be among the first to receive Triksha with exclusive early adopter benefits.
            </p>
            <p className="text-sm text-gray-400 mt-2">Ships in 30 days • Limited to 50 units</p>
          </div>
          <div className="h-full">
            <input id="earlybirdinput" className="h-5 w-5" type="radio" checked={selected === "early"} readOnly />
          </div>
        </div>
      </div>

      <div
        className={`border rounded-lg p-4 cursor-pointer ${
          selected === "standard" ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onClick={() => handleSelection("standard")}
      >
        <div className="flex justify-between">
          <div>
            <p className="font-medium">Standard</p>
            <p className="text-xl font-bold mt-1">₹17,999</p>
            <p className="text-base font-semibold text-gray-500 mt-3">
              The complete Triksha experience with all core features and benefits.
            </p>
            <p className="text-sm text-gray-400 mt-2">Ships in 45 days • Limited to 150 units</p>
          </div>
          <div>
            <input id="standardinput" className="h-5 w-5" type="radio" checked={selected === "standard"} readOnly />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <button onClick={() => onbtnclick?.(2)} className="btn-primary">
          Continue to Shipping
        </button>
      </div>
    </div>
  );
};

export default TrikshaForm;
