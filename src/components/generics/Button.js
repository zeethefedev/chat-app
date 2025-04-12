import React from 'react';
import LoadingSpinner from './LoadingSpinner';

function Button({ label, onClick, style, isLoading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`
        px-4 py-2 m-1 rounded bg-blue-500 text-white
        transition-all duration-200 ease-in-out
        ${(isLoading || disabled) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600 cursor-pointer'}
      `}
      style={style}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size="sm" color="white" className="mr-2" />
          Loading...
        </div>
      ) : label}
    </button>
  );
}

export default Button;