import React, { useState } from 'react';

function SendMessage() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    alert(`Message sent: ${message}`);
    setMessage('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default SendMessage;