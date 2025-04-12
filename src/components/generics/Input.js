import React from "react";

function Input(props) {
  const {
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    label,
    id,
    required,
    onKeyDown,
    className = "",
  } = props;
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        className={`
          p-2 w-full rounded border
          transition-colors duration-200
          ${
            error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-blue-500 focus:border-blue-500"
          }
          focus:outline-none focus:ring-2 
          ${error ? "focus:ring-red-200" : "focus:ring-blue-200"}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
