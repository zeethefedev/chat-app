import React from 'react';

function LoadingSpinner({ size = 'md', color = 'blue', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    white: 'border-white',
    gray: 'border-gray-500'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div 
        className={`
          animate-spin rounded-full
          border-2 ${colorClasses[color]}
          border-t-transparent
          h-full w-full
        `}
      />
    </div>
  );
}

export default LoadingSpinner;