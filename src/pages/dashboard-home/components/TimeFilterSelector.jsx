import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const TimeFilterSelector = ({ value, onChange, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "90days", label: "Last 90 days" },
  ];

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 bg-white border border-border rounded-md px-3 py-2 text-sm font-medium text-text-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Icon name="Loader" size={16} className="mr-1.5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <Icon name="Calendar" size={16} className="mr-1.5" />
            <span>{selectedOption?.label}</span>
            <Icon name="ChevronDown" size={16} />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-border animate-fade-in">
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-background ${
                option.value === value
                  ? "bg-blue-50 text-primary font-medium"
                  : "text-text-primary"
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {option.value === value && (
                <Icon name="Check" size={16} className="float-right" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeFilterSelector;
