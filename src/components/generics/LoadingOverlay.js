import React from "react";

function LoadingOverlay({ className }) {
  return (
    <div className={className}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default LoadingOverlay;
