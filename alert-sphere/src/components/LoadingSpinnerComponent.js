import React from "react";
import "./LoadingSpinnerComponent.css";

function LoadingSpinner() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  );
}

export default LoadingSpinner;
