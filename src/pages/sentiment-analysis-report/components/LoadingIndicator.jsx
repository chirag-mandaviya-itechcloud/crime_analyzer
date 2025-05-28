import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="relative">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-opacity-25"></div>
        <div className="h-8 w-8 rounded-full border-2 border-transparent border-t-primary absolute top-0 left-0 animate-spin"></div>
      </div>
      <span className="ml-3 text-text-secondary">Loading data...</span>
    </div>
  );
};

export default LoadingIndicator;