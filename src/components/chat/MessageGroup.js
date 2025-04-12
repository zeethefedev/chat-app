import React from 'react';
import Message from './Message';

function MessageGroup({ messages, date }) {
  const formatDate = (dateStr) => {
    const messageDate = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return messageDate.toLocaleDateString();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-600">
          {formatDate(date)}
        </div>
      </div>
      <div className="space-y-2">
        {messages.map((message) => (
          <Message
            key={message.id}
            {...message}
          />
        ))}
      </div>
    </div>
  );
}

export default MessageGroup;