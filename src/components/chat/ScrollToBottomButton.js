import React from "react";

function ScrollToBottomButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-20 right-8 p-2 rounded-full shadow-lg transition-colors text-white"
      aria-label="Scroll to bottom"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
}

export default ScrollToBottomButton;
