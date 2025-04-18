import React from "react";

function Select(props) {
  const { options = [], label, id, error, required, className = "" } = props;
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        aria-invalid={error ? "true" : "false"}
        className={`
          p-2 w-full rounded border appearance-none
          transition-colors duration-200
          ${
            error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-blue-500 focus:border-blue-500"
          }
          focus:outline-none focus:ring-2 
          ${error ? "focus:ring-red-200" : "focus:ring-blue-200"}
          ${className}
          bg-white
          bg-[url('data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>')] 
          bg-no-repeat bg-right-4 bg-center-y
        `}
        {...props}
      >
        {options.map((option, index) => (
          <option key={option.value || index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;
