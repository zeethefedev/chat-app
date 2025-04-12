import React from 'react';

function Button({ label, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
        ...style,
      }}
    >
      {label}
    </button>
  );
}

export default Button;