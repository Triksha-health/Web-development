import React, { useState, useEffect, useRef } from "react";

interface ToggleButtonsProps {
  options?: string[];
  defaultSelected?: string;
  onSelectionChange?: (selected: string) => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  options = ["Health Risk Monitoring", "Fitness Conscious"],
  defaultSelected = "Health Risk Monitoring",
  onSelectionChange,
}) => {
  const [selected, setSelected] = useState<string>(defaultSelected);
  const [sliderStyle, setSliderStyle] = useState<{ width: number; left: number }>({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelection = (option: string) => {
    setSelected(option);
    onSelectionChange?.(option);
  };

  const updateSliderPosition = React.useCallback(() => {
    const selectedIndex = options.findIndex((option) => option === selected);
    const selectedButton = buttonRefs.current[selectedIndex];
    const container = containerRef.current;

    if (selectedButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = selectedButton.getBoundingClientRect();

      setSliderStyle({
        width: buttonRect.width,
        left: buttonRect.left - containerRect.left,
      });
    }
  }, [selected, options]);

  useEffect(() => {
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      updateSliderPosition();
    }, 0);

    return () => clearTimeout(timer);
  }, [updateSliderPosition]);

  useEffect(() => {
    const handleResize = () => updateSliderPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateSliderPosition]);

  return (
    <div ref={containerRef} className="relative inline-flex bg-[#e1e8f0] rounded-full p-1">
      {/* Sliding background */}
      <div
        className="absolute bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
        style={{
          width: `${sliderStyle.width}px`,
          left: `${sliderStyle.left}px`,
          top: "4px",
          height: "calc(100% - 8px)",
        }}
      />

      {/* Buttons */}
      {options.map((option, index) => (
        <button
          key={option}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => handleSelection(option)}
          className={`
            relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ease-in-out
            ${selected === option ? "text-blue-600" : "text-gray-600 hover:text-gray-800"}
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
export default ToggleButtons;
