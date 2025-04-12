import React from 'react';

function Select({ options = [], value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ padding: '8px', margin: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;