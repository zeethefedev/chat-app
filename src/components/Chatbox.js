import React from 'react';
import Message from './Message';
import SendMessage from './SendMessage';

function Chatbox() {
  return (
    <div>
      <div>
        {/* Example messages */}
        <Message text="Hello!" user="User1" />
        <Message text="Hi there!" user="User2" />
      </div>
      <SendMessage />
    </div>
  );
}

export default Chatbox;