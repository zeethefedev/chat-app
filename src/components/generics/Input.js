import React from 'react';

function Input({ type = 'text', placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ padding: '8px', margin: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  );
}

export default Input;