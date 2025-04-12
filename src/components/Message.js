import React from 'react';

function Message({ text, user }) {
  return (
    <div>
      <strong>{user}:</strong> {text}
    </div>
  );
}

export default Message;