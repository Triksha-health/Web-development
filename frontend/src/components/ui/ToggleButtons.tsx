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
    const timer = setTimeout(() => updateSliderPosition(), 0);
    return () => clearTimeout(timer);
  }, [updateSliderPosition]);

  useEffect(() => {
    const handleResize = () => updateSliderPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateSliderPosition]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex bg-canvas-soft ring-1 ring-[rgba(22,25,29,0.10)] rounded-full p-1"
    >
      <div
        className="absolute bg-canvas-paper rounded-full shadow-soft transition-all duration-300 ease-out"
        style={{
          width: `${sliderStyle.width}px`,
          left: `${sliderStyle.left}px`,
          top: "4px",
          height: "calc(100% - 8px)",
        }}
      />

      {options.map((option, index) => (
        <button
          key={option}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => handleSelection(option)}
          className={`relative z-10 px-5 py-2.5 text-[13.5px] font-medium rounded-full transition-colors duration-200 ease-in-out ${
            selected === option ? "text-ink-900" : "text-ink-500 hover:text-ink-700"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtons;
